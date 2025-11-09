/**
 * EXEMPLO: Integração Real de Geração de Quizzes com OpenAI
 *
 * Este arquivo demonstra como usar a API da OpenAI para gerar
 * quizzes reais de alta qualidade.
 */

import OpenAI from "openai";
import {
  QuizDifficulty,
  QuizGenerationRequest,
  QuizGenerationResponse,
  QuizQuestion,
} from "../types/quiz";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Apenas para desenvolvimento
});

/**
 * Prompt engineering para geração de quizzes
 */
function buildQuizGenerationPrompt(request: QuizGenerationRequest): string {
  const difficultyText = {
    facil: "fácil (conceitos básicos e reconhecimento)",
    medio: "médio (aplicação de conceitos e análise)",
    dificil: "difícil (síntese, análise complexa e resolução de problemas)",
  };

  return `Você é um especialista em educação e criação de avaliações pedagógicas.

TAREFA: Gerar ${
    request.numberOfQuestions
  } questões de múltipla escolha sobre o seguinte tema:

DISCIPLINA: ${request.subject}
TÓPICO: ${request.topic}
${request.specificFocus ? `FOCO ESPECÍFICO: ${request.specificFocus}` : ""}
DIFICULDADE: ${difficultyText[request.difficulty]}
${request.targetGrade ? `SÉRIE/ANO: ${request.targetGrade}º ano` : ""}

FORMATO DE RESPOSTA (JSON):
{
  "questions": [
    {
      "question": "Texto da pergunta clara e objetiva",
      "options": [
        "Opção A",
        "Opção B",
        "Opção C",
        "Opção D"
      ],
      "correctIndex": 0,
      "explanation": "Explicação didática de por que a resposta está correta"
    }
  ]
}

DIRETRIZES:
1. Questões devem ser claras, diretas e pedagogicamente válidas
2. Cada questão deve ter exatamente 4 opções
3. As opções incorretas (distratores) devem ser plausíveis
4. Evite pegadinhas; foque em avaliar conhecimento real
5. Use linguagem apropriada para a série/nível
6. Inclua explicações educativas para cada resposta
7. Varie os tipos de questão (conceitual, aplicação, análise)
8. Mantenha consistência no formato e estilo

IMPORTANTE: Retorne APENAS o JSON válido, sem texto adicional antes ou depois.`;
}

/**
 * Gera quiz usando OpenAI GPT-4
 */
export async function generateQuizWithOpenAI(
  request: QuizGenerationRequest
): Promise<QuizGenerationResponse> {
  const startTime = Date.now();

  try {
    const prompt = buildQuizGenerationPrompt(request);

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content:
            "Você é um assistente especializado em criar avaliações educacionais de alta qualidade. Sempre responda em formato JSON válido.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.8, // Criatividade moderada
      max_tokens: 3000,
      response_format: { type: "json_object" }, // Força resposta em JSON
    });

    const responseText = completion.choices[0].message.content;

    if (!responseText) {
      throw new Error("Resposta vazia da API");
    }

    // Parsear JSON
    const parsed = JSON.parse(responseText);

    if (!parsed.questions || !Array.isArray(parsed.questions)) {
      throw new Error("Formato de resposta inválido");
    }

    // Converter para formato interno
    const questions: QuizQuestion[] = parsed.questions.map(
      (q: any, index: number) => {
        const questionId = `q_${Date.now()}_${index}`;

        return {
          id: questionId,
          question: q.question,
          options: q.options.map((text: string, optIndex: number) => ({
            id: `${questionId}_opt_${optIndex}`,
            text,
          })),
          correctAnswerId: `${questionId}_opt_${q.correctIndex}`,
          explanation: q.explanation,
          difficulty: request.difficulty,
        };
      }
    );

    return {
      success: true,
      questions,
      metadata: {
        generatedAt: new Date(),
        model: "gpt-4-turbo-preview",
        processingTime: Date.now() - startTime,
      },
    };
  } catch (error) {
    console.error("Erro ao gerar quiz com OpenAI:", error);

    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
      metadata: {
        generatedAt: new Date(),
        processingTime: Date.now() - startTime,
      },
    };
  }
}

