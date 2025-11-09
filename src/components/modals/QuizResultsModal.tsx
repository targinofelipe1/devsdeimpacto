import { X, TrendingUp, Clock, Target, Users } from 'lucide-react';

interface QuizResultsModalProps {
  quiz: {
    id: number;
    title: string;
    subject: string;
    questions: number;
  };
  onClose: () => void;
}

const studentResults = [
  { id: 1, name: 'João Silva', avatar: '🦊', score: 8, time: '5:30', attempts: 1, status: 'excellent' },
  { id: 2, name: 'Maria Santos', avatar: '🐯', score: 10, time: '4:20', attempts: 1, status: 'excellent' },
  { id: 3, name: 'Pedro Lima', avatar: '🦅', score: 9, time: '6:15', attempts: 2, status: 'excellent' },
  { id: 4, name: 'Ana Costa', avatar: '🦊', score: 7, time: '7:40', attempts: 1, status: 'good' },
  { id: 5, name: 'Lucas Oliveira', avatar: '🐣', score: 5, time: '8:20', attempts: 3, status: 'alert' }
];

const questionStats = [
  { question: 'Questão 1', correctRate: 85, avgTime: '45s', difficulty: 'Fácil' },
  { question: 'Questão 2', correctRate: 72, avgTime: '1:10', difficulty: 'Médio' },
  { question: 'Questão 3', correctRate: 65, avgTime: '1:30', difficulty: 'Médio' },
  { question: 'Questão 4', correctRate: 45, avgTime: '2:05', difficulty: 'Difícil' },
  { question: 'Questão 5', correctRate: 90, avgTime: '50s', difficulty: 'Fácil' }
];

export function QuizResultsModal({ quiz, onClose }: QuizResultsModalProps) {
  const avgScore = (studentResults.reduce((sum, s) => sum + s.score, 0) / studentResults.length).toFixed(1);
  const avgTime = '6:25';
  const completionRate = 100;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg border-4 border-gray-300 shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 border-b-4 border-purple-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-white mb-1">Resultados do Quiz</h2>
              <p className="text-purple-100">{quiz.title} - {quiz.subject}</p>
            </div>
            <button
              onClick={onClose}
              className="bg-white hover:bg-gray-100 p-2 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-white" />
                <span className="text-white">Alunos</span>
              </div>
              <p className="text-white text-2xl">{studentResults.length}</p>
            </div>

            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-white" />
                <span className="text-white">Média</span>
              </div>
              <p className="text-white text-2xl">{avgScore}</p>
            </div>

            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-white" />
                <span className="text-white">Tempo Médio</span>
              </div>
              <p className="text-white text-2xl">{avgTime}</p>
            </div>

            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-white" />
                <span className="text-white">Taxa de Conclusão</span>
              </div>
              <p className="text-white text-2xl">{completionRate}%</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Student Performance */}
            <div>
              <h3 className="mb-4">Desempenho dos Alunos</h3>
              <div className="space-y-3">
                {studentResults.map((student) => {
                  const scorePercentage = (student.score / quiz.questions) * 100;
                  let bgColor = 'bg-green-50 border-green-300';
                  if (scorePercentage < 60) bgColor = 'bg-red-50 border-red-300';
                  else if (scorePercentage < 80) bgColor = 'bg-yellow-50 border-yellow-300';

                  return (
                    <div key={student.id} className={`${bgColor} rounded-lg border-2 p-4`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white rounded-lg border-2 border-gray-300 flex items-center justify-center">
                            <span className="text-xl">{student.avatar}</span>
                          </div>
                          <div>
                            <h4>{student.name}</h4>
                            <p className="text-gray-600">Tentativas: {student.attempts}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-2xl ${scorePercentage >= 70 ? 'text-green-600' : 'text-red-600'}`}>
                            {student.score}/{quiz.questions}
                          </p>
                          <p className="text-gray-600">{scorePercentage.toFixed(0)}%</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-gray-600">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {student.time}
                        </span>
                        <span className={`px-3 py-1 rounded ${
                          scorePercentage >= 80 ? 'bg-green-200 text-green-800' :
                          scorePercentage >= 60 ? 'bg-yellow-200 text-yellow-800' :
                          'bg-red-200 text-red-800'
                        }`}>
                          {scorePercentage >= 80 ? 'Excelente' :
                           scorePercentage >= 60 ? 'Bom' : 'Precisa Melhorar'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Question Statistics */}
            <div>
              <h3 className="mb-4">Estatísticas por Questão</h3>
              <div className="space-y-4">
                {questionStats.map((stat, index) => (
                  <div key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-blue-300 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4>{stat.question}</h4>
                      <span className={`px-3 py-1 rounded text-sm ${
                        stat.difficulty === 'Fácil' ? 'bg-green-200 text-green-800' :
                        stat.difficulty === 'Médio' ? 'bg-yellow-200 text-yellow-800' :
                        'bg-red-200 text-red-800'
                      }`}>
                        {stat.difficulty}
                      </span>
                    </div>

                    <div className="mb-3">
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">Taxa de Acerto</span>
                        <span className={stat.correctRate >= 70 ? 'text-green-600' : stat.correctRate >= 50 ? 'text-yellow-600' : 'text-red-600'}>
                          {stat.correctRate}%
                        </span>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${stat.correctRate >= 70 ? 'bg-green-500' : stat.correctRate >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${stat.correctRate}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>Tempo médio: {stat.avgTime}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* AI Insights */}
              <div className="mt-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg border-2 border-purple-300 p-4">
                <h4 className="mb-3">💡 Insights da IA</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• A Questão 4 teve baixa taxa de acerto (45%). Considere revisar esse conteúdo em sala.</li>
                  <li>• {studentResults.filter(s => (s.score / quiz.questions) >= 0.8).length} alunos apresentaram excelente desempenho.</li>
                  <li>• Lucas Oliveira precisou de 3 tentativas. Recomenda-se acompanhamento individualizado.</li>
                  <li>• O tempo médio de resposta está dentro do esperado para este nível de dificuldade.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t-4 border-gray-300 p-6 bg-gray-50 flex gap-4">
          <button
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg border-2 border-blue-700 transition-all"
          >
            Exportar Relatório PDF
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 hover:bg-gray-300 py-3 rounded-lg border-2 border-gray-400 transition-all"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
