import OpenAI from "openai";
import {
  QuizDifficulty,
  QuizGenerationRequest,
  QuizGenerationResponse,
  QuizOption,
  QuizQuestion,
} from "../types/quiz";

/**
 * Configuração do GitHub Models
 */
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const GITHUB_ENDPOINT = "https://models.inference.ai.azure.com";
const MODEL_NAME = "gpt-4o-mini";

/**
 * Cliente OpenAI configurado para GitHub Models
 */
const client = new OpenAI({
  baseURL: GITHUB_ENDPOINT,
  apiKey: GITHUB_TOKEN,
  dangerouslyAllowBrowser: true,
});

/**
 * Gera um quiz completo baseado nos parâmetros fornecidos
 */
export async function generateQuiz(
  request: QuizGenerationRequest
): Promise<QuizGenerationResponse> {
  const startTime = Date.now();

  try {
    const questions = await generateQuestionsWithAI(request);

    return {
      success: true,
      questions,
      metadata: {
        generatedAt: new Date(),
        model: MODEL_NAME,
        processingTime: Date.now() - startTime,
      },
    };
  } catch (error) {
    console.error("Erro ao gerar quiz:", error);

    // Fallback para geração de questões básicas em caso de erro
    const fallbackQuestions = generateFallbackQuestions(request);

    return {
      success: false,
      questions: fallbackQuestions,
      error: error instanceof Error ? error.message : "Erro ao gerar quiz",
      metadata: {
        generatedAt: new Date(),
        processingTime: Date.now() - startTime,
      },
    };
  }
}

/**
 * Gera questões usando GitHub Models
 */
