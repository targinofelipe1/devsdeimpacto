import { User } from '../App';
import { ArrowLeft, BookOpen, Star } from 'lucide-react';
import { useState } from 'react';
import { SensoryModeToggle } from './SensoryModeToggle';

interface LearningPathProps {
  user: User;
  subject: string;
  onBack: () => void;
  onStartTopic: (topicId: string) => void;
}

interface Topic {
  id: string;
  title: string;
  level: number;
  icon: string;
  stars: number;
  completed: boolean;
  locked: boolean;
}

const subjectData: Record<string, { name: string; color: string; borderColor: string; topics: Topic[] }> = {
  math: {
    name: 'Matemática',
    color: 'from-[#3da5c2] to-[#2d8aa2]',
    borderColor: 'border-[#1e6b7f]',
    topics: [
      { id: 'math-1', title: 'Multiplicação Mágica', level: 1, icon: '🔢', stars: 3, completed: true, locked: false },
      { id: 'math-2', title: 'Divisão Dimensional', level: 2, icon: '➗', stars: 2, completed: false, locked: false },
      { id: 'math-3', title: 'Frações Fantásticas', level: 3, icon: '🍕', stars: 0, completed: false, locked: false },
      { id: 'math-4', title: 'Potências Poderosas', level: 4, icon: '⚡', stars: 0, completed: false, locked: true },
      { id: 'math-5', title: 'Equações Épicas', level: 5, icon: '⚖️', stars: 0, completed: false, locked: true }
    ]
  },
  portuguese: {
    name: 'Português',
    color: 'from-[#5a9e36] to-[#3d7025]',
    borderColor: 'border-[#2d5016]',
    topics: [
      { id: 'port-1', title: 'Substantivos Sensacionais', level: 1, icon: '📝', stars: 3, completed: true, locked: false },
      { id: 'port-2', title: 'Verbos Vibrantes', level: 2, icon: '🎭', stars: 2, completed: false, locked: false },
      { id: 'port-3', title: 'Adjetivos Admiráveis', level: 3, icon: '🎨', stars: 0, completed: false, locked: false },
      { id: 'port-4', title: 'Pontuação Perfeita', level: 4, icon: '❗', stars: 0, completed: false, locked: true },
      { id: 'port-5', title: 'Interpretação de Texto', level: 5, icon: '📖', stars: 0, completed: false, locked: true }
    ]
  },
  science: {
    name: 'Ciências',
    color: 'from-[#9b59b6] to-[#8e44ad]',
    borderColor: 'border-[#6c3483]',
    topics: [
      { id: 'sci-1', title: 'Célula: A Unidade da Vida', level: 1, icon: '🔬', stars: 3, completed: true, locked: false },
      { id: 'sci-2', title: 'Sistema Solar', level: 2, icon: '🌍', stars: 1, completed: false, locked: false },
      { id: 'sci-3', title: 'Estados da Matéria', level: 3, icon: '💧', stars: 0, completed: false, locked: false },
      { id: 'sci-4', title: 'Energia e Movimento', level: 4, icon: '⚡', stars: 0, completed: false, locked: true },
      { id: 'sci-5', title: 'Ecossistemas', level: 5, icon: '🌿', stars: 0, completed: false, locked: true }
    ]
  },
  history: {
    name: 'História',
    color: 'from-[#ffcc33] to-[#ff9933]',
    borderColor: 'border-[#d4a02c]',
    topics: [
      { id: 'hist-1', title: 'Descobrimento do Brasil', level: 1, icon: '🏛️', stars: 2, completed: false, locked: false },
      { id: 'hist-2', title: 'Período Colonial', level: 2, icon: '⚓', stars: 0, completed: false, locked: false },
      { id: 'hist-3', title: 'Independência', level: 3, icon: '🎆', stars: 0, completed: false, locked: false },
      { id: 'hist-4', title: 'República', level: 4, icon: '🏛️', stars: 0, completed: false, locked: true },
      { id: 'hist-5', title: 'Brasil Contemporâneo', level: 5, icon: '📰', stars: 0, completed: false, locked: true }
    ]
  },
  geography: {
    name: 'Geografia',
    color: 'from-[#16a085] to-[#138871]',
    borderColor: 'border-[#0e6655]',
    topics: [
      { id: 'geo-1', title: 'Continentes e Oceanos', level: 1, icon: '🌍', stars: 3, completed: true, locked: false },
      { id: 'geo-2', title: 'Relevo Brasileiro', level: 2, icon: '⛰️', stars: 1, completed: false, locked: false },
      { id: 'geo-3', title: 'Clima e Vegetação', level: 3, icon: '🌦️', stars: 0, completed: false, locked: false },
      { id: 'geo-4', title: 'Recursos Naturais', level: 4, icon: '💎', stars: 0, completed: false, locked: true },
      { id: 'geo-5', title: 'População e Urbanização', level: 5, icon: '🏙️', stars: 0, completed: false, locked: true }
    ]
  },
  english: {
    name: 'Inglês',
    color: 'from-[#e91e63] to-[#c2185b]',
    borderColor: 'border-[#8b0f3d]',
    topics: [
      { id: 'eng-1', title: 'Colors and Numbers', level: 1, icon: '🌈', stars: 3, completed: true, locked: false },
      { id: 'eng-2', title: 'Animals and Nature', level: 2, icon: '🦁', stars: 2, completed: false, locked: false },
      { id: 'eng-3', title: 'Daily Routines', level: 3, icon: '⏰', stars: 0, completed: false, locked: false },
      { id: 'eng-4', title: 'Family and Friends', level: 4, icon: '👨‍👩‍👧‍👦', stars: 0, completed: false, locked: true },
      { id: 'eng-5', title: 'Present Continuous', level: 5, icon: '📚', stars: 0, completed: false, locked: true }
    ]
  }
};

