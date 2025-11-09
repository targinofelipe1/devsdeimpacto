import { X, Calendar, User, BarChart3, Clock, Award } from 'lucide-react';

interface DetailsModalProps {
  type: 'quiz' | 'student' | 'class';
  data: any;
  onClose: () => void;
}

export function DetailsModal({ type, data, onClose }: DetailsModalProps) {
  if (type === 'quiz') {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg border-4 border-gray-300 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 border-b-4 border-blue-700 p-6 flex items-center justify-between">
            <h2 className="text-white">Detalhes do Quiz</h2>
            <button
              onClick={onClose}
              className="bg-white hover:bg-gray-100 p-2 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              <div>
                <h3 className="mb-4">{data.title}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg border-2 border-gray-300 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart3 className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-600">Disciplina</span>
                    </div>
                    <p>{data.subject}</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg border-2 border-gray-300 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-5 h-5 text-purple-600" />
                      <span className="text-gray-600">Dificuldade</span>
                    </div>
                    <p>{data.difficulty || 'Médio'}</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg border-2 border-gray-300 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-5 h-5 text-green-600" />
                      <span className="text-gray-600">Data de Criação</span>
                    </div>
                    <p>05/11/2025</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg border-2 border-gray-300 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-5 h-5 text-orange-600" />
                      <span className="text-gray-600">Autor</span>
                    </div>
                    <p>Prof. Maria Santos</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-blue-300 p-4">
                <h4 className="mb-3">Informações Adicionais</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total de Questões:</span>
                    <span>{data.questions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Conclusões:</span>
                    <span>{data.completions} alunos</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Média de Acertos:</span>
                    <span className="text-green-600">{data.avgScore}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="text-green-600">✓ Ativo</span>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-lg border-2 border-yellow-300 p-4">
                <h4 className="mb-3">💡 Recomendações da IA</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Este quiz está performando bem com média de {data.avgScore}</li>
                  <li>• Considere aumentar a dificuldade para alunos avançados</li>
                  <li>• Taxa de conclusão está acima da média da plataforma</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t-4 border-gray-300 p-6 bg-gray-50">
            <button
              onClick={onClose}
              className="w-full bg-gray-200 hover:bg-gray-300 py-3 rounded-lg border-2 border-gray-400 transition-all"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'student') {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg border-4 border-gray-300 shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
          <div className="bg-gradient-to-r from-green-500 to-teal-500 border-b-4 border-green-700 p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-lg border-4 border-green-700 flex items-center justify-center">
                <span className="text-3xl">{data.avatar}</span>
              </div>
              <div>
                <h2 className="text-white">{data.name}</h2>
                <p className="text-green-100">@{data.nickname} • Nível {data.level}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="bg-white hover:bg-gray-100 p-2 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg border-2 border-blue-300 p-4 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-600">Média Geral</span>
                  </div>
                  <p className="text-3xl text-blue-600">{data.grade}</p>
                </div>

                <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg border-2 border-purple-300 p-4 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Award className="w-5 h-5 text-purple-600" />
                    <span className="text-gray-600">Nível</span>
                  </div>
                  <p className="text-3xl text-purple-600">{data.level}</p>
                </div>

                <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-lg border-2 border-green-300 p-4 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-green-600" />
                    <span className="text-gray-600">Frequência</span>
                  </div>
                  <p className="text-3xl text-green-600">92%</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg border-2 border-gray-300 p-4">
                <h4 className="mb-4">Desempenho por Disciplina</h4>
                <div className="space-y-3">
                  {[
                    { subject: 'Matemática', grade: 8.5, color: 'bg-blue-500' },
                    { subject: 'Português', grade: 8.0, color: 'bg-green-500' },
                    { subject: 'Ciências', grade: 9.0, color: 'bg-purple-500' },
                    { subject: 'História', grade: 7.5, color: 'bg-yellow-500' }
                  ].map((item) => (
                    <div key={item.subject}>
                      <div className="flex justify-between mb-1">
                        <span>{item.subject}</span>
                        <span className="text-gray-600">{item.grade}</span>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${item.color}`}
                          style={{ width: `${(item.grade / 10) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg border-2 border-pink-300 p-4">
                <h4 className="mb-3">Estado Emocional Recente</h4>
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-5xl">😊</span>
                  <div>
                    <p>Feliz</p>
                    <p className="text-gray-600">Última atualização: há 2 horas</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  O aluno tem se mostrado engajado e motivado nas últimas semanas.
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg border-2 border-blue-300 p-4">
                <h4 className="mb-3">💡 Insights da IA</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Excelente desempenho em Ciências - considere desafios avançados</li>
                  <li>• História apresentou leve queda - acompanhar próximas atividades</li>
                  <li>• Engajamento acima da média - continuar com estímulos gamificados</li>
                  <li>• Última atividade: há {data.lastActivity}</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t-4 border-gray-300 p-6 bg-gray-50">
            <button
              onClick={onClose}
              className="w-full bg-gray-200 hover:bg-gray-300 py-3 rounded-lg border-2 border-gray-400 transition-all"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Class details
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg border-4 border-gray-300 shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 border-b-4 border-purple-700 p-6 flex items-center justify-between">
          <h2 className="text-white">{data.name}</h2>
          <button
            onClick={onClose}
            className="bg-white hover:bg-gray-100 p-2 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-blue-50 rounded-lg border-2 border-blue-300 p-4 text-center">
                <p className="text-gray-600 mb-2">Alunos</p>
                <p className="text-3xl text-blue-600">{data.students}</p>
              </div>
              <div className="bg-green-50 rounded-lg border-2 border-green-300 p-4 text-center">
                <p className="text-gray-600 mb-2">Média</p>
                <p className="text-3xl text-green-600">{data.avgGrade}</p>
              </div>
              <div className="bg-orange-50 rounded-lg border-2 border-orange-300 p-4 text-center">
                <p className="text-gray-600 mb-2">Alertas</p>
                <p className="text-3xl text-orange-600">{data.alerts}</p>
              </div>
              <div className="bg-purple-50 rounded-lg border-2 border-purple-300 p-4 text-center">
                <p className="text-gray-600 mb-2">Engajamento</p>
                <p className="text-3xl text-purple-600">{data.engagement}%</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg border-2 border-gray-300 p-4">
              <h4 className="mb-4">Desempenho por Disciplina</h4>
              <div className="space-y-3">
                {[
                  { subject: 'Matemática', avg: 7.8, students: data.students },
                  { subject: 'Português', avg: 8.3, students: data.students },
                  { subject: 'Ciências', avg: 8.5, students: data.students },
                  { subject: 'História', avg: 8.0, students: data.students }
                ].map((item) => (
                  <div key={item.subject} className="flex items-center gap-4">
                    <div className="w-32">
                      <p>{item.subject}</p>
                    </div>
                    <div className="flex-1">
                      <div className="h-6 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                          style={{ width: `${(item.avg / 10) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="w-16 text-right">
                      <p>{item.avg}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border-2 border-yellow-300 p-4">
              <h4 className="mb-3">💡 Análise da IA</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Turma com desempenho acima da média institucional</li>
                <li>• {data.alerts} alunos requerem atenção especial</li>
                <li>• Taxa de engajamento de {data.engagement}% é considerada excelente</li>
                <li>• Sugestão: manter estratégias atuais e monitorar alertas ativos</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t-4 border-gray-300 p-6 bg-gray-50">
          <button
            onClick={onClose}
            className="w-full bg-gray-200 hover:bg-gray-300 py-3 rounded-lg border-2 border-gray-400 transition-all"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
