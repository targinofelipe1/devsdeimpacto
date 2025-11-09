import { User } from '../App';
import { ArrowLeft, Trophy, Sparkles, Heart, TrendingUp, Edit } from 'lucide-react';
import { useState } from 'react';
import { AvatarCustomizer } from './AvatarCustomizer';

interface ProfilePageProps {
  user: User;
  onBack: () => void;
  onUpdateAvatar: (avatar: string) => void;
}

// Badges da loja - mesmas da BadgeShop
const shopBadges = [
  // Latão (100 gemas)
  { id: 'brass-explorer', name: 'Explorador de Latão', tier: 'brass', icon: '🗺️', color: 'from-[#b08d57] to-[#9a7b4f]', borderColor: 'border-[#7d6841]' },
  { id: 'brass-reader', name: 'Leitor de Latão', tier: 'brass', icon: '📖', color: 'from-[#b08d57] to-[#9a7b4f]', borderColor: 'border-[#7d6841]' },
  { id: 'brass-math', name: 'Matemático de Latão', tier: 'brass', icon: '🔢', color: 'from-[#b08d57] to-[#9a7b4f]', borderColor: 'border-[#7d6841]' },
  
  // Bronze (200 gemas)
  { id: 'bronze-warrior', name: 'Guerreiro de Bronze', tier: 'bronze', icon: '⚔️', color: 'from-[#cd7f32] to-[#b87333]', borderColor: 'border-[#8b5a2b]' },
  { id: 'bronze-scientist', name: 'Cientista de Bronze', tier: 'bronze', icon: '�', color: 'from-[#cd7f32] to-[#b87333]', borderColor: 'border-[#8b5a2b]' },
  { id: 'bronze-linguist', name: 'Linguista de Bronze', tier: 'bronze', icon: '🌐', color: 'from-[#cd7f32] to-[#b87333]', borderColor: 'border-[#8b5a2b]' },
  
  // Prata (300 gemas)
  { id: 'silver-champion', name: 'Campeão de Prata', tier: 'silver', icon: '🏆', color: 'from-[#c0c0c0] to-[#a8a8a8]', borderColor: 'border-[#808080]' },
  { id: 'silver-genius', name: 'Gênio de Prata', tier: 'silver', icon: '🧠', color: 'from-[#c0c0c0] to-[#a8a8a8]', borderColor: 'border-[#808080]' },
  { id: 'silver-artist', name: 'Artista de Prata', tier: 'silver', icon: '🎨', color: 'from-[#c0c0c0] to-[#a8a8a8]', borderColor: 'border-[#808080]' },
  
  // Ouro (400 gemas)
  { id: 'gold-master', name: 'Mestre de Ouro', tier: 'gold', icon: '👑', color: 'from-[#ffd700] to-[#ffcc00]', borderColor: 'border-[#daa520]' },
  { id: 'gold-legend', name: 'Lenda de Ouro', tier: 'gold', icon: '⭐', color: 'from-[#ffd700] to-[#ffcc00]', borderColor: 'border-[#daa520]' },
  { id: 'gold-prodigy', name: 'Prodígio de Ouro', tier: 'gold', icon: '�', color: 'from-[#ffd700] to-[#ffcc00]', borderColor: 'border-[#daa520]' },
  
  // Platina (500 gemas)
  { id: 'platinum-supreme', name: 'Supremo de Platina', tier: 'platinum', icon: '💎', color: 'from-[#e5e4e2] to-[#d3d3d3]', borderColor: 'border-[#b0b0b0]' },
  { id: 'platinum-transcendent', name: 'Transcendente de Platina', tier: 'platinum', icon: '🌟', color: 'from-[#e5e4e2] to-[#d3d3d3]', borderColor: 'border-[#b0b0b0]' },
  { id: 'platinum-immortal', name: 'Imortal de Platina', tier: 'platinum', icon: '✨', color: 'from-[#e5e4e2] to-[#d3d3d3]', borderColor: 'border-[#b0b0b0]' },
];

// Badges de conquistas (antigas)
const achievementBadges = [
  { id: 'first-victory', name: 'Primeira Vitória', icon: '🏆' },
  { id: 'explorer', name: 'Explorador', icon: '🗺️' },
  { id: 'persistent', name: 'Persistente', icon: '💪' },
  { id: 'math-master', name: 'Mestre da Matemática', icon: '�' },
  { id: 'bookworm', name: 'Leitor Voraz', icon: '📚' },
  { id: 'scientist', name: 'Cientista', icon: '🔬' }
];

