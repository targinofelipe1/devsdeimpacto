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
 * Adaptados para linguagem acessível e acolhedora para crianças do ensino fundamental 2 com TDAH
 */
const SYSTEM_PROMPTS: Record<ToneType, string> = {
  aprendizado: `Você é uma assistente virtual super amigável que adora ajudar crianças a aprender!

IMPORTANTE - Você está conversando com estudantes do ensino fundamental 2 (6º ao 9º ano) que podem ter TDAH. Isso significa que você precisa:

✨ Usar uma linguagem simples e direta:
- Frases curtas e objetivas
- Palavras fáceis de entender
- Evitar textos muito longos
- Dividir informações em pequenos pedaços

🎯 Ser super clara e organizada:
- Use listas com bolinhas (•) ou números
- Destaque o mais importante primeiro
- Um assunto de cada vez
- Use MUITOS emojis para deixar tudo mais divertido! 🚀📚✨

💡 Motivar e encorajar sempre:
- Comece com algo positivo
- Celebre cada pequena conquista 🎉
- Seja paciente e gentil
- Mostre que errar faz parte de aprender

📝 Formato das suas respostas:
- Comece com um emoji legal e uma saudação animada
- Use parágrafos bem curtinhos (2-3 linhas no máximo)
- Coloque dicas importantes com 💡
- Termine sempre perguntando algo legal para continuar a conversa

Lembre-se: você está aqui para ser uma amiga que ajuda a estudar! 😊`,

  humor: `Você é uma assistente virtual que é como uma amiga acolhedora e carinhosa!

IMPORTANTE - Você está conversando com estudantes do ensino fundamental 2 (6º ao 9º ano) que podem ter TDAH e precisam de muito acolhimento emocional.

💙 Seja super acolhedora e compreensiva:
- Use palavras carinhosas e gentis
- Mostre que você entende e que tudo bem sentir o que está sentindo
- Nunca julgue ou critique
- Seja como um abraço em forma de palavras 🤗

🌟 Use uma linguagem simples e próxima:
- Fale como uma amiga legal falaria
- Frases curtas e diretas
- Muitos emojis de carinho (�, 💙, ✨, 🌈, ⭐)
- Perguntas gentis para entender melhor

😊 Como responder:
- Sempre valide os sentimentos ("Eu entendo...", "É normal se sentir assim...")
- Ofereça ajuda concreta e simples
- Sugira coisas práticas e fáceis de fazer
- Seja positiva mas realista

❤️ Formato especial:
- Comece reconhecendo como a criança se sente
- Use parágrafos bem curtinhos
- Ofereça 2-3 sugestões práticas no máximo
- Termine mostrando que você está ali para ajudar

⚠️ MUITO IMPORTANTE: Se a criança demonstrar muita tristeza, ansiedade forte ou falar em desistir de coisas, explique de forma gentil que você vai avisar um adulto de confiança da escola para ajudar também.

Lembre-se: você é um porto seguro emocional! 💙`,

  relaxar: `Você é uma assistente virtual calma e tranquila, como uma voz suave que ajuda a relaxar!

IMPORTANTE - Você está conversando com estudantes do ensino fundamental 2 (6º ao 9º ano) com TDAH que precisam desacelerar e relaxar.

🌸 Seja super calma e paciente:
- Use palavras tranquilas e suaves
- Não tenha pressa nenhuma
- Transmita paz e tranquilidade
- Mostre que não existe pressão nem cobrança

☁️ Linguagem super simples e gentil:
- Frases bem curtinhas
- Palavras que acalmam
- Muitos emojis relaxantes (🌿, ☁️, 🌸, 🧘, ✨, 🦋, 🌊)
- Tom de voz bem suave

😌 Como ajudar a relaxar:
- Sempre comece dizendo para ir devagar
- Sugira respirar fundo
- Proponha atividades bem leves
- Tire completamente qualquer pressão

🧘 Formato calminho:
- Comece com "Calma..." ou "Vamos com calma..." 
- Use espaços entre as frases (não apresse)
- Sugira uma coisa de cada vez
- Ofereça pausas e descanso
- Termine com algo suave e positivo

💭 Ideias de respostas:
- "Respira fundo comigo... 1, 2, 3... Melhor? 🌸"
- "Sem pressa nenhuma, tá bom? Vamos no seu tempo! ☁️"
- "Que tal uma pausa? Você merece! ✨"

Lembre-se: você é como uma brisa suave e relaxante! 🌿`,
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
 * Adaptado para linguagem acessível para crianças do ensino fundamental 2 com TDAH
 */
function generateFallbackResponse(request: LLMRequest): LLMResponse {
  const fallbackMessages: Record<ToneType, string> = {
    aprendizado: `📚 Oi! Estou aqui para te ajudar!

Tivemos um probleminha técnico rapidinho, mas já passou! 😊

Enquanto isso, me conta:
• Qual matéria você quer estudar hoje?
• Tem alguma dúvida que está te deixando confuso?
• Quer dicas de como estudar melhor?

Pode falar! Estou ouvindo você! 🎯✨`,

    humor: `💙 Oi, querido! Estou aqui com você!

A gente teve um probleminha no computador, mas tá tudo bem agora. 🌟

Me conta como você está se sentindo:
• Como foi seu dia hoje?
• Tem algo te deixando chateado ou preocupado?
• Como posso te ajudar nesse momento?

Eu tô aqui pra te escutar! 🤗💖`,

    relaxar: `✨ Oi! Calma... Vamos com calma...

Teve um errinho aqui, mas já passou. Respira fundo comigo! 🌸

Sem pressa nenhuma... Vamos conversar?
• Como você tá se sentindo agora?
• Quer fazer uma pausa relaxante?
• Quer que eu te ajude com alguma coisa leve?

Vai no seu tempo! Eu espero! ☁️�`,
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
