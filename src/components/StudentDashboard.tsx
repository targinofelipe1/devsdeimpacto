import { User } from '../App';
import { Sparkles, MessageCircle, Trophy, User as UserIcon, LogOut, Lightbulb, Headphones, Sword, ShoppingBag } from 'lucide-react';
import { SensoryModeToggle } from './SensoryModeToggle';

interface StudentDashboardProps {
  user: User;
  onStartBattle: (topic: string) => void;
  onNavigate: (view: 'home' | 'dashboard' | 'battle' | 'emotional' | 'profile' | 'ranking' | 'chat' | 'shop' | 'path') => void;
  onLogout: () => void;
}

const topics = [
  { id: 'math', name: 'Matemática', icon: '🔢', color: 'from-[#3da5c2] to-[#2d8aa2]' },
  { id: 'portuguese', name: 'Português', icon: '📚', color: 'from-[#5a9e36] to-[#3d7025]' },
  { id: 'science', name: 'Ciências', icon: '🔬', color: 'from-[#9b59b6] to-[#8e44ad]' },
  { id: 'history', name: 'História', icon: '🏛️', color: 'from-[#ffcc33] to-[#ff9933]' },
  { id: 'geography', name: 'Geografia', icon: '🌍', color: 'from-[#16a085] to-[#138871]' },
  { id: 'english', name: 'Inglês', icon: '🌐', color: 'from-[#e91e63] to-[#c2185b]' }
];

const getLevelInfo = (level: number) => {
  const levels = [
    { name: 'Coruja Jovem', icon: '🐣', color: 'text-[#ffcc33]' },
    { name: 'Raposa', icon: '🦊', color: 'text-[#ff9933]' },
    { name: 'Tigre', icon: '🐯', color: 'text-[#ff6b1a]' },
    { name: 'Águia', icon: '🦅', color: 'text-[#3da5c2]' }
  ];
  const index = Math.min(level - 1, levels.length - 1);
  return levels[index];
};