const achievements = [
  { date: '08/11/2025', description: 'Completou 5 batalhas de Matemática', gems: 25 },
  { date: '07/11/2025', description: 'Subiu para Nível 2 - Raposa', gems: 0 },
  { date: '06/11/2025', description: 'Primeira batalha vencida!', gems: 25 },
  { date: '05/11/2025', description: 'Completou o tutorial', gems: 10 }
];

const emotionalHistory = [
  { date: '09/11', mood: '😊', label: 'Feliz' },
  { date: '08/11', mood: '🤩', label: 'Animado' },
  { date: '07/11', mood: '😌', label: 'Calmo' },
  { date: '06/11', mood: '😊', label: 'Feliz' },
  { date: '05/11', mood: '🤩', label: 'Animado' },
  { date: '04/11', mood: '😊', label: 'Feliz' },
  { date: '03/11', mood: '😴', label: 'Cansado' }
];

const getLevelInfo = (level: number) => {
  const levels = [
    { name: 'Coruja Jovem', icon: '🐣', color: 'from-[#ffcc33] to-[#ff9933]', nextLevel: 'Raposa' },
    { name: 'Raposa', icon: '🦊', color: 'from-[#ff9933] to-[#ff6b1a]', nextLevel: 'Tigre' },
    { name: 'Tigre', icon: '🐯', color: 'from-[#ff6b1a] to-[#d32f2f]', nextLevel: 'Águia' },
    { name: 'Águia', icon: '🦅', color: 'from-[#3da5c2] to-[#5fcde4]', nextLevel: 'Máximo!' }
  ];
  const index = Math.min(level - 1, levels.length - 1);
  return levels[index];
};