/**
 * Versão com validação e melhorias de qualidade
 */
export async function generateQuizWithQualityCheck(
  request: QuizGenerationRequest
): Promise<QuizGenerationResponse> {
  const result = await generateQuizWithOpenAI(request);

  if (!result.success || !result.questions) {
    return result;
  }

  // Validar qualidade das questões
  const validatedQuestions = result.questions.filter((q) => {
    // Verificar se tem pergunta
    if (!q.question || q.question.trim().length < 10) {
      console.warn("Questão muito curta, removendo:", q.question);
      return false;
    }

    // Verificar se tem 4 opções
    if (q.options.length !== 4) {
      console.warn("Questão não tem 4 opções, removendo");
      return false;
    }

    // Verificar se todas as opções têm texto
    if (q.options.some((opt) => !opt.text || opt.text.trim().length < 2)) {
      console.warn("Opção vazia encontrada, removendo questão");
      return false;
    }

    return true;
  });

  if (validatedQuestions.length < request.numberOfQuestions * 0.8) {
    // Se perdemos mais de 20% das questões, tentar novamente
    console.warn("Muitas questões inválidas, regenerando...");
    return generateQuizWithOpenAI(request);
  }

  return {
    ...result,
    questions: validatedQuestions,
  };
}

/**
 * Geração com progresso para UI
 */
export async function generateQuizWithProgress(
  request: QuizGenerationRequest,
  onProgress: (progress: number, message: string) => void
): Promise<QuizGenerationResponse> {
  onProgress(10, "Preparando solicitação...");

  try {
    onProgress(30, "Gerando questões com IA...");

    const result = await generateQuizWithOpenAI(request);

    onProgress(70, "Validando questões...");

    if (!result.success) {
      onProgress(100, "Erro na geração");
      return result;
    }

    onProgress(90, "Finalizando...");

    // Pequeno delay para UX
    await new Promise((resolve) => setTimeout(resolve, 500));

    onProgress(100, "Concluído!");

    return result;
  } catch (error) {
    onProgress(100, "Erro");
    throw error;
  }
}

/**
 * Exemplo com diferentes estratégias de geração
 */
export async function generateQuizWithStrategy(
  request: QuizGenerationRequest,
  strategy: "balanced" | "creative" | "conservative"
): Promise<QuizGenerationResponse> {
  const temperatureMap = {
    balanced: 0.7,
    creative: 0.9,
    conservative: 0.5,
  };

  const temperature = temperatureMap[strategy];

  // Modificar requisição para usar temperatura específica
  // (Seria necessário adaptar a função principal)

  return generateQuizWithOpenAI(request);
}

/**
 * Salvar quiz gerado em banco de dados (exemplo)
 */
export async function saveQuizToDatabase(
  quiz: {
    title: string;
    subject: string;
    difficulty: QuizDifficulty;
    questions: QuizQuestion[];
  },
  authorId: string
) {
  // Exemplo de integração com backend
  const response = await fetch("/api/quizzes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      ...quiz,
      authorId,
      createdAt: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error("Falha ao salvar quiz");
  }

  return response.json();
}

/**
 * Exemplo de uso completo:
 *
 * import { generateQuizWithProgress } from './examples/quizGenerationReal';
 *
 * // No CreateQuizModal.tsx:
 * const handleGenerateWithAI = async () => {
 *   setStep('generating');
 *
 *   try {
 *     const result = await generateQuizWithProgress(
 *       {
 *         topic: topic.trim(),
 *         subject: subject.trim(),
 *         difficulty,
 *         numberOfQuestions: numQuestions,
 *         specificFocus: specificFocus.trim() || undefined
 *       },
 *       (progress, message) => {
 *         setGenerationProgress(progress);
 *         setStatusMessage(message);
 *       }
 *     );
 *
 *     if (result.success) {
 *       setQuestions(result.questions);
 *       setStep('review');
 *     } else {
 *       setError(result.error || 'Erro ao gerar quiz');
 *       setStep('form');
 *     }
 *   } catch (error) {
 *     setError('Erro inesperado');
 *     setStep('form');
 *   }
 * };
 */