export function StudentDashboard({ user, onStartBattle, onNavigate, onLogout }: StudentDashboardProps) {
  const levelInfo = getLevelInfo(user.level);
  const progressToNextLevel = (user.xp % 500) / 500 * 100;

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

      {/* Header Pixel Art */}
      <div className="bg-gradient-to-r from-[#5a9e36] to-[#3d7025] border-b-4 border-[#2d5016]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white border-4 border-[#3e2723] flex items-center justify-center pixel-shadow-lg">
                <span className="text-3xl">{user.avatar}</span>
              </div>
              <div>
                <h2 className="text-white drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)]">{user.nickname || user.name}</h2>
                <div className="flex items-center gap-2">
                  <span className={`text-xl ${levelInfo.color}`}>{levelInfo.icon}</span>
                  <span className="text-white/90">{levelInfo.name} - Nível {user.level}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <SensoryModeToggle />
              <button
                onClick={() => onNavigate('shop')}
                className="bg-[#ffcc33] hover:bg-[#ffdd44] px-4 py-2 border-4 border-[#d4a02c] flex items-center gap-2 pixel-shadow-sm pixel-button transition-all"
                title="Clique para abrir a Loja de Badges"
              >
                <Sparkles className="w-5 h-5 text-[#3e2723]" />
                <span className="text-[#3e2723] font-bold">{user.gems} Gemas</span>
              </button>
              <button
                onClick={() => onNavigate('profile')}
                className="bg-white hover:bg-gray-200 px-4 py-2 border-4 border-[#3e2723] flex items-center gap-2 pixel-button transition-all"
              >
                <UserIcon className="w-5 h-5" />
                <span>Perfil</span>
              </button>
              <button
                onClick={onLogout}
                className="bg-[#d32f2f] hover:bg-[#b71c1c] text-white px-4 py-2 border-4 border-[#8b0000] flex items-center gap-2 pixel-button transition-all"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Quick Actions - Pixel Art Style */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <button
            onClick={() => onNavigate('chat')}
            className="bg-gradient-to-b from-[#ff6b6b] to-[#d32f2f] p-6 border-4 border-[#8b0000] hover:scale-105 pixel-button transition-transform"
          >
            <div className="text-4xl mx-auto mb-2">👩‍💼</div>
            <span className="text-white drop-shadow-[1px_1px_0_rgba(0,0,0,0.5)]">Fale comigo</span>
          </button>
          
          <button
            onClick={() => onNavigate('ranking')}
            className="bg-gradient-to-b from-[#ffcc33] to-[#ff9933] p-6 border-4 border-[#d4a02c] hover:scale-105 pixel-button transition-transform"
          >
            <Trophy className="w-12 h-12 mx-auto mb-2 text-white drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)]" />
            <span className="text-white drop-shadow-[1px_1px_0_rgba(0,0,0,0.5)]">Ranking</span>
          </button>

          <button
            onClick={() => alert('Flashcards em breve!')}
            className="bg-gradient-to-b from-[#ff9933] to-[#ff6b1a] p-6 border-4 border-[#d4610f] hover:scale-105 pixel-button transition-transform"
          >
            <Lightbulb className="w-12 h-12 mx-auto mb-2 text-white drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)]" />
            <span className="text-white drop-shadow-[1px_1px_0_rgba(0,0,0,0.5)]">Flashcards</span>
          </button>

          <button
            onClick={() => alert('Podcasts em breve!')}
            className="bg-gradient-to-b from-[#9b59b6] to-[#8e44ad] p-6 border-4 border-[#6c3483] hover:scale-105 pixel-button transition-transform"
          >
            <Headphones className="w-12 h-12 mx-auto mb-2 text-white drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)]" />
            <span className="text-white drop-shadow-[1px_1px_0_rgba(0,0,0,0.5)]">Podcasts</span>
          </button>
        </div>

        {/* Main Content - Battle Selection */}
        <div className="bg-[#f5f1e3] border-4 border-[#3e2723] p-6 mb-8 pixel-shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#d32f2f] border-4 border-[#8b0000] flex items-center justify-center">
              <Sword className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-[#3e2723]">Escolha sua Batalha!</h2>
          </div>
          <p className="text-[#6d4c41] mb-6">
            Selecione uma disciplina e enfrente o desafio do conhecimento. Cada vitória te aproxima do próximo nível!
          </p>

          <div className="grid grid-cols-3 gap-4">
            {topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => onStartBattle(topic.id)}
                className={`bg-gradient-to-b ${topic.color} p-6 border-4 border-[#3e2723] hover:scale-105 pixel-button transition-transform group`}
              >
                <div className="text-5xl mb-3">{topic.icon}</div>
                <h3 className="text-white drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)] mb-2">{topic.name}</h3>
                <div className="bg-white/30 backdrop-blur-sm px-3 py-1 border-2 border-white/50 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  Iniciar →
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Progress Thermometer - Pixel Art Style */}
        <div className="bg-[#f5f1e3] border-4 border-[#3e2723] p-6 pixel-shadow-lg">
          <h3 className="mb-4 text-[#3e2723]">Seu Progresso</h3>
          <div className="flex items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#6d4c41]">Próximo Nível</span>
                <span className="text-[#6d4c41]">{Math.round(progressToNextLevel)}%</span>
              </div>
              <div className="h-8 bg-[#e0d5c7] border-4 border-[#3e2723] overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#5a9e36] to-[#3d7025] transition-all duration-500"
                  style={{ width: `${progressToNextLevel}%` }}
                >
                  <div className="h-full w-full bg-white/20"></div>
                </div>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-[#6d4c41]">{user.xp} XP</span>
                <span className="text-[#6d4c41]">{Math.ceil(user.xp / 500) * 500} XP</span>
              </div>
            </div>
            <div className="text-6xl">{levelInfo.icon}</div>
          </div>
        </div>
      </div>

      {/* Pixel grass at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-[#5a9e36] to-[#3d7025] border-t-4 border-[#2d5016]">
        {/* Grass blades decoration */}
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
        {/* Decorative flowers */}
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