async function generateQuestionsWithAI(
  request: QuizGenerationRequest
): Promise<QuizQuestion[]> {
  const { topic, subject, difficulty, numberOfQuestions, specificFocus } =
    request;

  // Construir prompt detalhado para geração de quiz
  const systemPrompt = buildQuizSystemPrompt(difficulty);
  const userPrompt = buildQuizUserPrompt(request);

  const response = await client.chat.completions.create({
    model: MODEL_NAME,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.8,
    max_tokens: 3000,
    response_format: { type: "json_object" },
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error("Resposta vazia da API");
  }

  // Parse e validação da resposta JSON
  const parsedResponse = JSON.parse(content);
  const questions = parseAndValidateQuestions(parsedResponse, difficulty);

  // Garante que temos o número correto de questões
  if (questions.length < numberOfQuestions) {
    throw new Error(
      `API gerou apenas ${questions.length} questões, esperado ${numberOfQuestions}`
    );
  }

  return questions.slice(0, numberOfQuestions);
}

/**
 * Constrói o prompt do sistema para geração de quiz
 */
function buildQuizSystemPrompt(difficulty: QuizDifficulty): string {
  const difficultyDescriptions = {
    facil:
      "nível básico, apropriadas para iniciantes, com conceitos fundamentais",
    medio: "nível intermediário, requerendo raciocínio e conexão de conceitos",
    dificil:
      "nível avançado, com análise crítica e aplicação complexa de conhecimentos",
  };

  return `Você é um especialista em educação e criação de conteúdo pedagógico.

Sua tarefa é gerar questões de múltipla escolha de alta qualidade para estudantes brasileiros.

DIRETRIZES IMPORTANTES:
1. Cada questão deve ter EXATAMENTE 4 alternativas (A, B, C, D)
2. Apenas UMA alternativa deve estar correta
3. As alternativas incorretas (distratores) devem ser plausíveis, mas claramente incorretas
4. Evite alternativas do tipo "Todas as anteriores" ou "Nenhuma das anteriores"
5. Use linguagem clara, apropriada para estudantes brasileiros
6. Inclua uma explicação pedagógica detalhada para cada questão
7. As questões devem ser do ${difficultyDescriptions[difficulty]}

FORMATO DE RESPOSTA:
Você DEVE responder com um objeto JSON válido no seguinte formato:

{
  "questions": [
    {
      "question": "Texto da pergunta aqui?",
      "options": [
        { "id": "A", "text": "Primeira alternativa" },
        { "id": "B", "text": "Segunda alternativa" },
        { "id": "C", "text": "Terceira alternativa" },
        { "id": "D", "text": "Quarta alternativa" }
      ],
      "correctOptionId": "A",
      "explanation": "Explicação detalhada de por que a alternativa A está correta e as demais estão incorretas."
    }
  ]
}

IMPORTANTE: Retorne APENAS o JSON, sem texto adicional antes ou depois.`;
}

/**
 * Constrói o prompt do usuário para geração de quiz
 */
function buildQuizUserPrompt(request: QuizGenerationRequest): string {
  const { topic, subject, difficulty, numberOfQuestions, specificFocus } =
    request;

  let prompt = `Gere ${numberOfQuestions} questões de múltipla escolha sobre:

📚 DISCIPLINA: ${subject}
📖 TÓPICO: ${topic}
📊 DIFICULDADE: ${difficulty}`;

  if (specificFocus) {
    prompt += `\n🎯 FOCO ESPECÍFICO: ${specificFocus}`;
  }

  prompt += `

REQUISITOS:
- Todas as questões devem ser relevantes e educacionais
- Use português brasileiro correto
- Questões devem testar compreensão real, não memorização
- Alternativas incorretas devem ser educativas (erros comuns ou conceitos relacionados)
- Explicações devem ajudar o aluno a entender o porquê da resposta correta

Gere as ${numberOfQuestions} questões agora em formato JSON.`;

  return prompt;
}

/**
 * Valida e converte a resposta da API em QuizQuestion[]
 */
function parseAndValidateQuestions(
  apiResponse: any,
  difficulty: QuizDifficulty
): QuizQuestion[] {
  if (!apiResponse.questions || !Array.isArray(apiResponse.questions)) {
    throw new Error(
      'Formato de resposta inválido: campo "questions" não encontrado'
    );
  }

  const questions: QuizQuestion[] = [];

  for (let i = 0; i < apiResponse.questions.length; i++) {
    const q = apiResponse.questions[i];

    // Validação básica
    if (!q.question || !q.options || !q.correctOptionId || !q.explanation) {
      console.warn(`Questão ${i + 1} inválida, pulando...`);
      continue;
    }

    if (q.options.length !== 4) {
      console.warn(`Questão ${i + 1} não tem exatamente 4 opções, pulando...`);
      continue;
    }

    // Gerar IDs únicos
    const questionId = `q_${Date.now()}_${i}`;

    // Converter opções
    const options: QuizOption[] = q.options.map((opt: any, idx: number) => ({
      id: `${questionId}_opt_${idx}`,
      text: opt.text || opt,
    }));

    // Encontrar a opção correta
    const correctOptionIndex = q.options.findIndex(
      (opt: any) =>
        (opt.id || String.fromCharCode(65 + q.options.indexOf(opt))) ===
        q.correctOptionId
    );

    if (correctOptionIndex === -1) {
      console.warn(`Questão ${i + 1}: ID da resposta correta não encontrado`);
      continue;
    }

    questions.push({
      id: questionId,
      question: q.question,
      options,
      correctAnswerId: options[correctOptionIndex].id,
      explanation: q.explanation,
      difficulty,
    });
  }

  return questions;
}

/**
 * Gera questões básicas de fallback em caso de erro na API
 */
function generateFallbackQuestions(
  request: QuizGenerationRequest
): QuizQuestion[] {
  const { topic, subject, difficulty, numberOfQuestions } = request;
  const questions: QuizQuestion[] = [];

  for (let i = 0; i < Math.min(numberOfQuestions, 5); i++) {
    const questionId = `fallback_q_${Date.now()}_${i}`;

    const options: QuizOption[] = [
      { id: `${questionId}_opt_0`, text: `Conceito fundamental de ${topic}` },
      {
        id: `${questionId}_opt_1`,
        text: `Conceito relacionado mas incorreto 1`,
      },
      {
        id: `${questionId}_opt_2`,
        text: `Conceito relacionado mas incorreto 2`,
      },
      {
        id: `${questionId}_opt_3`,
        text: `Conceito relacionado mas incorreto 3`,
      },
    ];

    questions.push({
      id: questionId,
      question: `[Questão de Exemplo] Qual é um conceito importante relacionado a ${topic} em ${subject}?`,
      options,
      correctAnswerId: options[0].id,
      explanation: `Esta é uma questão de exemplo gerada automaticamente. Em ${subject}, o estudo de ${topic} envolve compreender seus conceitos fundamentais e aplicações práticas.`,
      difficulty,
    });
  }

  return questions;
}

/**
 * Valida a requisição de geração de quiz
 */
export function validateQuizRequest(request: QuizGenerationRequest): {
  valid: boolean;
  error?: string;
} {
  if (!request.topic || request.topic.trim().length < 3) {
    return { valid: false, error: "Tópico deve ter pelo menos 3 caracteres" };
  }

  if (!request.subject || request.subject.trim().length < 3) {
    return { valid: false, error: "Disciplina deve ser informada" };
  }

  if (request.numberOfQuestions < 3 || request.numberOfQuestions > 20) {
    return {
      valid: false,
      error: "Número de questões deve estar entre 3 e 20",
    };
  }

  return { valid: true };
}

/**
 * Verifica se o GitHub Token está configurado
 */
export function isGitHubModelsConfigured(): boolean {
  return !!GITHUB_TOKEN && GITHUB_TOKEN !== "";
}
