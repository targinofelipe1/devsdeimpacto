import { X, Check } from 'lucide-react';
import { useState } from 'react';

interface AvatarCustomizerProps {
  currentAvatar: string;
  onSave: (avatar: string) => void;
  onClose: () => void;
}

const pixelAvatars = [
  { id: '🦊', name: 'Raposa', color: 'from-orange-400 to-orange-600' },
  { id: '🐯', name: 'Tigre', color: 'from-yellow-500 to-orange-600' },
  { id: '🦅', name: 'Águia', color: 'from-blue-400 to-indigo-600' },
  { id: '🐣', name: 'Coruja', color: 'from-yellow-300 to-yellow-500' },
  { id: '🐺', name: 'Lobo', color: 'from-gray-500 to-gray-700' },
  { id: '🦁', name: 'Leão', color: 'from-yellow-600 to-orange-700' },
  { id: '🐻', name: 'Urso', color: 'from-amber-700 to-amber-900' },
  { id: '🐉', name: 'Dragão', color: 'from-red-500 to-purple-600' },
  { id: '🦋', name: 'Borboleta', color: 'from-pink-400 to-purple-500' },
  { id: '🐢', name: 'Tartaruga', color: 'from-green-500 to-emerald-700' },
  { id: '🦌', name: 'Cervo', color: 'from-amber-600 to-brown-700' },
  { id: '🦚', name: 'Pavão', color: 'from-blue-400 to-green-500' }
];

export function AvatarCustomizer({ currentAvatar, onSave, onClose }: AvatarCustomizerProps) {
  const [selectedAvatar, setSelectedAvatar] = useState(currentAvatar);

  const handleSave = () => {
    onSave(selectedAvatar);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-[#f5f1e3] w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col border-4 border-[#3e2723]">
        {/* Header com estilo pixel art */}
        <div className="bg-gradient-to-r from-[#5a9e36] to-[#3d7025] border-b-4 border-[#2d5016] p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#ffcc33] border-4 border-[#d4a02c] flex items-center justify-center">
              <span className="text-2xl">{selectedAvatar}</span>
            </div>
            <h2 className="text-white drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)]">Personalize seu Avatar</h2>
          </div>
          <button
            onClick={onClose}
            className="bg-white hover:bg-gray-200 px-3 py-3 border-4 border-gray-400 pixel-button transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Preview Grande */}
          <div className="bg-white border-4 border-[#3e2723] p-8 mb-6 text-center">
            <p className="mb-4 text-[#3e2723]">Seu Avatar Selecionado:</p>
            <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-[#8bd3dd] to-[#5fcde4] border-4 border-[#3da5c2] mb-4">
              <span className="text-7xl">{selectedAvatar}</span>
            </div>
            <p className="text-[#6d4c41]">
              {pixelAvatars.find(a => a.id === selectedAvatar)?.name || 'Avatar'}
            </p>
          </div>

          {/* Grid de Avatares */}
          <div className="bg-white border-4 border-[#3e2723] p-6">
            <h3 className="mb-4 text-[#3e2723]">Escolha seu Personagem:</h3>
            <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
              {pixelAvatars.map((avatar) => (
                <button
                  key={avatar.id}
                  onClick={() => setSelectedAvatar(avatar.id)}
                  className={`
                    relative aspect-square p-4 border-4 pixel-button
                    ${selectedAvatar === avatar.id 
                      ? 'bg-gradient-to-br ' + avatar.color + ' border-[#2d5016]' 
                      : 'bg-[#e0d5c7] border-[#6d4c41] hover:border-[#3e2723]'
                    }
                    transition-all
                  `}
                >
                  <span className="text-4xl block">{avatar.id}</span>
                  {selectedAvatar === avatar.id && (
                    <div className="absolute -top-2 -right-2 bg-[#ffcc33] border-2 border-[#d4a02c] w-8 h-8 flex items-center justify-center">
                      <Check className="w-5 h-5 text-[#3e2723]" />
                    </div>
                  )}
                  <p className="text-xs mt-1 text-[#3e2723]">{avatar.name}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-6 bg-[#ffcc33] border-4 border-[#d4a02c] p-4">
            <p className="text-[#3e2723] flex items-start gap-2">
              <span className="text-xl">💡</span>
              <span>
                Escolha um avatar que represente você na sua jornada de aprendizado! 
                Você pode mudar sempre que quiser no seu perfil.
              </span>
            </p>
          </div>
        </div>

        {/* Footer com Botões */}
        <div className="border-t-4 border-[#3e2723] p-6 bg-[#e0d5c7] flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 bg-[#7a7a7a] hover:bg-[#666666] text-white py-4 border-4 border-[#5a5a5a] pixel-button transition-all"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="flex-1 bg-gradient-to-r from-[#5a9e36] to-[#3d7025] hover:from-[#4a8e26] hover:to-[#2d6015] text-white py-4 border-4 border-[#2d5016] pixel-button transition-all flex items-center justify-center gap-2"
          >
            <Check className="w-5 h-5" />
            Salvar Avatar
          </button>
        </div>
      </div>
    </div>
  );
}
