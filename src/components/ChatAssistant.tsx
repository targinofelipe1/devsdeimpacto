import {
  BookOpen,
  FileText,
  Heart,
  Image as ImageIcon,
  Loader2,
  Paperclip,
  Send,
  Sparkles,
  Upload,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { User } from "../App";
import {
  formatFileSize,
  processFile,
  validateFile,
} from "../services/fileProcessor";
import { generateAssistantResponse } from "../services/llmService";
import { Message, ToneType } from "../types/assistant";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { SensoryModeToggle } from "./SensoryModeToggle";

interface ChatAssistantProps {
  user: User;
  onClose: () => void;
}

type ChatSession = "learning" | "mood" | "relax";

// Mapeamento de sessões para tipos de tom
const sessionToTone: Record<ChatSession, ToneType> = {
  learning: "aprendizado",
  mood: "humor",
  relax: "relaxar",
};

export function ChatAssistant({ user, onClose }: ChatAssistantProps) {
  const [currentSession, setCurrentSession] = useState<ChatSession>("learning");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Olá! Estou aqui para ajudar! Por favor, faça o upload de um arquivo (PDF, imagem ou texto) e escolha um tom para sua resposta, ou apenas converse comigo. 😊",
      sender: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showMoodSelector, setShowMoodSelector] = useState(false);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const moodOptions = [
    {
      emoji: "😊",
      label: "Feliz",
      value: "happy",
      color: "from-[#ffcc33] to-[#ff9933]",
      needsAlert: false,
    },
    {
      emoji: "😌",
      label: "Calmo",
      value: "calm",
      color: "from-[#3da5c2] to-[#2d8aa2]",
      needsAlert: false,
    },
    {
      emoji: "😐",
      label: "Neutro",
      value: "neutral",
      color: "from-[#95a5a6] to-[#7f8c8d]",
      needsAlert: false,
    },
    {
      emoji: "😟",
      label: "Preocupado",
      value: "worried",
      color: "from-[#ff9933] to-[#ff6b1a]",
      needsAlert: true,
    },
    {
      emoji: "😢",
      label: "Triste",
      value: "sad",
      color: "from-[#3498db] to-[#2980b9]",
      needsAlert: true,
    },
    {
      emoji: "😰",
      label: "Ansioso",
      value: "anxious",
      color: "from-[#e67e22] to-[#d35400]",
      needsAlert: true,
    },
    {
      emoji: "😤",
      label: "Irritado",
      value: "angry",
      color: "from-[#e74c3c] to-[#c0392b]",
      needsAlert: true,
    },
    {
      emoji: "😫",
      label: "Cansado",
      value: "tired",
      color: "from-[#9b59b6] to-[#8e44ad]",
      needsAlert: true,
    },
  ];

  const sessionConfig = {
    learning: {
      icon: BookOpen,
      color: "from-[#3da5c2] to-[#2d8aa2]",
      borderColor: "border-[#1e6b7f]",
      label: "Aprendizado",
      emoji: "📚",
    },
    mood: {
      icon: Heart,
      color: "from-[#ff6b6b] to-[#d32f2f]",
      borderColor: "border-[#8b0000]",
      label: "Humor",
      emoji: "💖",
    },
    relax: {
      icon: Sparkles,
      color: "from-[#9b59b6] to-[#8e44ad]",
      borderColor: "border-[#6c3483]",
      label: "Relaxar",
      emoji: "✨",
    },
  };

  // Auto-scroll quando novas mensagens chegam
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    // Validar arquivo
    const validation = validateFile(file);
    if (!validation.valid) {
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: `❌ Erro: ${validation.error}`,
        sender: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      return;
    }

    // Anexar arquivo sem processar ainda
    setPendingFile(file);
  };

  const handleRemoveFile = () => {
    setPendingFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSendMessage = async () => {
    if ((!inputText.trim() && !pendingFile) || isProcessing) return;

    setIsProcessing(true);

    try {
      // Se há arquivo anexado, processar primeiro
      if (pendingFile) {
        // Mensagem do usuário com arquivo e comentário
        const userMessage: Message = {
          id: Date.now().toString(),
          text: inputText.trim() || `📎 Enviando arquivo: ${pendingFile.name}`,
          sender: "user",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, userMessage]);
        setInputText("");

        // Processar o arquivo
        const result = await processFile(pendingFile);

        if (!result.success) {
          const errorMessage: Message = {
            id: Date.now().toString() + "_error",
            text: `❌ Erro ao processar arquivo: ${result.error}`,
            sender: "assistant",
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, errorMessage]);
          setPendingFile(null);
          setIsProcessing(false);
          return;
        }

        // Criar attachment
        const attachment = {
          type: pendingFile.type.includes("pdf")
            ? ("pdf" as const)
            : pendingFile.type.includes("image")
            ? ("image" as const)
            : ("text" as const),
          name: pendingFile.name,
          url: URL.createObjectURL(pendingFile),
          size: pendingFile.size,
          content: result.content,
        };

        // Mensagem de confirmação com attachment
        const confirmMessage: Message = {
          id: Date.now().toString() + "_confirm",
          text: `✅ Arquivo processado com sucesso!\n${
            result.metadata?.pageCount
              ? `📄 ${result.metadata.pageCount} páginas detectadas\n`
              : ""
          }${
            result.metadata?.wordCount
              ? `📝 Aproximadamente ${result.metadata.wordCount} palavras`
              : ""
          }`,
          sender: "assistant",
          timestamp: new Date(),
          attachment,
        };
        setMessages((prev) => [...prev, confirmMessage]);

        // Gerar resposta do LLM com o conteúdo do arquivo
        const currentTone = sessionToTone[currentSession];
        const userComment = inputText.trim();
        const llmMessage = userComment
          ? `${userComment}\n\n[Arquivo anexado: ${pendingFile.name}]`
          : `Análise de arquivo: ${pendingFile.name}`;

        const llmResponse = await generateAssistantResponse({
          message: llmMessage,
          tone: currentTone,
          fileContent: result.content,
          fileName: pendingFile.name,
          fileType: attachment.type,
          context: messages,
        });

        const aiMessage: Message = {
          id: Date.now().toString() + "_ai",
          text: llmResponse.text,
          sender: "assistant",
          timestamp: new Date(),
          tone: currentTone,
        };
        setMessages((prev) => [...prev, aiMessage]);

        setPendingFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        // Mensagem sem arquivo - fluxo normal
        const userMessage: Message = {
          id: Date.now().toString(),
          text: inputText,
          sender: "user",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputText("");

        // Gerar resposta do LLM
        const currentTone = sessionToTone[currentSession];
        const llmResponse = await generateAssistantResponse({
          message: inputText,
          tone: currentTone,
          context: messages,
        });

        const aiMessage: Message = {
          id: Date.now().toString() + "_ai",
          text: llmResponse.text,
          sender: "assistant",
          timestamp: new Date(),
          tone: currentTone,
        };
        setMessages((prev) => [...prev, aiMessage]);
      }
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now().toString() + "_error",
        text: pendingFile
          ? `❌ Erro inesperado ao processar arquivo. Tente novamente.`
          : "Desculpe, tive um problema ao processar sua mensagem. Pode tentar novamente?",
        sender: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSessionChange = (session: ChatSession) => {
    setCurrentSession(session);

    // Se mudou para a sessão de humor, mostrar o seletor de humor
    if (session === "mood") {
      setShowMoodSelector(true);
      const sessionMessage: Message = {
        id: Date.now().toString(),
        text: "Como você está se sentindo hoje? Selecione o emoji que melhor representa seu estado emocional:",
        sender: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, sessionMessage]);
    } else {
      setShowMoodSelector(false);
      const sessionMessage: Message = {
        id: Date.now().toString(),
        text: `Mudando para a sessão de ${sessionConfig[session].label}! ${sessionConfig[session].emoji}\n\nEstou pronta para te ajudar neste modo.`,
        sender: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, sessionMessage]);
    }
  };

  const handleMoodSelection = (mood: (typeof moodOptions)[0]) => {
    setShowMoodSelector(false);

    // Mensagem do usuário
    const userMessage: Message = {
      id: Date.now().toString(),
      text: `${mood.emoji} Estou me sentindo ${mood.label.toLowerCase()}`,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Análise da IA
    setTimeout(() => {
      let responseText = "";

      if (mood.needsAlert) {
        responseText = `Obrigada por compartilhar como você está se sentindo. Percebi que você está ${mood.label.toLowerCase()} e isso é importante.\n\n`;
        responseText += `🔔 Um alerta foi enviado automaticamente para a coordenação pedagógica para que possam te oferecer o suporte necessário.\n\n`;

        if (mood.value === "worried" || mood.value === "anxious") {
          responseText += `💙 Enquanto isso, que tal tentarmos alguns exercícios de respiração? Posso te guiar.\n\n`;
          responseText += `Também posso sugerir atividades relaxantes ou conversar sobre o que está te deixando assim.`;
        } else if (mood.value === "sad") {
          responseText += `💙 Estou aqui para te ouvir. Quer conversar sobre o que está acontecendo?\n\n`;
          responseText += `Lembre-se: seus sentimentos são válidos e não há problema em não estar bem.`;
        } else if (mood.value === "angry") {
          responseText += `💙 Entendo sua frustração. Vamos trabalhar juntos para você se sentir melhor.\n\n`;
          responseText += `Posso te ensinar técnicas de gerenciamento de emoções ou podemos fazer uma pausa relaxante.`;
        } else if (mood.value === "tired") {
          responseText += `💙 Descanso é fundamental! Vamos ajustar seu cronograma de estudos.\n\n`;
          responseText += `Que tal fazermos pausas mais frequentes? Posso criar um plano personalizado para você.`;
        }
      } else {
        if (mood.value === "happy") {
          responseText = `Que maravilha! ${mood.emoji} Fico feliz em saber que você está bem!\n\n`;
          responseText += `Vamos aproveitar essa energia positiva para aprender algo novo? Tenho ótimos desafios para você!`;
        } else if (mood.value === "calm") {
          responseText = `Ótimo! ${mood.emoji} Um estado calmo é perfeito para aprender.\n\n`;
          responseText += `Vamos focar em atividades que mantenham esse equilíbrio. O que você gostaria de estudar hoje?`;
        } else {
          responseText = `Tudo bem estar ${mood.label.toLowerCase()}. ${
            mood.emoji
          }\n\n`;
          responseText += `Se precisar de algo para melhorar seu dia, estou aqui! Posso sugerir atividades relaxantes ou conteúdos interessantes.`;
        }
      }

      const aiResponse: Message = {
        id: Date.now().toString() + Math.random(),
        text: responseText,
        sender: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const config = sessionConfig[currentSession];

  return (
    <div className="min-h-screen bg-[#8bd3dd] relative overflow-hidden">
      {/* Pixel Art Background - Clouds */}
      <div
        className="absolute top-20 left-10 w-24 h-12 bg-white/60 float-animation"
        style={{
          clipPath:
            "polygon(10% 50%, 20% 40%, 30% 50%, 40% 40%, 50% 50%, 60% 40%, 70% 50%, 80% 40%, 90% 50%, 90% 100%, 10% 100%)",
          animationDelay: "0s",
        }}
      ></div>
      <div
        className="absolute top-40 right-20 w-28 h-14 bg-white/50 float-animation"
        style={{
          clipPath:
            "polygon(10% 50%, 20% 40%, 30% 50%, 40% 40%, 50% 50%, 60% 40%, 70% 50%, 80% 40%, 90% 50%, 90% 100%, 10% 100%)",
          animationDelay: "1.5s",
        }}
      ></div>

      {/* Header */}
      <div
        className={`bg-gradient-to-r ${config.color} border-b-4 ${config.borderColor}`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white border-4 border-[#3e2723] flex items-center justify-center pixel-shadow-lg">
                <span className="text-3xl">👩‍💼</span>
              </div>
              <div>
                <h2 className="text-white drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)]">
                  Assistente Virtual
                </h2>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-white/90">
                    Online e pronta para ajudar!
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <SensoryModeToggle />
              <button
                onClick={onClose}
                className="bg-[#d32f2f] hover:bg-[#b71c1c] text-white p-3 border-4 border-[#8b0000] pixel-button transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 relative z-10">
        {/* Session Tabs */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {(Object.keys(sessionConfig) as ChatSession[]).map((session) => {
            const Icon = sessionConfig[session].icon;
            const isActive = currentSession === session;

            return (
              <button
                key={session}
                onClick={() => handleSessionChange(session)}
                disabled={isProcessing}
                className={`p-4 border-4 pixel-button transition-all ${
                  isActive
                    ? `bg-gradient-to-b ${sessionConfig[session].color} ${sessionConfig[session].borderColor} scale-105`
                    : "bg-white border-[#3e2723] hover:scale-105"
                } ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <Icon
                  className={`w-8 h-8 mx-auto mb-2 ${
                    isActive ? "text-white" : "text-[#3e2723]"
                  }`}
                />
                <span
                  className={`${
                    isActive
                      ? "text-white drop-shadow-[1px_1px_0_rgba(0,0,0,0.5)]"
                      : "text-[#3e2723]"
                  }`}
                >
                  {sessionConfig[session].label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Chat Container */}
        <div
          className="bg-[#f5f1e3] border-4 border-[#3e2723] pixel-shadow-lg overflow-hidden flex flex-col"
          style={{ height: "calc(100vh - 280px)" }}
        >
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] p-4 border-4 pixel-shadow-sm ${
                    message.sender === "user"
                      ? `bg-gradient-to-b ${config.color} ${config.borderColor} text-white`
                      : "bg-white border-[#3e2723] text-[#3e2723]"
                  }`}
                >
                  {message.attachment && (
                    <div className="mb-2 p-2 bg-black/10 border-2 border-black/20 flex items-center gap-2">
                      {message.attachment.type === "image" ? (
                        <ImageIcon className="w-4 h-4" />
                      ) : message.attachment.type === "pdf" ? (
                        <FileText className="w-4 h-4" />
                      ) : (
                        <FileText className="w-4 h-4" />
                      )}
                      <span className="text-sm truncate">
                        {message.attachment.name}
                      </span>
                      {message.attachment.size && (
                        <span className="text-xs opacity-70">
                          ({formatFileSize(message.attachment.size)})
                        </span>
                      )}
                    </div>
                  )}
                  <MarkdownRenderer
                    content={message.text}
                    className="text-inherit"
                  />
                  <span className={`text-xs mt-2 block opacity-70`}>
                    {message.timestamp.toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))}

            {/* Processing Indicator */}
            {isProcessing && (
              <div className="flex justify-start">
                <div className="bg-white border-4 border-[#3e2723] p-4 pixel-shadow-sm flex items-center gap-3">
                  <Loader2 className="w-5 h-5 animate-spin text-[#3da5c2]" />
                  <span className="text-[#3e2723]">Processando...</span>
                </div>
              </div>
            )}

            {/* Mood Selector */}
            {showMoodSelector && currentSession === "mood" && !isProcessing && (
              <div className="flex justify-center">
                <div className="bg-white border-4 border-[#3e2723] p-6 pixel-shadow-lg max-w-3xl w-full">
                  <div className="grid grid-cols-4 gap-3">
                    {moodOptions.map((mood) => (
                      <button
                        key={mood.value}
                        onClick={() => handleMoodSelection(mood)}
                        className={`bg-gradient-to-b ${mood.color} p-4 border-4 border-[#3e2723] hover:scale-105 pixel-button transition-all group`}
                      >
                        <div className="text-4xl mb-2">{mood.emoji}</div>
                        <span className="text-white drop-shadow-[1px_1px_0_rgba(0,0,0,0.5)]">
                          {mood.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t-4 border-[#3e2723] bg-white p-4">
            {/* Mostrar arquivo anexado */}
            {pendingFile && (
              <div className="mb-3 p-3 bg-[#fff3cd] border-4 border-[#ffcc33] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {pendingFile.type.includes("image") ? (
                    <ImageIcon className="w-5 h-5 text-[#3e2723]" />
                  ) : pendingFile.type.includes("pdf") ? (
                    <FileText className="w-5 h-5 text-[#3e2723]" />
                  ) : (
                    <FileText className="w-5 h-5 text-[#3e2723]" />
                  )}
                  <div>
                    <p className="font-bold text-sm text-[#3e2723]">
                      {pendingFile.name}
                    </p>
                    <p className="text-xs text-[#6d4c41]">
                      {formatFileSize(pendingFile.size)} • Pronto para enviar
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleRemoveFile}
                  className="p-2 hover:bg-[#ff9933] border-2 border-[#3e2723] transition-colors"
                  title="Remover arquivo"
                >
                  <X className="w-4 h-4 text-[#3e2723]" />
                </button>
              </div>
            )}

            <div className="flex gap-3">
              {/* Botão de anexo - apenas para tom "Aprendizado" */}
              {currentSession === "learning" && (
                <>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept="image/*,.pdf,.txt"
                    className="hidden"
                    disabled={isProcessing}
                  />

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isProcessing || !!pendingFile}
                    className={`bg-[#ffcc33] hover:bg-[#ff9933] p-3 border-4 border-[#d4a02c] pixel-button transition-all ${
                      isProcessing || pendingFile
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    title="Anexar arquivo (PDF, imagem ou texto)"
                  >
                    <Paperclip className="w-5 h-5 text-[#3e2723]" />
                  </button>
                </>
              )}

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder={
                  pendingFile
                    ? "Adicione um comentário sobre o arquivo (opcional)..."
                    : "Digite sua mensagem..."
                }
                disabled={isProcessing}
                className="flex-1 px-4 py-3 border-4 border-[#3e2723] bg-white text-[#3e2723] placeholder-[#8d6e63] focus:outline-none focus:border-[#5a9e36] disabled:opacity-50 disabled:cursor-not-allowed"
              />

              <button
                onClick={handleSendMessage}
                disabled={isProcessing || (!inputText.trim() && !pendingFile)}
                className={`bg-gradient-to-b ${
                  config.color
                } hover:brightness-110 text-white px-6 py-3 border-4 ${
                  config.borderColor
                } pixel-button transition-all ${
                  isProcessing || (!inputText.trim() && !pendingFile)
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>

            {/* Mensagem de ajuda - varia conforme o tom */}
            <div className="mt-3 flex items-center gap-2 text-sm text-[#6d4c41]">
              {currentSession === "learning" ? (
                <>
                  <Upload className="w-4 h-4" />
                  <span>
                    {pendingFile
                      ? "📎 Arquivo anexado! Adicione um comentário ou envie direto."
                      : "Envie PDFs, imagens ou textos para análise. Faça perguntas e receba orientações de estudo."}
                  </span>
                </>
              ) : currentSession === "mood" ? (
                <>
                  <Heart className="w-4 h-4" />
                  <span>
                    Compartilhe como você está se sentindo. Estou aqui para te
                    apoiar e acolher.
                  </span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>
                    Vamos com calma... Respire fundo e me conte o que está
                    pensando.
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pixel grass at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-[#5a9e36] to-[#3d7025] border-t-4 border-[#2d5016]">
        <div className="absolute top-0 left-0 right-0 h-2 flex">
          {[...Array(80)].map((_, i) => (
            <div
              key={i}
              className="flex-1 bg-[#2d5016]"
              style={{
                height: `${Math.random() * 10 + 4}px`,
                marginTop: `-${Math.random() * 6}px`,
              }}
            />
          ))}
        </div>
        <div className="absolute top-2 left-0 right-0 flex justify-around">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="text-xl">
              {["🌼", "🌸", "🌺", "🌻"][Math.floor(Math.random() * 4)]}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
