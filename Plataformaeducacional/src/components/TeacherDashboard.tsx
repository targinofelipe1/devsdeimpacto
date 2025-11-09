import { User } from '../App';
import { LogOut, User as UserIcon, FileText, AlertTriangle, BarChart3, Plus, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { CreateQuizModal } from './modals/CreateQuizModal';
import { QuizResultsModal } from './modals/QuizResultsModal';
import { DetailsModal } from './modals/DetailsModal';
import { SensoryModeToggle } from './SensoryModeToggle';

interface TeacherDashboardProps {
  user: User;
  onNavigate: (view: 'home' | 'dashboard' | 'battle' | 'emotional' | 'profile' | 'ranking') => void;
  onLogout: () => void;
}

const students = [
  { id: '1', name: 'João Silva', nickname: 'HeroJoao', avatar: '🦊', level: 2, grade: 8.5, status: 'good', lastActivity: 'Há 1 hora' },
  { id: '2', name: 'Maria Santos', nickname: 'StarMaria', avatar: '🐯', level: 3, grade: 9.2, status: 'excellent', lastActivity: 'Há 30 min' },
  { id: '3', name: 'Pedro Lima', nickname: 'DragonPedro', avatar: '🦅', level: 4, grade: 9.8, status: 'excellent', lastActivity: 'Há 15 min' },
  { id: '4', name: 'Ana Costa', nickname: 'PhoenixAna', avatar: '🦊', level: 2, grade: 7.5, status: 'good', lastActivity: 'Há 2 horas' },
  { id: '5', name: 'Lucas Oliveira', nickname: 'WolfLucas', avatar: '🐣', level: 1, grade: 5.8, status: 'alert', lastActivity: 'Há 1 dia' }
];

const alerts = [
  { id: 1, student: 'Lucas Oliveira', message: 'Rendimento abaixo do esperado em Matemática', severity: 'high', date: '09/11/2025' },
  { id: 2, student: 'Ana Costa', message: 'Não completou as atividades da semana', severity: 'medium', date: '08/11/2025' },
  { id: 3, student: 'João Silva', message: 'Estado emocional: ansioso registrado', severity: 'medium', date: '07/11/2025' }
];

const quizzes = [
  { id: 1, title: 'Frações e Decimais', subject: 'Matemática', questions: 10, completions: 15, avgScore: 7.8 },
  { id: 2, title: 'Verbos e Conjugações', subject: 'Português', questions: 8, completions: 18, avgScore: 8.2 },
  { id: 3, title: 'Sistema Solar', subject: 'Ciências', questions: 12, completions: 12, avgScore: 9.1 }
];

export function TeacherDashboard({ user, onNavigate, onLogout }: TeacherDashboardProps) {
  const [selectedTab, setSelectedTab] = useState<'students' | 'quizzes' | 'alerts'>('students');
  const [showCreateQuiz, setShowCreateQuiz] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<any>(null);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [quizList, setQuizList] = useState(quizzes);

  const handleCreateQuiz = (newQuiz: any) => {
    const quiz = {
      id: quizList.length + 1,
      title: newQuiz.title,
      subject: newQuiz.subject,
      questions: newQuiz.questions.length,
      completions: 0,
      avgScore: 0,
      difficulty: newQuiz.difficulty
    };
    setQuizList([...quizList, quiz]);
    setShowCreateQuiz(false);
  };

  const handleShowResults = (quiz: any) => {
    setSelectedQuiz(quiz);
    setShowResultsModal(true);
  };

  const handleShowDetails = (item: any, type: 'quiz' | 'student') => {
    if (type === 'student') {
      setSelectedStudent(item);
      setSelectedQuiz(null);
    } else {
      setSelectedQuiz(item);
      setSelectedStudent(null);
    }
    setShowDetailsModal(true);
  };

  const handleGenerateReport = () => {
    alert('Gerando relatório geral dos alunos...');
  };

  const handleResolveAlert = (alertId: number) => {
    alert(`Marcando alerta ${alertId} como resolvido...`);
  };

  const handleViewAlertDetails = (alertId: number) => {
    alert(`Visualizando detalhes do alerta ${alertId}...`);
  };

  const getStatusColor = (status: string) => {
    if (status === 'excellent') return 'bg-[#c2dfb1] text-[#2d5016] border-[#7ba05b]';
    if (status === 'good') return 'bg-[#8bd3dd] text-[#3e2723] border-[#3da5c2]';
    return 'bg-[#ff6b6b] text-white border-[#d32f2f]';
  };

  const getStatusLabel = (status: string) => {
    if (status === 'excellent') return 'Excelente';
    if (status === 'good') return 'Bom';
    return 'Atenção';
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

      {/* Header Pixel Art */}
      <div className="bg-gradient-to-r from-[#3da5c2] to-[#2d8aa2] border-b-4 border-[#1a6b7f]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white border-4 border-[#3e2723] flex items-center justify-center pixel-shadow-lg">
                <span className="text-3xl">{user.avatar}</span>
              </div>
              <div>
                <h2 className="text-white drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)]">{user.name}</h2>
                <p className="text-white/90">Painel do Professor</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <SensoryModeToggle />
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
        {/* Stats Cards - Pixel Art */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-[#f5f1e3] border-4 border-[#3e2723] p-6 pixel-shadow">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[#3da5c2] border-4 border-[#2d8aa2] flex items-center justify-center">
                <UserIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-[#3e2723]">Alunos</h3>
            </div>
            <p className="text-[#3e2723] text-3xl">{students.length}</p>
          </div>

          <div className="bg-[#f5f1e3] border-4 border-[#3e2723] p-6 pixel-shadow">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[#5a9e36] border-4 border-[#3d7025] flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-[#3e2723]">Quizzes</h3>
            </div>
            <p className="text-[#3e2723] text-3xl">{quizList.length}</p>
          </div>

          <div className="bg-[#f5f1e3] border-4 border-[#3e2723] p-6 pixel-shadow">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[#ff9933] border-4 border-[#d4610f] flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-[#3e2723]">Alertas</h3>
            </div>
            <p className="text-[#3e2723] text-3xl">{alerts.length}</p>
          </div>

          <div className="bg-[#f5f1e3] border-4 border-[#3e2723] p-6 pixel-shadow">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[#9b59b6] border-4 border-[#8e44ad] flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-[#3e2723]">Média Geral</h3>
            </div>
            <p className="text-[#3e2723] text-3xl">8.2</p>
          </div>
        </div>

        {/* Tabs - Pixel Art */}
        <div className="bg-[#f5f1e3] border-4 border-[#3e2723] overflow-hidden pixel-shadow-lg">
          <div className="flex border-b-4 border-[#3e2723]">
            <button
              onClick={() => setSelectedTab('students')}
              className={`flex-1 px-6 py-4 ${selectedTab === 'students' ? 'bg-[#3da5c2] text-white' : 'bg-[#e0d5c7] text-[#3e2723] hover:bg-[#c2b5a7]'} transition-colors border-r-4 border-[#3e2723]`}
            >
              <UserIcon className="w-5 h-5 inline-block mr-2" />
              Alunos
            </button>
            <button
              onClick={() => setSelectedTab('quizzes')}
              className={`flex-1 px-6 py-4 ${selectedTab === 'quizzes' ? 'bg-[#3da5c2] text-white' : 'bg-[#e0d5c7] text-[#3e2723] hover:bg-[#c2b5a7]'} transition-colors border-r-4 border-[#3e2723]`}
            >
              <FileText className="w-5 h-5 inline-block mr-2" />
              Quizzes
            </button>
            <button
              onClick={() => setSelectedTab('alerts')}
              className={`flex-1 px-6 py-4 ${selectedTab === 'alerts' ? 'bg-[#3da5c2] text-white' : 'bg-[#e0d5c7] text-[#3e2723] hover:bg-[#c2b5a7]'} transition-colors relative`}
            >
              <AlertTriangle className="w-5 h-5 inline-block mr-2" />
              Alertas
              {alerts.length > 0 && (
                <span className="absolute top-2 right-2 bg-[#d32f2f] text-white text-xs px-2 py-1 border-2 border-[#8b0000]">
                  {alerts.length}
                </span>
              )}
            </button>
          </div>

          <div className="p-6">
            {/* Students Tab */}
            {selectedTab === 'students' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-[#3e2723]">Gerenciar Alunos</h2>
                  <button 
                    onClick={handleGenerateReport}
                    className="bg-gradient-to-r from-[#3da5c2] to-[#2d8aa2] hover:from-[#2d8aa2] hover:to-[#1a6b7f] text-white px-4 py-2 border-4 border-[#1a6b7f] flex items-center gap-2 pixel-button transition-all"
                  >
                    <BarChart3 className="w-5 h-5" />
                    Gerar Relatório Geral
                  </button>
                </div>

                <div className="space-y-4">
                  {students.map((student) => (
                    <div key={student.id} className="bg-[#e0d5c7] border-4 border-[#3e2723] p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white border-4 border-[#3e2723] flex items-center justify-center">
                            <span className="text-2xl">{student.avatar}</span>
                          </div>
                          <div>
                            <h3 className="text-[#3e2723]">{student.name}</h3>
                            <p className="text-[#6d4c41]">@{student.nickname} • Nível {student.level}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <p className="text-[#6d4c41]">Média</p>
                            <p className={`text-2xl ${student.grade >= 7 ? 'text-[#5a9e36]' : 'text-[#d32f2f]'}`}>{student.grade}</p>
                          </div>
                          
                          <div className={`px-4 py-2 border-4 ${getStatusColor(student.status)}`}>
                            {getStatusLabel(student.status)}
                          </div>

                          <button 
                            onClick={() => handleShowDetails(student, 'student')}
                            className="bg-white hover:bg-gray-200 px-4 py-2 border-4 border-[#3e2723] pixel-button transition-all"
                          >
                            Ver Detalhes
                          </button>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t-4 border-[#6d4c41]">
                        <p className="text-[#6d4c41]">Última atividade: {student.lastActivity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quizzes Tab */}
            {selectedTab === 'quizzes' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-[#3e2723]">Gerenciar Quizzes</h2>
                  <button 
                    onClick={() => setShowCreateQuiz(true)}
                    className="bg-gradient-to-r from-[#5a9e36] to-[#3d7025] hover:from-[#4a8e26] hover:to-[#2d6015] text-white px-4 py-2 border-4 border-[#2d5016] flex items-center gap-2 pixel-button transition-all"
                  >
                    <Plus className="w-5 h-5" />
                    Criar Novo Quiz
                  </button>
                </div>

                <div className="space-y-4">
                  {quizList.map((quiz) => (
                    <div key={quiz.id} className="bg-gradient-to-r from-[#8bd3dd] to-[#5fcde4] border-4 border-[#3da5c2] p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="text-[#3e2723]">{quiz.title}</h3>
                          <p className="text-[#3e2723]">{quiz.subject} • {quiz.questions} questões</p>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleShowDetails(quiz, 'quiz')}
                            className="bg-[#9b59b6] hover:bg-[#8e44ad] text-white px-4 py-2 border-4 border-[#6c3483] pixel-button transition-all"
                          >
                            Detalhes
                          </button>
                          <button 
                            onClick={() => handleShowResults(quiz)}
                            className="bg-white hover:bg-gray-200 px-4 py-2 border-4 border-[#3e2723] pixel-button transition-all"
                          >
                            Ver Resultados
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 bg-white/50 border-2 border-white/80 p-3">
                        <div>
                          <p className="text-[#3e2723]">Conclusões</p>
                          <p className="text-[#3da5c2]">{quiz.completions} alunos</p>
                        </div>
                        <div>
                          <p className="text-[#3e2723]">Média de Acertos</p>
                          <p className="text-[#5a9e36]">{quiz.avgScore.toFixed(1)}</p>
                        </div>
                        <div>
                          <p className="text-[#3e2723]">Status</p>
                          <p className="flex items-center gap-1 text-[#5a9e36]">
                            <CheckCircle className="w-4 h-4" />
                            Ativo
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Alerts Tab */}
            {selectedTab === 'alerts' && (
              <div>
                <h2 className="mb-6 text-[#3e2723]">Alertas e Notificações</h2>

                {alerts.length === 0 ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-[#5a9e36] mx-auto mb-4" />
                    <p className="text-[#6d4c41]">Nenhum alerta no momento</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {alerts.map((alert) => (
                      <div
                        key={alert.id}
                        className={`border-4 p-4 ${alert.severity === 'high' ? 'bg-[#ff6b6b] border-[#d32f2f]' : 'bg-[#ff9933] border-[#d4610f]'}`}
                      >
                        <div className="flex items-start gap-3">
                          <AlertTriangle className={`w-6 h-6 flex-shrink-0 mt-1 ${alert.severity === 'high' ? 'text-white' : 'text-[#3e2723]'}`} />
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className={alert.severity === 'high' ? 'text-white' : 'text-[#3e2723]'}>{alert.student}</h3>
                              <span className={alert.severity === 'high' ? 'text-white' : 'text-[#3e2723]'}>{alert.date}</span>
                            </div>
                            <p className={`mb-3 ${alert.severity === 'high' ? 'text-white' : 'text-[#3e2723]'}`}>{alert.message}</p>
                            <div className="flex gap-2">
                              <button 
                                onClick={() => handleViewAlertDetails(alert.id)}
                                className="bg-[#3da5c2] hover:bg-[#2d8aa2] text-white px-4 py-2 border-4 border-[#1a6b7f] pixel-button transition-all"
                              >
                                Ver Detalhes
                              </button>
                              <button 
                                onClick={() => handleResolveAlert(alert.id)}
                                className="bg-white hover:bg-gray-200 px-4 py-2 border-4 border-[#3e2723] pixel-button transition-all"
                              >
                                Marcar como Resolvido
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

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
      </div>

      {/* Modals */}
      {showCreateQuiz && <CreateQuizModal onClose={() => setShowCreateQuiz(false)} onSave={handleCreateQuiz} />}
      {showResultsModal && selectedQuiz && <QuizResultsModal onClose={() => setShowResultsModal(false)} quiz={selectedQuiz} />}
      {showDetailsModal && <DetailsModal onClose={() => setShowDetailsModal(false)} type={selectedStudent ? 'student' : 'quiz'} data={selectedQuiz || selectedStudent} />}
    </div>
  );
}