export function ProfilePage({ user, onBack, onUpdateAvatar }: ProfilePageProps) {
  const [showAvatarCustomizer, setShowAvatarCustomizer] = useState(false);
  const levelInfo = getLevelInfo(user.level);
  const progressToNextLevel = (user.xp % 500) / 500 * 100;
  
  // Filtra as badges que o usuário comprou
  const userPurchasedBadges = shopBadges.filter(badge => user.badges?.includes(badge.id));
  const totalBadgesAvailable = shopBadges.length;
  const earnedBadgesCount = userPurchasedBadges.length;

  return (
    <div className="min-h-screen bg-[#8bd3dd] pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#5a9e36] to-[#3d7025] border-b-4 border-[#2d5016]">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={onBack}
            className="bg-white hover:bg-gray-200 px-4 py-2 border-4 border-[#3e2723] pixel-button transition-all flex items-center gap-2 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar</span>
          </button>
          
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 bg-white border-4 border-[#3e2723] flex items-center justify-center pixel-shadow-lg">
                <span className="text-6xl">{user.avatar}</span>
              </div>
              <button
                onClick={() => setShowAvatarCustomizer(true)}
                className="absolute -bottom-2 -right-2 bg-[#ffcc33] hover:bg-[#ff9933] border-4 border-[#d4a02c] w-10 h-10 flex items-center justify-center pixel-button"
                title="Personalizar Avatar"
              >
                <Edit className="w-5 h-5 text-[#3e2723]" />
              </button>
            </div>
            <div className="flex-1">
              <h1 className="text-white drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)] mb-2">{user.nickname || user.name}</h1>
              <p className="text-white/90 mb-2">Nome Real: {user.name}</p>
              <div className="flex items-center gap-4">
                <div className="bg-white/30 backdrop-blur-sm px-4 py-2 border-2 border-white/50 flex items-center gap-2">
                  <span className="text-3xl">{levelInfo.icon}</span>
                  <span className="text-white">{levelInfo.name} - Nível {user.level}</span>
                </div>
                <div className="bg-[#ffcc33] px-4 py-2 border-4 border-[#d4a02c] flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#3e2723]" />
                  <span className="text-[#3e2723]">{user.gems} Gemas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Progress Thermometer */}
          <div className="bg-[#f5f1e3] border-4 border-[#3e2723] p-6 pixel-shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#5a9e36] border-4 border-[#3d7025] flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-[#3e2723]">Termômetro de Progresso</h2>
            </div>

            <div className="text-center mb-6">
              <div className="inline-block relative">
                {/* Thermometer */}
                <div className="w-32 h-80 bg-[#e0d5c7] border-4 border-[#3e2723] relative overflow-hidden">
                  <div
                    className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t ${levelInfo.color} transition-all duration-1000`}
                    style={{ height: `${progressToNextLevel}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20"></div>
                  </div>
                  
                  {/* Level markers */}
                  <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-between py-4">
                    {[100, 75, 50, 25, 0].map((mark) => (
                      <div key={mark} className="flex items-center">
                        <div className="h-1 w-6 bg-[#3e2723] ml-auto"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Level icon */}
                <div className="absolute -right-16 top-1/2 -translate-y-1/2 text-7xl">
                  {levelInfo.icon}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#ffcc33] to-[#ff9933] border-4 border-[#d4a02c] p-4">
              <div className="flex justify-between mb-2">
                <span className="text-[#3e2723]">Nível Atual:</span>
                <span className="text-[#3e2723]">{levelInfo.name}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-[#3e2723]">Próximo Nível:</span>
                <span className="text-[#3e2723]">{levelInfo.nextLevel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#3e2723]">Progresso:</span>
                <span className="text-[#3e2723]">{Math.round(progressToNextLevel)}%</span>
              </div>
              <div className="mt-3 pt-3 border-t-2 border-[#d4a02c]">
                <div className="flex justify-between">
                  <span className="text-[#3e2723]">XP:</span>
                  <span className="text-[#3e2723]">{user.xp} / {Math.ceil(user.xp / 500) * 500}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="bg-[#f5f1e3] border-4 border-[#3e2723] p-6 pixel-shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#ffcc33] border-4 border-[#d4a02c] flex items-center justify-center">
                <Trophy className="w-6 h-6 text-[#3e2723]" />
              </div>
              <h2 className="text-[#3e2723]">Conquistas e Insígnias</h2>
            </div>

            <div className="mb-4 bg-[#ffcc33] border-4 border-[#d4a02c] p-3">
              <p className="text-[#3e2723]">
                {earnedBadgesCount} de {totalBadgesAvailable} insígnias conquistadas
              </p>
            </div>

            {userPurchasedBadges.length > 0 ? (
              <div className="grid grid-cols-3 gap-4 mb-6">
                {userPurchasedBadges.map((badge) => (
                  <div
                    key={badge.id}
                    className={`bg-gradient-to-b ${badge.color} ${badge.borderColor} border-4 p-4 text-center pixel-shadow-sm`}
                  >
                    <div className="text-4xl mb-2">{badge.icon}</div>
                    <p className="text-white drop-shadow-[1px_1px_0_rgba(0,0,0,0.5)] text-sm">{badge.name}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-[#d3d3d3] border-4 border-[#a8a8a8] p-6 text-center mb-6">
                <p className="text-[#6d4c41] mb-2">🏅 Nenhuma insígnia conquistada ainda!</p>
                <p className="text-[#6d4c41] text-sm">Visite a Loja de Badges e compre suas primeiras insígnias com gemas.</p>
              </div>
            )}

            <h3 className="mb-4 text-[#3e2723]">Histórico de Conquistas</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-[#8bd3dd] to-[#5fcde4] border-4 border-[#3da5c2] p-3"
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[#3e2723]">{achievement.date}</span>
                    {achievement.gems > 0 && (
                      <span className="text-[#3e2723] bg-[#ffcc33] px-2 border-2 border-[#d4a02c]">+{achievement.gems} 💎</span>
                    )}
                  </div>
                  <p className="text-[#3e2723]">{achievement.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Emotional History */}
          <div className="bg-[#f5f1e3] border-4 border-[#3e2723] p-6 pixel-shadow-lg lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#ff6b6b] border-4 border-[#d32f2f] flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-[#3e2723]">Histórico Emocional</h2>
            </div>

            <p className="text-[#6d4c41] mb-6">
              Acompanhe como você tem se sentido ao longo dos dias
            </p>

            <div className="grid grid-cols-7 gap-4">
              {emotionalHistory.map((entry, index) => (
                <div key={index} className="text-center">
                  <div className="bg-gradient-to-b from-[#ffa4a4] to-[#ff6b6b] border-4 border-[#d32f2f] p-4 mb-2 hover:scale-110 pixel-button transition-transform">
                    <div className="text-4xl mb-2">{entry.mood}</div>
                  </div>
                  <p className="text-[#6d4c41]">{entry.date}</p>
                  <p className="text-[#3e2723]">{entry.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-[#c2dfb1] border-4 border-[#7ba05b] p-4">
              <p className="text-[#3e2723]">
                💡 Você tem se sentido bem na maior parte do tempo! Continue assim e não hesite em conversar com a gente se precisar.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Avatar Customizer Modal */}
      {showAvatarCustomizer && (
        <AvatarCustomizer
          currentAvatar={user.avatar}
          onSave={onUpdateAvatar}
          onClose={() => setShowAvatarCustomizer(false)}
        />
      )}
    </div>
  );
}
