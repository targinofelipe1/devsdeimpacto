import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function SensoryModeToggle() {
  const [sensoryMode, setSensoryMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('sensoryMode');
    if (saved === 'true') {
      setSensoryMode(true);
      document.documentElement.classList.add('sensory-mode');
    }
  }, []);

  const toggleMode = () => {
    const newMode = !sensoryMode;
    setSensoryMode(newMode);
    
    if (newMode) {
      document.documentElement.classList.add('sensory-mode');
      localStorage.setItem('sensoryMode', 'true');
    } else {
      document.documentElement.classList.remove('sensory-mode');
      localStorage.setItem('sensoryMode', 'false');
    }
  };

  return (
    <button
      onClick={toggleMode}
      className={`
        px-4 py-2 border-4 pixel-button transition-all flex items-center gap-2
        ${sensoryMode 
          ? 'bg-[#c2dfb1] border-[#7ba05b] text-[#3e2723]' 
          : 'bg-[#8bd3dd] border-[#3da5c2] text-[#3e2723]'
        }
      `}
      title={sensoryMode ? 'Modo Calmo Ativo' : 'Ativar Modo Calmo'}
    >
      {sensoryMode ? (
        <>
          <Moon className="w-5 h-5" />
          <span className="hidden sm:inline">Modo Calmo</span>
        </>
      ) : (
        <>
          <Sun className="w-5 h-5" />
          <span className="hidden sm:inline">Modo Normal</span>
        </>
      )}
    </button>
  );
}
