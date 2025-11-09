import { User } from '../App';
import { ArrowLeft, Sparkles, ShoppingBag, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { SensoryModeToggle } from './SensoryModeToggle';

interface BadgeShopProps {
  user: User;
  onBack: () => void;
  onPurchase: (badge: BadgeItem) => void;
}

export interface BadgeItem {
  id: string;
  name: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'brass';
  price: number;
  icon: string;
  color: string;
  borderColor: string;
  description: string;
}

const shopBadges: BadgeItem[] = [
  // Latão (100 gemas)
  { id: 'brass-explorer', name: 'Explorador de Latão', tier: 'brass', price: 100, icon: '🗺️', color: 'from-[#b08d57] to-[#9a7b4f]', borderColor: 'border-[#7d6841]', description: 'Para quem está começando a jornada' },
  { id: 'brass-reader', name: 'Leitor de Latão', tier: 'brass', price: 100, icon: '📖', color: 'from-[#b08d57] to-[#9a7b4f]', borderColor: 'border-[#7d6841]', description: 'Primeiros passos na leitura' },
  { id: 'brass-math', name: 'Matemático de Latão', tier: 'brass', price: 100, icon: '🔢', color: 'from-[#b08d57] to-[#9a7b4f]', borderColor: 'border-[#7d6841]', description: 'Iniciante em cálculos' },
  
  // Bronze (200 gemas)
  { id: 'bronze-warrior', name: 'Guerreiro de Bronze', tier: 'bronze', price: 200, icon: '⚔️', color: 'from-[#cd7f32] to-[#b87333]', borderColor: 'border-[#8b5a2b]', description: 'Venceu várias batalhas' },
  { id: 'bronze-scientist', name: 'Cientista de Bronze', tier: 'bronze', price: 200, icon: '🔬', color: 'from-[#cd7f32] to-[#b87333]', borderColor: 'border-[#8b5a2b]', description: 'Curioso sobre ciências' },
  { id: 'bronze-linguist', name: 'Linguista de Bronze', tier: 'bronze', price: 200, icon: '🌐', color: 'from-[#cd7f32] to-[#b87333]', borderColor: 'border-[#8b5a2b]', description: 'Aprendiz de idiomas' },
  
  // Prata (300 gemas)
  { id: 'silver-champion', name: 'Campeão de Prata', tier: 'silver', price: 300, icon: '🏆', color: 'from-[#c0c0c0] to-[#a8a8a8]', borderColor: 'border-[#808080]', description: 'Grande conquistador' },
  { id: 'silver-genius', name: 'Gênio de Prata', tier: 'silver', price: 300, icon: '🧠', color: 'from-[#c0c0c0] to-[#a8a8a8]', borderColor: 'border-[#808080]', description: 'Mente brilhante' },
  { id: 'silver-artist', name: 'Artista de Prata', tier: 'silver', price: 300, icon: '🎨', color: 'from-[#c0c0c0] to-[#a8a8a8]', borderColor: 'border-[#808080]', description: 'Criativo e talentoso' },
  
  // Ouro (400 gemas)
  { id: 'gold-master', name: 'Mestre de Ouro', tier: 'gold', price: 400, icon: '👑', color: 'from-[#ffd700] to-[#ffcc00]', borderColor: 'border-[#daa520]', description: 'Domínio completo' },
  { id: 'gold-legend', name: 'Lenda de Ouro', tier: 'gold', price: 400, icon: '⭐', color: 'from-[#ffd700] to-[#ffcc00]', borderColor: 'border-[#daa520]', description: 'Status lendário' },
  { id: 'gold-prodigy', name: 'Prodígio de Ouro', tier: 'gold', price: 400, icon: '💫', color: 'from-[#ffd700] to-[#ffcc00]', borderColor: 'border-[#daa520]', description: 'Talento excepcional' },
  
  // Platina (500 gemas)
  { id: 'platinum-supreme', name: 'Supremo de Platina', tier: 'platinum', price: 500, icon: '💎', color: 'from-[#e5e4e2] to-[#d3d3d3]', borderColor: 'border-[#b0b0b0]', description: 'Elite dos estudantes' },
  { id: 'platinum-transcendent', name: 'Transcendente de Platina', tier: 'platinum', price: 500, icon: '🌟', color: 'from-[#e5e4e2] to-[#d3d3d3]', borderColor: 'border-[#b0b0b0]', description: 'Além da excelência' },
  { id: 'platinum-immortal', name: 'Imortal de Platina', tier: 'platinum', price: 500, icon: '✨', color: 'from-[#e5e4e2] to-[#d3d3d3]', borderColor: 'border-[#b0b0b0]', description: 'Lenda eterna' },
];

export function BadgeShop({ user, onBack, onPurchase }: BadgeShopProps) {
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<BadgeItem | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const tiers = [
    { id: 'all', name: 'Todas', color: 'from-[#5a9e36] to-[#3d7025]', borderColor: 'border-[#2d5016]' },
    { id: 'brass', name: 'Latão (100💎)', color: 'from-[#b08d57] to-[#9a7b4f]', borderColor: 'border-[#7d6841]' },
    { id: 'bronze', name: 'Bronze (200💎)', color: 'from-[#cd7f32] to-[#b87333]', borderColor: 'border-[#8b5a2b]' },
    { id: 'silver', name: 'Prata (300💎)', color: 'from-[#c0c0c0] to-[#a8a8a8]', borderColor: 'border-[#808080]' },
    { id: 'gold', name: 'Ouro (400💎)', color: 'from-[#ffd700] to-[#ffcc00]', borderColor: 'border-[#daa520]' },
    { id: 'platinum', name: 'Platina (500💎)', color: 'from-[#e5e4e2] to-[#d3d3d3]', borderColor: 'border-[#b0b0b0]' }
  ];

  const filteredBadges = selectedTier === 'all' 
    ? shopBadges 
    : shopBadges.filter(b => b.tier === selectedTier);

  const handlePurchaseClick = (badge: BadgeItem) => {
    setSelectedBadge(badge);
    setShowConfirmModal(true);
  };

  const confirmPurchase = () => {
    if (!selectedBadge) return;

    if (user.gems >= selectedBadge.price) {
      onPurchase(selectedBadge);
      setNotification({ type: 'success', message: `${selectedBadge.name} adquirida com sucesso! 🎉` });
      setShowConfirmModal(false);
      
      setTimeout(() => setNotification(null), 3000);
    } else {
      setNotification({ type: 'error', message: 'Gemas insuficientes! Continue estudando para ganhar mais.' });
      setShowConfirmModal(false);
      
      setTimeout(() => setNotification(null), 3000);
    }
  };

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
      <div className="bg-gradient-to-r from-[#ffcc33] to-[#ff9933] border-b-4 border-[#d4a02c]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white border-4 border-[#3e2723] flex items-center justify-center pixel-shadow-lg">
                <ShoppingBag className="w-8 h-8 text-[#3e2723]" />
              </div>
              <div>
                <h2 className="text-white drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)]">Loja de Insígnias</h2>
                <p className="text-white/90">Troque suas gemas por badges exclusivas!</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <SensoryModeToggle />
              <div className="bg-white px-6 py-3 border-4 border-[#3e2723] flex items-center gap-2 pixel-shadow-sm">
                <Sparkles className="w-6 h-6 text-[#ffcc33]" />
                <span className="text-[#3e2723]">{user.gems} Gemas</span>
              </div>
              <button
                onClick={onBack}
                className="bg-white hover:bg-gray-200 px-4 py-2 border-4 border-[#3e2723] pixel-button transition-all flex items-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Voltar</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Notification */}
        {notification && (
          <div className={`mb-6 p-4 border-4 pixel-shadow-lg ${
            notification.type === 'success' 
              ? 'bg-[#c2dfb1] border-[#7ba05b]' 
              : 'bg-[#ffb3b3] border-[#d32f2f]'
          }`}>
            <div className="flex items-center gap-3">
              {notification.type === 'success' ? (
                <CheckCircle className="w-6 h-6 text-[#3d7025]" />
              ) : (
                <AlertCircle className="w-6 h-6 text-[#d32f2f]" />
              )}
              <p className="text-[#3e2723]">{notification.message}</p>
            </div>
          </div>
        )}

        {/* Tier Filters */}
        <div className="bg-[#f5f1e3] border-4 border-[#3e2723] p-6 mb-6 pixel-shadow-lg">
          <h3 className="mb-4 text-[#3e2723]">Filtrar por Categoria</h3>
          <div className="grid grid-cols-6 gap-3">
            {tiers.map((tier) => (
              <button
                key={tier.id}
                onClick={() => setSelectedTier(tier.id)}
                className={`p-3 border-4 pixel-button transition-all ${
                  selectedTier === tier.id
                    ? `bg-gradient-to-b ${tier.color} ${tier.borderColor} scale-105`
                    : 'bg-white border-[#3e2723] hover:scale-105'
                }`}
              >
                <span className={selectedTier === tier.id ? 'text-white drop-shadow-[1px_1px_0_rgba(0,0,0,0.5)]' : 'text-[#3e2723]'}>
                  {tier.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Badge Grid */}
        <div className="grid grid-cols-3 gap-6">
          {filteredBadges.map((badge) => {
            const canAfford = user.gems >= badge.price;
            const isOwned = user.badges?.includes(badge.id);
            
            return (
              <div
                key={badge.id}
                className={`bg-[#f5f1e3] border-4 border-[#3e2723] p-6 pixel-shadow-lg ${
                  isOwned ? 'opacity-50' : ''
                }`}
              >
                <div className={`bg-gradient-to-b ${badge.color} ${badge.borderColor} border-4 p-6 mb-4 text-center`}>
                  <div className="text-6xl mb-2">{badge.icon}</div>
                  <h3 className="text-white drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)]">{badge.name}</h3>
                </div>
                
                <p className="text-[#6d4c41] mb-4 text-center">{badge.description}</p>
                
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-[#ffcc33]" />
                  <span className="text-[#3e2723]">{badge.price} Gemas</span>
                </div>
                
                <button
                  onClick={() => handlePurchaseClick(badge)}
                  disabled={!canAfford || isOwned}
                  className={`w-full py-3 border-4 pixel-button transition-all ${
                    isOwned
                      ? 'bg-[#7a7a7a] border-[#5a5a5a] text-white cursor-not-allowed'
                      : canAfford
                      ? 'bg-gradient-to-b from-[#5a9e36] to-[#3d7025] border-[#2d5016] text-white hover:scale-105'
                      : 'bg-[#d32f2f] border-[#8b0000] text-white cursor-not-allowed opacity-70'
                  }`}
                >
                  {isOwned ? '✓ Adquirida' : canAfford ? 'Comprar' : 'Gemas Insuficientes'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && selectedBadge && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#f5f1e3] border-4 border-[#3e2723] p-8 max-w-md w-full pixel-shadow-lg">
            <h2 className="text-[#3e2723] mb-4">Confirmar Compra</h2>
            
            <div className={`bg-gradient-to-b ${selectedBadge.color} ${selectedBadge.borderColor} border-4 p-6 mb-4 text-center`}>
              <div className="text-7xl mb-2">{selectedBadge.icon}</div>
              <h3 className="text-white drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)]">{selectedBadge.name}</h3>
            </div>
            
            <p className="text-[#6d4c41] mb-4 text-center">{selectedBadge.description}</p>
            
            <div className="bg-white border-4 border-[#3e2723] p-4 mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-[#6d4c41]">Preço:</span>
                <span className="text-[#3e2723] flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-[#ffcc33]" />
                  {selectedBadge.price} Gemas
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-[#6d4c41]">Você tem:</span>
                <span className="text-[#3e2723] flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-[#ffcc33]" />
                  {user.gems} Gemas
                </span>
              </div>
              <div className="border-t-2 border-[#3e2723] pt-2 mt-2">
                <div className="flex justify-between">
                  <span className="text-[#6d4c41]">Após compra:</span>
                  <span className="text-[#3e2723] flex items-center gap-1">
                    <Sparkles className="w-4 h-4 text-[#ffcc33]" />
                    {user.gems - selectedBadge.price} Gemas
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 bg-white hover:bg-gray-200 py-3 border-4 border-[#3e2723] pixel-button transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={confirmPurchase}
                className="flex-1 bg-gradient-to-b from-[#5a9e36] to-[#3d7025] hover:brightness-110 text-white py-3 border-4 border-[#2d5016] pixel-button transition-all"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

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
