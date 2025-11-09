import OpenAI from "openai";
import { LLMRequest, LLMResponse, ToneType } from "../types/assistant";

/**
 * Serviço de integração com GitHub Models para assistente virtual
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
  dangerouslyAllowBrowser: true, // Necessário para uso no navegador
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
- Foca em organização e métodos de aprendizagem eficazes
- Usa emojis educacionais para tornar o conteúdo mais amigável (📚, 🎯, 💡, etc.)

Mantenha suas respostas:
- Educacionais e informativas
- Estruturadas e bem organizadas (use listas e tópicos)
- Com sugestões práticas e acionáveis
- Motivadoras e encorajadoras
- Em português brasileiro

Formato preferido:
- Use seções claras com títulos
- Liste passos numerados quando apropriado
- Inclua dicas práticas marcadas com 💡
- Termine com uma pergunta para engajar o aluno`,

  humor: `Você é uma assistente de bem-estar emocional para estudantes.

Suas características:
- Demonstra empatia e compreensão genuína
- Identifica sinais de estresse, ansiedade ou sobrecarga
- Sugere pausas e técnicas de relaxamento
- Oferece suporte emocional acolhedor
- Valida os sentimentos do aluno
- Usa emojis acolhedores (💙, 🌟, ✨, 💖, etc.)

Mantenha suas respostas:
- Empáticas e acolhedoras
- Focadas no bem-estar do aluno
- Validando os sentimentos expressos
- Oferecendo apoio concreto e recursos
- Sugerindo ações positivas
- Em português brasileiro

IMPORTANTE: Se detectar sinais de sofrimento emocional significativo (tristeza profunda, ansiedade intensa, menções de desistir), mencione que um alerta será enviado à coordenação pedagógica para oferecer suporte adicional.`,

  relaxar: `Você é uma assistente focada em aprendizado tranquilo e sem pressão.

Suas características:
- Abordagem calma, paciente e gentil
- Incentiva aprendizado no ritmo próprio do aluno
- Sugere técnicas de respiração e mindfulness
- Propõe atividades leves e relaxantes
- Remove completamente a pressão do processo de aprendizagem
- Usa emojis relaxantes (🌿, ☁️, 🌸, 🧘, ✨, etc.)

Mantenha suas respostas:
- Calmas e reconfortantes
- Sem pressa ou pressão
- Focadas em bem-estar durante o estudo
- Sugerindo pausas e equilíbrio
- Com linguagem suave e acolhedora
- Em português brasileiro

Comece sempre com uma mensagem tranquilizadora e sugira ir devagar.`,
};

/**
 * Gera uma resposta do assistente usando GitHub Models
 */