export function LearningPath({ user, subject, onBack, onStartTopic }: LearningPathProps) {
  const data = subjectData[subject];

  if (!data) {
    return (
      <div className="min-h-screen bg-[#8bd3dd] flex items-center justify-center">
        <div className="bg-[#f5f1e3] border-4 border-[#3e2723] p-8 pixel-shadow-lg text-center">
          <h2 className="text-[#3e2723] mb-4">Matéria não encontrada!</h2>
          <button
            onClick={onBack}
            className="bg-gradient-to-b from-[#5a9e36] to-[#3d7025] text-white px-6 py-3 border-4 border-[#2d5016] pixel-button"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#8bd3dd] pb-20 relative overflow-hidden">
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
      <div className={`bg-gradient-to-r ${data.color} border-b-4 ${data.borderColor}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="bg-white hover:bg-gray-200 px-4 py-3 border-4 border-[#3e2723] pixel-button transition-all flex items-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Voltar</span>
              </button>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white border-4 border-[#3e2723] flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-[#3e2723]" />
                </div>
                <h1 className="text-white drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)]">Trilhas de Aprendizado</h1>
              </div>
            </div>
            <SensoryModeToggle />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Subject Title */}
        <div className="bg-[#f5f1e3] border-4 border-[#3e2723] p-6 mb-8 pixel-shadow-lg text-center">
          <h2 className={`text-[#3e2723] mb-2`}>{data.name}</h2>
          <p className="text-[#6d4c41]">Complete os tópicos para dominar a matéria!</p>
        </div>

        {/* Learning Path */}
        <div className="max-w-4xl mx-auto space-y-6">
          {data.topics.map((topic, index) => (
            <div key={topic.id} className="relative">
              {/* Connector Line */}
              {index < data.topics.length - 1 && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full h-6 w-1 bg-[#3e2723] z-0"></div>
              )}

              {/* Topic Card */}
              <div className={`bg-white border-4 ${data.borderColor} p-6 pixel-shadow-lg relative z-10 ${topic.locked ? 'opacity-60' : ''}`}>
                <div className="flex items-center gap-6">
                  {/* Icon */}
                  <div className={`bg-gradient-to-b ${data.color} border-4 ${data.borderColor} p-4 w-24 h-24 flex items-center justify-center`}>
                    <span className="text-5xl">{topic.icon}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`bg-gradient-to-r ${data.color} text-white px-3 py-1 border-2 ${data.borderColor} text-sm`}>
                        {data.name}
                      </span>
                      <span className="bg-white px-3 py-1 border-2 border-[#3e2723] text-sm text-[#3e2723]">
                        Nível {topic.level}
                      </span>
                    </div>
                    <h3 className="text-[#3e2723] mb-2">{topic.title}</h3>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3].map((star) => (
                        <Star
                          key={star}
                          className={`w-6 h-6 ${
                            star <= topic.stars
                              ? 'fill-[#ffcc33] text-[#ffcc33]'
                              : 'fill-[#d0d0d0] text-[#d0d0d0]'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-3">
                    {topic.completed && (
                      <div className="bg-[#5a9e36] text-white px-4 py-2 border-4 border-[#3d7025] flex items-center gap-2 pixel-shadow-sm">
                        <span>✓ Completa</span>
                      </div>
                    )}
                    <button
                      onClick={() => !topic.locked && onStartTopic(topic.id)}
                      disabled={topic.locked}
                      className={`px-6 py-3 border-4 pixel-button transition-all ${
                        topic.locked
                          ? 'bg-[#7a7a7a] border-[#5a5a5a] text-white cursor-not-allowed'
                          : topic.completed
                          ? 'bg-white hover:bg-gray-200 border-[#3e2723] text-[#3e2723]'
                          : `bg-gradient-to-b ${data.color} border-[#3e2723] text-white hover:brightness-110`
                      }`}
                    >
                      {topic.locked ? '🔒 Bloqueado' : topic.completed ? 'Revisar' : 'Iniciar'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
