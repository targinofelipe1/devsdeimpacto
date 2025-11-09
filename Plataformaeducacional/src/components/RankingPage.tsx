import { User } from '../App';
import { ArrowLeft, Trophy, Medal, Award } from 'lucide-react';

interface RankingPageProps {
  currentUser: User;
  onBack: () => void;
}

const rankingData = [
  { id: '1', nickname: 'HeroJoao', avatar: '🦊', level: 2, xp: 450, gems: 125, rank: 1 },
  { id: '2', nickname: 'StarMaria', avatar: '🐯', level: 3, xp: 780, gems: 200, rank: 2 },
  { id: '3', nickname: 'DragonPedro', avatar: '🦅', level: 4, xp: 1250, gems: 350, rank: 3 },
  { id: '4', nickname: 'PhoenixAna', avatar: '🦊', level: 2, xp: 420, gems: 110, rank: 4 },
  { id: '5', nickname: 'WolfLucas', avatar: '🐣', level: 1, xp: 380, gems: 95, rank: 5 },
  { id: '6', nickname: 'EagleCarla', avatar: '🦊', level: 2, xp: 360, gems: 90, rank: 6 },
  { id: '7', nickname: 'TigerBruno', avatar: '🐣', level: 1, xp: 340, gems: 85, rank: 7 },
  { id: '8', nickname: 'FoxJulia', avatar: '🐣', level: 1, xp: 320, gems: 80, rank: 8 }
];

const weeklyEvents = [
  { id: 1, name: 'Semana do Conhecimento', icon: '📚', reward: '50 Gemas', active: true },
  { id: 2, name: 'Desafio Matemático', icon: '🔢', reward: '30 Gemas', active: true },
  { id: 3, name: 'Torneio de Leitura', icon: '📖', reward: '40 Gemas', active: false }
];

