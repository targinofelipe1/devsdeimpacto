import { useState, useRef } from 'react';
import { User } from '../App';
import { X, Send, Paperclip, BookOpen, Heart, Sparkles, Upload, FileText, Image as ImageIcon } from 'lucide-react';
import { SensoryModeToggle } from './SensoryModeToggle';

interface ChatAssistantProps {
  user: User;
  onClose: () => void;
}

type ChatSession = 'learning' | 'mood' | 'relax';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  attachment?: {
    type: 'image' | 'pdf';
    name: string;
    url: string;
  };
}

export function ChatAssistant({ user, onClose }: ChatAssistantProps) {
  const [currentSession, setCurrentSession] = useState<ChatSession>('learning');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Olá! Eu sou sua assistente virtual. Como posso te ajudar hoje? 😊',
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [showMoodSelector, setShowMoodSelector] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const moodOptions = [
    { emoji: '😊', label: 'Feliz', value: 'happy', color: 'from-[#ffcc33] to-[#ff9933]', needsAlert: false },
    { emoji: '😌', label: 'Calmo', value: 'calm', color: 'from-[#3da5c2] to-[#2d8aa2]', needsAlert: false },
    { emoji: '😐', label: 'Neutro', value: 'neutral', color: 'from-[#95a5a6] to-[#7f8c8d]', needsAlert: false },
    { emoji: '😟', label: 'Preocupado', value: 'worried', color: 'from-[#ff9933] to-[#ff6b1a]', needsAlert: true },
    { emoji: '😢', label: 'Triste', value: 'sad', color: 'from-[#3498db] to-[#2980b9]', needsAlert: true },
    { emoji: '😰', label: 'Ansioso', value: 'anxious', color: 'from-[#e67e22] to-[#d35400]', needsAlert: true },
    { emoji: '😤', label: 'Irritado', value: 'angry', color: 'from-[#e74c3c] to-[#c0392b]', needsAlert: true },
    { emoji: '😫', label: 'Cansado', value: 'tired', color: 'from-[#9b59b6] to-[#8e44ad]', needsAlert: true }
  ];

  const sessionConfig = {
    learning: {
      icon: BookOpen,
      color: 'from-[#3da5c2] to-[#2d8aa2]',
      borderColor: 'border-[#1e6b7f]',
      label: 'Aprendizado',
      emoji: '📚'
    },
    mood: {
      icon: Heart,
      color: 'from-[#ff6b6b] to-[#d32f2f]',
      borderColor: 'border-[#8b0000]',
      label: 'Humor',
      emoji: '💖'
    },
    relax: {
      icon: Sparkles,
      color: 'from-[#9b59b6] to-[#8e44ad]',
      borderColor: 'border-[#6c3483]',
      label: 'Relaxar',
      emoji: '✨'
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setUploadedFiles(prev => [...prev, ...newFiles]);
      
      // Simulate file analysis
      newFiles.forEach(file => {
        const fileType = file.type.includes('image') ? 'image' : 'pdf';
        const message: Message = {
          id: Date.now().toString() + Math.random(),
          text: `📎 Arquivo enviado: ${file.name}`,
          sender: 'user',
          timestamp: new Date(),
          attachment: {
            type: fileType,
            name: file.name,
            url: URL.createObjectURL(file)
          }
        };
        
        setMessages(prev => [...prev, message]);
        
        // Simulate AI response
        setTimeout(() => {
          const aiResponse: Message = {
            id: Date.now().toString() + Math.random(),
            text: getAIResponseForFile(file, currentSession),
            sender: 'assistant',
            timestamp: new Date()
          };
          setMessages(prev => [...prev, aiResponse]);
        }, 1000);
      });
    }
  };

  const getAIResponseForFile = (file: File, session: ChatSession): string => {
    if (session === 'learning') {
      if (file.type.includes('image')) {
        return `Analisando sua imagem... Identifiquei conteúdo relacionado! Vou te recomendar:\n\n📚 Material de Matemática - Geometria\n📖 Exercícios práticos sobre o tema\n🎯 Quiz para testar seu conhecimento\n\nQuer que eu organize um plano de estudos sobre isso?`;
      }
      return `Analisando seu PDF... Identifiquei ${Math.floor(Math.random() * 20 + 10)} páginas de conteúdo! Vou criar um roteiro de estudos personalizado para você.\n\n✅ Sugestão: Revisar em 3 sessões de 25 minutos\n🎯 Recomendo fazer anotações nas páginas 3, 7 e 12`;
    }
    return 'Arquivo recebido! Como posso te ajudar com ele?';
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now().toString() + Math.random(),
        text: getAIResponse(inputText, currentSession),
        sender: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 800);
  };

  const getAIResponse = (input: string, session: ChatSession): string => {
    const responses = {
      learning: [
        'Ótima pergunta! Vou te ajudar a organizar isso. Que tal criarmos um cronograma de estudos juntos?',
        'Entendi! Para esse conteúdo, recomendo: 1) Revisar a teoria, 2) Fazer exercícios práticos, 3) Testar com um quiz. Começamos?',
        'Legal! Vou buscar os melhores materiais sobre esse tema. Você prefere vídeos, textos ou exercícios práticos?'
      ],
      mood: [
        'Entendo como você está se sentindo. Que tal fazermos uma pausa e voltarmos quando estiver melhor?',
        'Seus sentimentos são válidos! Vamos trabalhar nisso juntos. O que você acha de fazer algo relaxante primeiro?',
        'Obrigada por compartilhar isso comigo. Estou aqui para te apoiar! 💙'
      ],
      relax: [
        'Que tal uma pausa para respirar? Vou te guiar em um exercício de relaxamento. Pronto?',
        'Momento de descanso! Posso te sugerir uma música calma ou um exercício de mindfulness. O que prefere?',
        'Você está fazendo um ótimo trabalho! Vamos relaxar um pouquinho? 🌟'
      ]
    };

    const sessionResponses = responses[session];
    return sessionResponses[Math.floor(Math.random() * sessionResponses.length)];
  };

  const handleSessionChange = (session: ChatSession) => {
    setCurrentSession(session);
    
    // Se mudou para a sessão de humor, mostrar o seletor de humor
    if (session === 'mood') {
      setShowMoodSelector(true);
      const sessionMessage: Message = {
        id: Date.now().toString(),
        text: 'Como você está se sentindo hoje? Selecione o emoji que melhor representa seu estado emocional:',
        sender: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, sessionMessage]);
    } else {
      setShowMoodSelector(false);
      const sessionMessage: Message = {
        id: Date.now().toString(),
        text: `Mudando para a sessão de ${sessionConfig[session].label}! ${sessionConfig[session].emoji}`,
        sender: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, sessionMessage]);
    }
  };

  const handleMoodSelection = (mood: typeof moodOptions[0]) => {
    setShowMoodSelector(false);
    
    // Mensagem do usuário
    const userMessage: Message = {
      id: Date.now().toString(),
      text: `${mood.emoji} Estou me sentindo ${mood.label.toLowerCase()}`,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    // Análise da IA
    setTimeout(() => {
      let responseText = '';
      
      if (mood.needsAlert) {
        responseText = `Obrigada por compartilhar como você está se sentindo. Percebi que você está ${mood.label.toLowerCase()} e isso é importante.\n\n`;
        responseText += `🔔 Um alerta foi enviado automaticamente para a coordenação pedagógica para que possam te oferecer o suporte necessário.\n\n`;
        
        if (mood.value === 'worried' || mood.value === 'anxious') {
          responseText += `💙 Enquanto isso, que tal tentarmos alguns exercícios de respiração? Posso te guiar.\n\n`;
          responseText += `Também posso sugerir atividades relaxantes ou conversar sobre o que está te deixando assim.`;
        } else if (mood.value === 'sad') {
          responseText += `💙 Estou aqui para te ouvir. Quer conversar sobre o que está acontecendo?\n\n`;
          responseText += `Lembre-se: seus sentimentos são válidos e não há problema em não estar bem.`;
        } else if (mood.value === 'angry') {
          responseText += `💙 Entendo sua frustração. Vamos trabalhar juntos para você se sentir melhor.\n\n`;
          responseText += `Posso te ensinar técnicas de gerenciamento de emoções ou podemos fazer uma pausa relaxante.`;
        } else if (mood.value === 'tired') {
          responseText += `💙 Descanso é fundamental! Vamos ajustar seu cronograma de estudos.\n\n`;
          responseText += `Que tal fazermos pausas mais frequentes? Posso criar um plano personalizado para você.`;
        }
      } else {
        if (mood.value === 'happy') {
          responseText = `Que maravilha! ${mood.emoji} Fico feliz em saber que você está bem!\n\n`;
          responseText += `Vamos aproveitar essa energia positiva para aprender algo novo? Tenho ótimos desafios para você!`;
        } else if (mood.value === 'calm') {
          responseText = `Ótimo! ${mood.emoji} Um estado calmo é perfeito para aprender.\n\n`;
          responseText += `Vamos focar em atividades que mantenham esse equilíbrio. O que você gostaria de estudar hoje?`;
        } else {
          responseText = `Tudo bem estar ${mood.label.toLowerCase()}. ${mood.emoji}\n\n`;
          responseText += `Se precisar de algo para melhorar seu dia, estou aqui! Posso sugerir atividades relaxantes ou conteúdos interessantes.`;
        }
      }

      const aiResponse: Message = {
        id: Date.now().toString() + Math.random(),
        text: responseText,
        sender: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const config = sessionConfig[currentSession];

  return (
    <div className="min-h-screen bg-[#8bd3dd] relative overflow-hidden">
      {/* Pixel Art Background - Clouds */}
      <div className="absolute top-20 left-10 w-24 h-12 bg-white/60 float-animation" 
        style={{ 
          clipPath: 'polygon(10% 50%, 20% 40%, 30% 50%, 40% 40%, 50% 50%, 60% 40%, 70% 50%, 80% 40%, 90% 50%, 90% 100%, 10% 100%)',
          animationDelay: '0s'
        }}>
      </div>
      <div className="absolute top-40 right-20 w-28 h-14 bg-white/50 float-animation"
        style={{ 
          clipPath: 'polygon(10% 50%, 20% 40%, 30% 50%, 40% 40%, 50% 50%, 60% 40%, 70% 50%, 80% 40%, 90% 50%, 90% 100%, 10% 100%)',
          animationDelay: '1.5s'
        }}>
      </div>

      {/* Header */}
      <div className={`bg-gradient-to-r ${config.color} border-b-4 ${config.borderColor}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white border-4 border-[#3e2723] flex items-center justify-center pixel-shadow-lg">
                <span className="text-3xl">👩‍💼</span>
              </div>
              <div>
                <h2 className="text-white drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)]">Assistente Virtual</h2>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-white/90">Online e pronta para ajudar!</span>
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
                className={`p-4 border-4 pixel-button transition-all ${
                  isActive 
                    ? `bg-gradient-to-b ${sessionConfig[session].color} ${sessionConfig[session].borderColor} scale-105` 
                    : 'bg-white border-[#3e2723] hover:scale-105'
                }`}
              >
                <Icon className={`w-8 h-8 mx-auto mb-2 ${isActive ? 'text-white' : 'text-[#3e2723]'}`} />
                <span className={`${isActive ? 'text-white drop-shadow-[1px_1px_0_rgba(0,0,0,0.5)]' : 'text-[#3e2723]'}`}>
                  {sessionConfig[session].label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Chat Container */}
        <div className="bg-[#f5f1e3] border-4 border-[#3e2723] pixel-shadow-lg overflow-hidden flex flex-col" style={{ height: 'calc(100vh - 280px)' }}>
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] p-4 border-4 pixel-shadow-sm ${
                    message.sender === 'user'
                      ? `bg-gradient-to-b ${config.color} ${config.borderColor} text-white`
                      : 'bg-white border-[#3e2723] text-[#3e2723]'
                  }`}
                >
                  {message.attachment && (
                    <div className="mb-2 p-2 bg-black/10 border-2 border-black/20 flex items-center gap-2">
                      {message.attachment.type === 'image' ? (
                        <ImageIcon className="w-4 h-4" />
                      ) : (
                        <FileText className="w-4 h-4" />
                      )}
                      <span className="text-sm truncate">{message.attachment.name}</span>
                    </div>
                  )}
                  <p className="whitespace-pre-line">{message.text}</p>
                  <span className={`text-xs mt-2 block opacity-70`}>
                    {message.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            
            {/* Mood Selector */}
            {showMoodSelector && currentSession === 'mood' && (
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
            {/* File Upload Preview */}
            {uploadedFiles.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="bg-[#e0d5c7] border-2 border-[#3e2723] px-3 py-1 text-sm flex items-center gap-2">
                    {file.type.includes('image') ? <ImageIcon className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                    <span className="truncate max-w-[150px]">{file.name}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*,.pdf"
                multiple
                className="hidden"
              />
              
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-[#ffcc33] hover:bg-[#ff9933] p-3 border-4 border-[#d4a02c] pixel-button transition-all"
                title="Enviar arquivo"
              >
                <Paperclip className="w-5 h-5 text-[#3e2723]" />
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Digite sua mensagem..."
                className="flex-1 px-4 py-3 border-4 border-[#3e2723] bg-white text-[#3e2723] placeholder-[#8d6e63] focus:outline-none focus:border-[#5a9e36]"
              />

              <button
                onClick={handleSendMessage}
                className={`bg-gradient-to-b ${config.color} hover:brightness-110 text-white px-6 py-3 border-4 ${config.borderColor} pixel-button transition-all`}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-3 flex items-center gap-2 text-sm text-[#6d4c41]">
              <Upload className="w-4 h-4" />
              <span>Envie PDFs ou imagens para análise e recomendação de materiais</span>
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
                marginTop: `-${Math.random() * 6}px`
              }}
            />
          ))}
        </div>
        <div className="absolute top-2 left-0 right-0 flex justify-around">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="text-xl">
              {['🌼', '🌸', '🌺', '🌻'][Math.floor(Math.random() * 4)]}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}