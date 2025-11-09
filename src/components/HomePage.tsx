import { UserRole } from '../App';
import { BookOpen, Users, GraduationCap } from 'lucide-react';

interface HomePageProps {
  onLogin: (role: UserRole) => void;
}

export function HomePage({ onLogin }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 to-sky-600 relative overflow-hidden">
      {/* Pixel clouds */}
      <div className="absolute top-10 left-20 w-24 h-12 bg-white opacity-80" style={{ clipPath: 'polygon(0% 50%, 10% 40%, 20% 50%, 30% 40%, 40% 50%, 50% 40%, 60% 50%, 70% 40%, 80% 50%, 90% 40%, 100% 50%, 100% 100%, 0% 100%)' }}></div>
      <div className="absolute top-32 right-32 w-32 h-16 bg-white opacity-70" style={{ clipPath: 'polygon(0% 50%, 10% 40%, 20% 50%, 30% 40%, 40% 50%, 50% 40%, 60% 50%, 70% 40%, 80% 50%, 90% 40%, 100% 50%, 100% 100%, 0% 100%)' }}></div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-400 p-6 rounded-lg shadow-2xl border-4 border-yellow-600 mb-6">
            <h1 className="text-white drop-shadow-lg mb-2">🎮 Quest do Saber</h1>
            <p className="text-yellow-100">Plataforma Gamificada de Aprendizagem Adaptativa</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Student Card */}
          <button
            onClick={() => onLogin('student')}
            className="bg-gradient-to-b from-green-400 to-green-600 p-8 rounded-lg border-4 border-green-700 hover:scale-105 transition-transform shadow-2xl group"
          >
            <div className="bg-white w-20 h-20 mx-auto rounded-lg flex items-center justify-center mb-4 border-4 border-green-700 group-hover:animate-bounce">
              <BookOpen className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-white mb-2">Aluno</h3>
            <p className="text-green-100">Embarque na sua jornada de aprendizado!</p>
            <div className="mt-4 bg-yellow-400 text-green-900 px-4 py-2 rounded border-2 border-yellow-600 inline-block">
              Entrar →
            </div>
          </button>

          {/* Teacher Card */}
          <button
            onClick={() => onLogin('teacher')}
            className="bg-gradient-to-b from-blue-400 to-blue-600 p-8 rounded-lg border-4 border-blue-700 hover:scale-105 transition-transform shadow-2xl group"
          >
            <div className="bg-white w-20 h-20 mx-auto rounded-lg flex items-center justify-center mb-4 border-4 border-blue-700 group-hover:animate-bounce">
              <GraduationCap className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-white mb-2">Professor</h3>
            <p className="text-blue-100">Gerencie e acompanhe seus alunos</p>
            <div className="mt-4 bg-yellow-400 text-blue-900 px-4 py-2 rounded border-2 border-yellow-600 inline-block">
              Entrar →
            </div>
          </button>

          {/* Coordination Card */}
          <button
            onClick={() => onLogin('coordination')}
            className="bg-gradient-to-b from-purple-400 to-purple-600 p-8 rounded-lg border-4 border-purple-700 hover:scale-105 transition-transform shadow-2xl group"
          >
            <div className="bg-white w-20 h-20 mx-auto rounded-lg flex items-center justify-center mb-4 border-4 border-purple-700 group-hover:animate-bounce">
              <Users className="w-12 h-12 text-purple-600" />
            </div>
            <h3 className="text-white mb-2">Coordenação</h3>
            <p className="text-purple-100">Monitore o desempenho institucional</p>
            <div className="mt-4 bg-yellow-400 text-purple-900 px-4 py-2 rounded border-2 border-yellow-600 inline-block">
              Entrar →
            </div>
          </button>
        </div>

        {/* Footer Info */}
        <div className="mt-16 text-center bg-white/20 backdrop-blur-sm rounded-lg p-6 max-w-3xl mx-auto border-2 border-white/40">
          <p className="text-white mb-2">
            ✨ Uma plataforma educacional desenvolvida especialmente para estudantes com TDAH
          </p>
          <p className="text-sky-100">
            Gamificação • Adaptação por IA • Suporte Emocional • Acompanhamento Pedagógico
          </p>
        </div>
      </div>

      {/* Pixel grass at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-green-600 to-green-700 border-t-4 border-green-800"></div>
    </div>
  );
}