export function RankingPage({ currentUser, onBack }: RankingPageProps) {
  const getMedalIcon = (rank: number) => {
    if (rank === 1) return { icon: Trophy, color: 'text-yellow-500' };
    if (rank === 2) return { icon: Medal, color: 'text-gray-400' };
    if (rank === 3) return { icon: Award, color: 'text-orange-600' };
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-400 to-orange-500 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-600 to-orange-600 border-b-4 border-yellow-800 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={onBack}
            className="bg-white hover:bg-gray-100 px-4 py-2 rounded-lg border-2 border-gray-300 flex items-center gap-2 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar</span>
          </button>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Trophy className="w-10 h-10 text-white" />
              <h1 className="text-white">Ranking Global</h1>
            </div>
            <p className="text-yellow-100">Veja sua posição e compete com outros heróis!</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Ranking */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border-4 border-gray-300 shadow-2xl p-6">
              <h2 className="mb-6">Classificação Geral</h2>

              {/* Top 3 Podium */}
              <div className="flex items-end justify-center gap-4 mb-8 h-64">
                {/* Second Place */}
                {rankingData[1] && (
                  <div className="flex flex-col items-center">
                    <div className="bg-gradient-to-b from-gray-300 to-gray-400 rounded-lg border-4 border-gray-500 p-4 mb-2 w-32">
                      <div className="text-5xl text-center mb-2">{rankingData[1].avatar}</div>
                      <p className="text-center text-white text-sm">{rankingData[1].nickname}</p>
                    </div>
                    <div className="bg-gradient-to-b from-gray-400 to-gray-500 rounded-t-lg border-4 border-gray-600 p-4 w-32 h-32 flex flex-col items-center justify-center">
                      <Medal className="w-12 h-12 text-gray-200 mb-2" />
                      <span className="text-white text-xl">2º</span>
                      <span className="text-gray-200 text-sm">{rankingData[1].xp} XP</span>
                    </div>
                  </div>
                )}

                {/* First Place */}
                {rankingData[0] && (
                  <div className="flex flex-col items-center">
                    <div className="bg-gradient-to-b from-yellow-300 to-yellow-400 rounded-lg border-4 border-yellow-600 p-4 mb-2 w-32 animate-bounce">
                      <div className="text-5xl text-center mb-2">{rankingData[0].avatar}</div>
                      <p className="text-center text-yellow-900 text-sm">{rankingData[0].nickname}</p>
                    </div>
                    <div className="bg-gradient-to-b from-yellow-400 to-yellow-500 rounded-t-lg border-4 border-yellow-700 p-4 w-32 h-40 flex flex-col items-center justify-center shadow-2xl">
                      <Trophy className="w-16 h-16 text-yellow-100 mb-2" />
                      <span className="text-white text-2xl">1º</span>
                      <span className="text-yellow-100 text-sm">{rankingData[0].xp} XP</span>
                    </div>
                  </div>
                )}

                {/* Third Place */}
                {rankingData[2] && (
                  <div className="flex flex-col items-center">
                    <div className="bg-gradient-to-b from-orange-300 to-orange-400 rounded-lg border-4 border-orange-600 p-4 mb-2 w-32">
                      <div className="text-5xl text-center mb-2">{rankingData[2].avatar}</div>
                      <p className="text-center text-white text-sm">{rankingData[2].nickname}</p>
                    </div>
                    <div className="bg-gradient-to-b from-orange-400 to-orange-500 rounded-t-lg border-4 border-orange-700 p-4 w-32 h-24 flex flex-col items-center justify-center">
                      <Award className="w-10 h-10 text-orange-100 mb-2" />
                      <span className="text-white text-xl">3º</span>
                      <span className="text-orange-100 text-sm">{rankingData[2].xp} XP</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Rest of Ranking */}
              <div className="space-y-3">
                {rankingData.slice(3).map((player) => {
                  const isCurrentUser = player.id === currentUser.id;
                  const medal = getMedalIcon(player.rank);

                  return (
                    <div
                      key={player.id}
                      className={`${isCurrentUser ? 'bg-gradient-to-r from-blue-100 to-purple-100 border-blue-400' : 'bg-gray-50 border-gray-300'} rounded-lg border-2 p-4 flex items-center justify-between`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 flex items-center justify-center ${medal ? medal.color : 'text-gray-600'}`}>
                          <span className="text-xl">{player.rank}º</span>
                        </div>
                        <div className="w-12 h-12 bg-white rounded-lg border-2 border-gray-300 flex items-center justify-center">
                          <span className="text-2xl">{player.avatar}</span>
                        </div>
                        <div>
                          <p className={isCurrentUser ? 'text-blue-600' : 'text-gray-900'}>
                            {player.nickname} {isCurrentUser && '(Você)'}
                          </p>
                          <p className="text-gray-600">Nível {player.level}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-900">{player.xp} XP</p>
                        <p className="text-yellow-600">{player.gems} 💎</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Events and Challenges */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg border-4 border-gray-300 shadow-2xl p-6">
              <h3 className="mb-4">Eventos Semanais</h3>
              <p className="text-gray-600 mb-6">
                Participe dos eventos e ganhe recompensas extras!
              </p>

              <div className="space-y-4">
                {weeklyEvents.map((event) => (
                  <div
                    key={event.id}
                    className={`${event.active ? 'bg-gradient-to-r from-green-100 to-green-200 border-green-400' : 'bg-gray-100 border-gray-300'} rounded-lg border-2 p-4`}
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <span className="text-3xl">{event.icon}</span>
                      <div className="flex-1">
                        <h4>{event.name}</h4>
                        <p className="text-gray-600">Recompensa: {event.reward}</p>
                      </div>
                    </div>
                    {event.active && (
                      <button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-2 rounded border-2 border-green-700 transition-all mt-2">
                        Participar
                      </button>
                    )}
                    {!event.active && (
                      <p className="text-gray-500 text-center mt-2">Em breve</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg border-4 border-gray-300 shadow-2xl p-6">
              <h3 className="mb-4">Sua Posição</h3>
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg border-2 border-blue-400 p-6 text-center">
                <div className="text-6xl mb-4">{currentUser.avatar}</div>
                <h3 className="mb-2">{currentUser.nickname}</h3>
                <div className="bg-white/50 rounded-lg p-3 mb-3">
                  <p className="text-gray-600">Posição no Ranking</p>
                  <p className="text-blue-600 text-2xl">1º lugar</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/50 rounded-lg p-3">
                    <p className="text-gray-600">XP Total</p>
                    <p className="text-purple-600">{currentUser.xp}</p>
                  </div>
                  <div className="bg-white/50 rounded-lg p-3">
                    <p className="text-gray-600">Gemas</p>
                    <p className="text-yellow-600">{currentUser.gems} 💎</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
