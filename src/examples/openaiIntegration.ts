/**
 * EXEMPLO: Integração com LLM Real (OpenAI GPT-4)
 *
 * Este arquivo mostra como substituir a implementação simulada
 * por chamadas reais à API da OpenAI.
 *
 * IMPORTANTE: Não commitar API keys no código!
 * Use variáveis de ambiente (.env)
 */

import OpenAI from "openai";
import { LLMRequest, LLMResponse, ToneType } from "../types/assistant";

// Configurar cliente OpenAI
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY, // Definir no arquivo .env
  dangerouslyAllowBrowser: true, // Apenas para desenvolvimento
});

/**
 * Prompts do sistema para cada tom
 */
const SYSTEM_PROMPTS: Record<ToneType, string> = {
  aprendizado: `Você é uma assistente educacional especializada em ajudar alunos a aprender.
Suas características:
- Explica conceitos de forma clara e didática
- Sugere materiais e atividades de estudo
- Cria planos de estudo personalizados
- Recomenda quizzes e exercícios práticos
- Foca em organização e métodos de aprendizagem

Mantenha suas respostas:
- Educacionais e informativas
- Estruturadas e organizadas
- Com sugestões práticas
- Motivadoras e encorajadoras`,

  humor: `Você é uma assistente de bem-estar emocional para estudantes.
Suas características:
- Demonstra empatia e compreensão
- Identifica sinais de estresse ou sobrecarga
- Sugere pausas e técnicas de relaxamento
- Oferece suporte emocional
- Alerta a coordenação quando necessário

Mantenha suas respostas:
- Empáticas e acolhedoras
- Focadas no bem-estar do aluno
- Validando os sentimentos expressos
- Oferecendo apoio e recursos`,

  relaxar: `Você é uma assistente focada em aprendizado tranquilo e sem pressão.
Suas características:
- Abordagem calma e paciente
- Incentiva aprendizado no ritmo do aluno
- Sugere técnicas de respiração e mindfulness
- Propõe atividades leves e relaxantes
- Remove a pressão do processo de aprendizagem

Mantenha suas respostas:
- Calmas e reconfortantes
- Sem pressa ou pressão
- Focadas em bem-estar durante o estudo
- Sugerindo pausas e equilíbrio`,
};

/**
 * Gera resposta usando OpenAI GPT-4
 */
export async function generateAssistantResponseWithOpenAI(
  request: LLMRequest
): Promise<LLMResponse> {
  try {
    const systemPrompt = SYSTEM_PROMPTS[request.tone];

    // Construir mensagens
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      {
        role: "system",
        content: systemPrompt,
      },
    ];

    // Adicionar contexto se houver
    if (request.context && request.context.length > 0) {
      // Pegar últimas 5 mensagens para contexto
      const recentMessages = request.context.slice(-5);

      for (const msg of recentMessages) {
        messages.push({
          role: msg.sender === "user" ? "user" : "assistant",
          content: msg.text,
        });
      }
    }

    // Adicionar mensagem atual
    let userMessage = request.message;

    // Se há conteúdo de arquivo, incluir na mensagem
    if (request.fileContent) {
      userMessage = `Arquivo enviado: ${request.fileName} (${
        request.fileType
      })\n\nConteúdo:\n${request.fileContent.substring(
        0,
        4000
      )}\n\nPergunta/Solicitação: ${request.message}`;
    }

    messages.push({
      role: "user",
      content: userMessage,
    });

    // Chamar API OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview", // ou gpt-4, gpt-3.5-turbo
      messages: messages,
      temperature: 0.7,
      max_tokens: 1500,
      top_p: 1,
      frequency_penalty: 0.3,
      presence_penalty: 0.3,
    });

    const responseText =
      completion.choices[0].message.content ||
      "Desculpe, não consegui processar sua mensagem.";

    // Gerar sugestões baseadas no tom (pode usar outro prompt ou extração)
    const suggestions = await generateSuggestions(request.tone, responseText);

    return {
      text: responseText,
      confidence: 0.9,
      suggestions,
    };
  } catch (error) {
    console.error("Erro ao chamar OpenAI:", error);

    return {
      text: "Desculpe, tive um problema ao processar sua mensagem. Pode tentar novamente?",
      confidence: 0,
      suggestions: [],
    };
  }
}

/**
 * Gera sugestões contextuais
 */
async function generateSuggestions(
  tone: ToneType,
  responseText: string
): Promise<string[]> {
  // Pode usar outra chamada à API ou lógica baseada em regras
  const suggestions: Record<ToneType, string[]> = {
    aprendizado: [
      "Criar um quiz sobre este tema",
      "Ver materiais complementares",
      "Fazer exercícios práticos",
      "Agendar revisão",
    ],
    humor: [
      "Fazer uma pausa relaxante",
      "Conversar sobre suas preocupações",
      "Ajustar o ritmo de estudos",
      "Falar com a coordenação",
    ],
    relaxar: [
      "Exercícios de respiração",
      "Música ambiente para estudar",
      "Conteúdo em formato leve",
      "Pausas programadas",
    ],
  };

  return suggestions[tone];
}

/**
 * Exemplo de uso com streaming (respostas progressivas)
 */
export async function generateAssistantResponseWithStreaming(
  request: LLMRequest,
  onChunk: (chunk: string) => void
): Promise<LLMResponse> {
  try {
    const systemPrompt = SYSTEM_PROMPTS[request.tone];

    const stream = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: request.message },
      ],
      stream: true,
      temperature: 0.7,
      max_tokens: 1500,
    });

    let fullResponse = "";

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || "";
      fullResponse += content;
      onChunk(content); // Callback para atualizar UI progressivamente
    }

    return {
      text: fullResponse,
      confidence: 0.9,
      suggestions: await generateSuggestions(request.tone, fullResponse),
    };
  } catch (error) {
    console.error("Erro no streaming:", error);
    throw error;
  }
}

/**
 * Exemplo com rate limiting e retry
 */
export async function generateAssistantResponseWithRetry(
  request: LLMRequest,
  maxRetries = 3
): Promise<LLMResponse> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await generateAssistantResponseWithOpenAI(request);
    } catch (error) {
      lastError = error as Error;

      // Se for rate limit, esperar antes de tentar novamente
      if (error instanceof OpenAI.RateLimitError) {
        const waitTime = Math.pow(2, attempt) * 1000; // Exponential backoff
        console.log(`Rate limit atingido. Aguardando ${waitTime}ms...`);
        await new Promise((resolve) => setTimeout(resolve, waitTime));
        continue;
      }

      // Para outros erros, falhar imediatamente
      break;
    }
  }

  throw lastError || new Error("Falha após múltiplas tentativas");
}

/**
 * Configuração do arquivo .env
 *
 * Criar arquivo .env na raiz do projeto:
 *
 * VITE_OPENAI_API_KEY=sk-...
 *
 * E adicionar ao .gitignore:
 * .env
 * .env.local
 */

/**
 * Exemplo de uso no componente:
 *
 * import { generateAssistantResponseWithOpenAI } from './examples/openaiIntegration';
 *
 * // Substituir no ChatAssistant.tsx:
 * const llmResponse = await generateAssistantResponseWithOpenAI({
 *   message: inputText,
 *   tone: currentTone,
 *   context: messages
 * });
 */