export async function generateAssistantResponse(
  request: LLMRequest
): Promise<LLMResponse> {
  try {
    // Construir as mensagens para o contexto
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      {
        role: "system",
        content: SYSTEM_PROMPTS[request.tone],
      },
    ];

    // Adicionar histórico de contexto (últimas 6 mensagens)
    if (request.context && request.context.length > 0) {
      const recentMessages = request.context.slice(-6);

      for (const msg of recentMessages) {
        if (msg.sender === "user" || msg.sender === "assistant") {
          messages.push({
            role: msg.sender === "user" ? "user" : "assistant",
            content: msg.text,
          });
        }
      }
    }

    // Construir mensagem do usuário
    let userContent: string | OpenAI.Chat.ChatCompletionContentPart[];

    // Se há arquivo de imagem, usar formato multimodal
    if (
      request.fileType === "image" &&
      request.fileContent?.startsWith("data:image")
    ) {
      const textPart = request.message
        ? `${request.message}\n\n[Imagem anexada: ${request.fileName}]`
        : `Por favor, analise esta imagem (${request.fileName}) e forneça feedback educacional apropriado ao tom selecionado.`;

      userContent = [
        {
          type: "text" as const,
          text: textPart,
        },
        {
          type: "image_url" as const,
          image_url: {
            url: request.fileContent,
          },
        },
      ];
    }
    // Para outros tipos de arquivo (PDF, texto)
    else if (request.fileContent) {
      const fileTypeDescription = {
        pdf: "PDF",
        image: "imagem",
        text: "texto",
      };

      const contentPreview = request.fileContent.startsWith("data:")
        ? "[Conteúdo do arquivo não textual]"
        : request.fileContent.substring(0, 8000);

      userContent = `ARQUIVO ENVIADO: ${request.fileName} (${
        fileTypeDescription[request.fileType || "text"]
      })

CONTEÚDO DO ARQUIVO:
${contentPreview}

${
  request.message
    ? `PERGUNTA/SOLICITAÇÃO DO ALUNO: ${request.message}`
    : "Por favor, analise este arquivo e forneça recomendações de estudo apropriadas ao tom selecionado."
}`;
    } else {
      userContent = request.message;
    }

    messages.push({
      role: "user",
      content: userContent,
    });

    // Chamar GitHub Models
    const response = await client.chat.completions.create({
      messages: messages,
      model: MODEL_NAME,
      temperature: 0.7,
      max_tokens: 1500,
      top_p: 0.95,
      frequency_penalty: 0.3,
      presence_penalty: 0.3,
    });

    const responseText =
      response.choices[0]?.message?.content ||
      "Desculpe, tive um problema ao processar sua mensagem. Pode tentar novamente?";

    // Gerar sugestões contextuais
    const suggestions = generateSuggestions(request.tone);

    return {
      text: responseText,
      confidence: 0.92,
      suggestions,
    };
  } catch (error) {
    console.error("Erro ao chamar GitHub Models:", error);

    // Fallback para respostas básicas em caso de erro
    return generateFallbackResponse(request);
  }
}

/**
 * Gera resposta de fallback em caso de erro na API
 */
function generateFallbackResponse(request: LLMRequest): LLMResponse {
  const fallbackMessages: Record<ToneType, string> = {
    aprendizado: `📚 Olá! Estou aqui para ajudar você a aprender.

Percebi que houve um problema temporário com a conexão. Mas não se preocupe!

Enquanto isso, você pode:
• Me contar sobre qual matéria você está estudando
• Compartilhar suas dúvidas específicas
• Pedir sugestões de materiais de estudo

O que você gostaria de fazer? 😊`,

    humor: `💙 Oi! Estou aqui para te apoiar.

Tivemos um pequeno problema técnico, mas estou ouvindo você.

Como você está se sentindo hoje? Conte-me sobre:
• Como estão sendo seus estudos
• Se algo está te preocupando
• Como posso te ajudar neste momento

Estou aqui para você! 🌟`,

    relaxar: `✨ Olá! Vamos com calma...

Tivemos uma pequena falha técnica, mas está tudo bem. Respire fundo.

🧘 Sem pressa. Podemos:
• Conversar sobre seus estudos tranquilamente
• Fazer algumas pausas relaxantes
• Ir no seu ritmo

Sobre o que você quer falar? 🌸`,
  };

  return {
    text: fallbackMessages[request.tone],
    confidence: 0.5,
    suggestions: generateSuggestions(request.tone),
  };
}

/**
 * Gera sugestões baseadas no tom
 */
function generateSuggestions(tone: ToneType): string[] {
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
 * Verifica se o GitHub Token está configurado
 */
export function isGitHubModelsConfigured(): boolean {
  return !!GITHUB_TOKEN && GITHUB_TOKEN !== "";
}

/**
 * Versão com streaming para respostas progressivas (futuro)
 */
export async function generateAssistantResponseStream(
  request: LLMRequest,
  onChunk: (chunk: string) => void
): Promise<LLMResponse> {
  try {
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      {
        role: "system",
        content: SYSTEM_PROMPTS[request.tone],
      },
      {
        role: "user",
        content: request.message,
      },
    ];

    const stream = await client.chat.completions.create({
      messages: messages,
      model: MODEL_NAME,
      temperature: 0.7,
      max_tokens: 1500,
      stream: true,
    });

    let fullResponse = "";

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || "";
      fullResponse += content;
      onChunk(content);
    }

    return {
      text: fullResponse,
      confidence: 0.92,
      suggestions: generateSuggestions(request.tone),
    };
  } catch (error) {
    console.error("Erro no streaming:", error);
    throw error;
  }
}
