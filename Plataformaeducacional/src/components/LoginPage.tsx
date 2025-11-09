import { useState } from 'react';
import { UserRole } from '../App';
import { LogIn, Mail, Lock, BookOpen } from 'lucide-react';
import { SensoryModeToggle } from './SensoryModeToggle';

interface LoginPageProps {
  onLogin: (email: string, password: string) => void;
}

const demoAccounts = [
  { email: 'aluno@demo.com', password: 'aluno123', role: 'student' as UserRole, icon: '🎒' },
  { email: 'professor@demo.com', password: 'prof123', role: 'teacher' as UserRole, icon: '📚' },
  { email: 'coordenacao@demo.com', password: 'coord123', role: 'coordination' as UserRole, icon: '🏛️' }
];

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showDemo, setShowDemo] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    onLogin(email, password);
  };

  const handleDemoLogin = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    onLogin(demoEmail, demoPassword);
  };

  return (
    <div className="min-h-screen bg-[#8bd3dd] relative overflow-hidden flex items-center justify-center p-4">
      {/* Pixel Art Sky Background */}
      <div className="absolute inset-0">
        {/* Clouds */}
        <div className="absolute top-10 left-20 w-32 h-16 bg-white/80 float-animation" 
          style={{ 
            clipPath: 'polygon(10% 50%, 20% 40%, 30% 50%, 40% 40%, 50% 50%, 60% 40%, 70% 50%, 80% 40%, 90% 50%, 90% 100%, 10% 100%)',
            animationDelay: '0s'
          }}>
        </div>
        <div className="absolute top-32 right-32 w-40 h-20 bg-white/70 float-animation"
          style={{ 
            clipPath: 'polygon(10% 50%, 20% 40%, 30% 50%, 40% 40%, 50% 50%, 60% 40%, 70% 50%, 80% 40%, 90% 50%, 90% 100%, 10% 100%)',
            animationDelay: '1s'
          }}>
        </div>
        <div className="absolute top-64 left-1/3 w-28 h-14 bg-white/60 float-animation"
          style={{ 
            clipPath: 'polygon(10% 50%, 20% 40%, 30% 50%, 40% 40%, 50% 50%, 60% 40%, 70% 50%, 80% 40%, 90% 50%, 90% 100%, 10% 100%)',
            animationDelay: '2s'
          }}>
        </div>

        {/* Sun */}
        <div className="absolute top-16 right-16 w-20 h-20 bg-[#ffcc33] border-4 border-[#d4a02c] sparkle-animation"></div>
      </div>

      {/* Sensory Mode Toggle */}
      <div className="absolute top-4 right-4 z-20">
        <SensoryModeToggle />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header Pixel Art Style */}
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-b from-[#ffcc33] to-[#ff9933] p-6 border-4 border-[#d4a02c] mb-4 pixel-shadow-lg">
            <div className="flex items-center gap-3 justify-center mb-2">
              <div className="w-12 h-12 bg-[#5a9e36] border-4 border-[#3d7025] flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-white drop-shadow-[3px_3px_0_rgba(0,0,0,0.5)]">Quest do Saber</h1>
            </div>
            <div className="bg-white/30 px-4 py-1 border-2 border-[#d4a02c]">
              <p className="text-[#3e2723]">Plataforma Gamificada de Aprendizagem</p>
            </div>
          </div>
        </div>

        {/* Login Card - Pixel Art Style */}
        <div className="bg-[#f5f1e3] border-4 border-[#3e2723] p-8 pixel-shadow-lg">
          <h2 className="text-center mb-6 text-[#3e2723]">Entrar na Plataforma</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2 text-[#3e2723]">E-mail</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#8bd3dd] border-2 border-[#3da5c2] flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#3e2723]" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-14 pr-4 py-3 border-4 border-[#3e2723] bg-white focus:outline-none focus:border-[#5a9e36] text-[#3e2723]"
                  placeholder="seu.email@exemplo.com"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-[#3e2723]">Senha</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#8bd3dd] border-2 border-[#3da5c2] flex items-center justify-center">
                  <Lock className="w-5 h-5 text-[#3e2723]" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-14 pr-4 py-3 border-4 border-[#3e2723] bg-white focus:outline-none focus:border-[#5a9e36] text-[#3e2723]"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="bg-[#ff6b6b] border-4 border-[#d32f2f] p-3">
                <p className="text-white">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-b from-[#5a9e36] to-[#3d7025] hover:from-[#4a8e26] hover:to-[#2d6015] text-white py-3 border-4 border-[#2d5016] pixel-button transition-all flex items-center justify-center gap-2"
            >
              <LogIn className="w-5 h-5" />
              Entrar
            </button>
          </form>

          <div className="mt-6">
            <button
              onClick={() => setShowDemo(!showDemo)}
              className="w-full text-[#3da5c2] hover:text-[#2d8aa2] py-2 transition-colors border-2 border-transparent hover:border-[#3da5c2]"
            >
              {showDemo ? '▼ Ocultar' : '▶ Ver'} Contas de Demonstração
            </button>

            {showDemo && (
              <div className="mt-4 space-y-2">
                <div className="bg-white border-4 border-[#3e2723] p-4">
                  <h4 className="mb-3 text-[#3e2723]">Contas Demo:</h4>
                  {demoAccounts.map((account) => (
                    <button
                      key={account.email}
                      onClick={() => handleDemoLogin(account.email, account.password)}
                      className="w-full text-left bg-[#e0d5c7] hover:bg-[#c2b5a7] border-4 border-[#6d4c41] p-3 mb-2 pixel-button transition-all"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{account.icon}</span>
                        <div>
                          <p className="text-[#3e2723]">{account.email}</p>
                          <p className="text-[#6d4c41]">Senha: {account.password}</p>
                        </div>
                      </div>
                      <div className="bg-[#5a9e36] px-2 py-1 inline-block border-2 border-[#3d7025]">
                        <p className="text-white text-sm">
                          {account.role === 'student' && '🎒 Aluno'}
                          {account.role === 'teacher' && '📚 Professor'}
                          {account.role === 'coordination' && '🏛️ Coordenação'}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-6 text-center bg-white/80 border-4 border-white/40 p-4">
          <p className="text-[#3e2723]">
            ✨ Plataforma educacional desenvolvida para estudantes com TDAH
          </p>
        </div>
      </div>

      {/* Pixel grass at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-[#5a9e36] to-[#3d7025] border-t-4 border-[#2d5016]">
        {/* Grass blades decoration */}
        <div className="absolute top-0 left-0 right-0 h-2 flex">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="flex-1 bg-[#3d7025]"
              style={{
                height: `${Math.random() * 8 + 4}px`,
                marginTop: `-${Math.random() * 4}px`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
