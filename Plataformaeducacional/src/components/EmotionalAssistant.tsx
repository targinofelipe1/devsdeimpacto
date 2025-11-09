import { useState } from 'react';
import { User } from '../App';
import { X, Heart, Smile, Meh, Frown, Zap } from 'lucide-react';

interface EmotionalAssistantProps {
  user: User;
  onClose: () => void;
}

const moods = [
  { id: 'happy', label: 'Feliz', icon: '😊', color: 'bg-green-400', Icon: Smile },
  { id: 'excited', label: 'Animado', icon: '🤩', color: 'bg-yellow-400', Icon: Zap },
  { id: 'calm', label: 'Calmo', icon: '😌', color: 'bg-blue-400', Icon: Meh },
  { id: 'tired', label: 'Cansado', icon: '😴', color: 'bg-gray-400', Icon: Meh },
  { id: 'anxious', label: 'Ansioso', icon: '😰', color: 'bg-orange-400', Icon: Frown },
  { id: 'sad', label: 'Triste', icon: '😢', color: 'bg-purple-400', Icon: Frown }
];

const reflectiveQuestions = [
  'O que aconteceu de bom hoje?',
  'Tem algo que te incomodou?',
  'Como foi sua aula hoje?',
  'Você se sentiu bem estudando?'
];

export function EmotionalAssistant({ user, onClose }: EmotionalAssistantProps) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showSummary, setShowSummary] = useState(false);

  const handleMoodSelect = (moodId: string) => {
    setSelectedMood(moodId);
  };

  const handleAnswerSelect = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < reflectiveQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowSummary(true);
    }
  };

  const getRecommendation = () => {
    if (!selectedMood) return null;

    const recommendations: Record<string, { message: string; actions: string[] }> = {
      happy: {
        message: 'Que ótimo que você está feliz! Continue assim! 🌟',
        actions: ['Aproveite para estudar seus tópicos favoritos', 'Compartilhe sua alegria com colegas', 'Tente um desafio mais difícil']
      },
      excited: {
        message: 'Você está cheio de energia! Vamos canalizar isso para o aprendizado! ⚡',
        actions: ['Faça uma batalha de quiz', 'Explore um novo tema', 'Participe do ranking']
      },
      calm: {
        message: 'Que tranquilidade! Momento perfeito para focar nos estudos. 🧘',
        actions: ['Revisar conteúdos já aprendidos', 'Fazer exercícios de concentração', 'Organizar suas metas']
      },
      tired: {
        message: 'Percebo que você está cansado. Que tal uma pausa? 💤',
        actions: ['Ouvir um podcast relaxante', 'Fazer uma pausa de 10 minutos', 'Voltar quando se sentir melhor']
      },
      anxious: {
        message: 'Entendo que você está ansioso. Vamos fazer uma pausa para respirar. 🌬️',
        actions: ['Exercício de respiração guiada', 'Sons relaxantes', 'Conversar com um professor']
      },
      sad: {
        message: 'Sinto muito que você esteja triste. Estou aqui para te apoiar. 💙',
        actions: ['Falar com a coordenação pedagógica', 'Fazer uma atividade leve e divertida', 'Ouvir música calmante']
      }
    };

    return recommendations[selectedMood];
  };

  if (showSummary && selectedMood) {
    const recommendation = getRecommendation();
    const selectedMoodData = moods.find(m => m.id === selectedMood);

    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-400 to-pink-400 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg border-4 border-purple-600 shadow-2xl p-8 max-w-2xl w-full">
          <div className="flex justify-between items-center mb-6">
            <h2>Resumo do Check-in Emocional</h2>
            <button
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="text-center mb-8">
            <div className="text-8xl mb-4">{selectedMoodData?.icon}</div>
            <h3 className="mb-2">Você está se sentindo: {selectedMoodData?.label}</h3>
          </div>

          {recommendation && (
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg border-2 border-purple-300 p-6 mb-6">
              <p className="mb-4">{recommendation.message}</p>
              <h4 className="mb-3">Sugestões para você:</h4>
              <ul className="space-y-2">
                {recommendation.actions.map((action, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">✨</span>
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-blue-50 rounded-lg border-2 border-blue-300 p-4 mb-6">
            <p className="flex items-center gap-2 text-blue-800">
              <Heart className="w-5 h-5" />
              Seu registro foi salvo e está disponível no seu perfil
            </p>
          </div>

          {selectedMood === 'anxious' || selectedMood === 'sad' ? (
            <div className="bg-yellow-50 rounded-lg border-2 border-yellow-400 p-4 mb-6">
              <p className="text-yellow-800">
                ⚠️ Um alerta foi enviado para a coordenação pedagógica. Alguém entrará em contato em breve.
              </p>
            </div>
          ) : null}

          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-lg border-2 border-purple-700 transition-all"
          >
            Voltar ao Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (selectedMood && currentQuestion < reflectiveQuestions.length) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-400 to-pink-400 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg border-4 border-purple-600 shadow-2xl p-8 max-w-2xl w-full">
          <div className="flex justify-between items-center mb-6">
            <h3>Pergunta {currentQuestion + 1} de {reflectiveQuestions.length}</h3>
            <button
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🤔</div>
            <h3 className="mb-6">{reflectiveQuestions[currentQuestion]}</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleAnswerSelect('Sim, foi bom')}
              className="bg-gradient-to-b from-green-400 to-green-600 text-white p-6 rounded-lg border-4 border-green-700 hover:scale-105 transition-transform"
            >
              <Smile className="w-12 h-12 mx-auto mb-2" />
              <span>Sim, foi bom</span>
            </button>

            <button
              onClick={() => handleAnswerSelect('Mais ou menos')}
              className="bg-gradient-to-b from-yellow-400 to-yellow-600 text-white p-6 rounded-lg border-4 border-yellow-700 hover:scale-105 transition-transform"
            >
              <Meh className="w-12 h-12 mx-auto mb-2" />
              <span>Mais ou menos</span>
            </button>

            <button
              onClick={() => handleAnswerSelect('Não muito')}
              className="bg-gradient-to-b from-orange-400 to-orange-600 text-white p-6 rounded-lg border-4 border-orange-700 hover:scale-105 transition-transform"
            >
              <Frown className="w-12 h-12 mx-auto mb-2" />
              <span>Não muito</span>
            </button>

            <button
              onClick={() => handleAnswerSelect('Prefiro não responder')}
              className="bg-gradient-to-b from-gray-400 to-gray-600 text-white p-6 rounded-lg border-4 border-gray-700 hover:scale-105 transition-transform"
            >
              <Meh className="w-12 h-12 mx-auto mb-2" />
              <span>Prefiro não responder</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-400 to-pink-400 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg border-4 border-purple-600 shadow-2xl p-8 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h2>Como você está se sentindo hoje?</h2>
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="text-center mb-8">
          <div className="text-6xl mb-4">💭</div>
          <p className="text-gray-600">
            Escolha o emoji que melhor representa como você está agora
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {moods.map((mood) => (
            <button
              key={mood.id}
              onClick={() => handleMoodSelect(mood.id)}
              className={`${mood.color} p-6 rounded-lg border-4 border-gray-700 hover:scale-105 transition-transform group`}
            >
              <div className="text-5xl mb-2">{mood.icon}</div>
              <span className="text-white">{mood.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-8 bg-purple-50 rounded-lg border-2 border-purple-300 p-4">
          <p className="text-purple-800 flex items-center gap-2">
            <Heart className="w-5 h-5" />
            Suas respostas são privadas e ajudam você a acompanhar seu bem-estar
          </p>
        </div>
      </div>
    </div>
  );
}
