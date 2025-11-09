import { User } from '../App';
import { LogOut, User as UserIcon, TrendingUp, AlertTriangle, BarChart3, FileText, Users, Heart } from 'lucide-react';
import { useState } from 'react';
import { DetailsModal } from './modals/DetailsModal';
import { SensoryModeToggle } from './SensoryModeToggle';

interface CoordinationDashboardProps {
  user: User;
  onNavigate: (view: 'home' | 'dashboard' | 'battle' | 'emotional' | 'profile' | 'ranking') => void;
  onLogout: () => void;
}

const classesData = [
  { id: 1, name: '6º Ano A', students: 28, avgGrade: 8.2, alerts: 2, engagement: 85 },
  { id: 2, name: '7º Ano A', students: 30, avgGrade: 7.8, alerts: 5, engagement: 78 },
  { id: 3, name: '8º Ano A', students: 25, avgGrade: 8.5, alerts: 1, engagement: 92 },
  { id: 4, name: '9º Ano A', students: 27, avgGrade: 8.0, alerts: 3, engagement: 80 }
];

const institutionalAlerts = [
  { id: 1, type: 'emotional', student: 'Lucas Oliveira', class: '7º Ano A', message: 'Estado emocional ansioso frequente (3x esta semana)', severity: 'high', date: '09/11/2025' },
  { id: 2, type: 'performance', student: 'Ana Costa', class: '6º Ano A', message: 'Queda de rendimento em múltiplas disciplinas', severity: 'high', date: '08/11/2025' },
  { id: 3, type: 'engagement', student: 'Carlos Mendes', class: '7º Ano A', message: 'Baixa participação nas atividades (apenas 40% completas)', severity: 'medium', date: '08/11/2025' },
  { id: 4, type: 'emotional', student: 'Beatriz Silva', class: '8º Ano A', message: 'Registrou estado emocional triste', severity: 'medium', date: '07/11/2025' }
];

const performanceMetrics = {
  totalStudents: 110,
  avgGrade: 8.1,
  totalAlerts: 11,
  avgEngagement: 84,
  completedActivities: 892,
  emotionalAlerts: 6
};

const emotionalStats = [
  { mood: 'Feliz', icon: '😊', count: 45, percentage: 41 },
  { mood: 'Animado', icon: '🤩', count: 28, percentage: 25 },
  { mood: 'Calmo', icon: '😌', count: 20, percentage: 18 },
  { mood: 'Cansado', icon: '😴', count: 10, percentage: 9 },
  { mood: 'Ansioso', icon: '😰', count: 5, percentage: 5 },
  { mood: 'Triste', icon: '😢', count: 2, percentage: 2 }
];

export function CoordinationDashboard({ user, onNavigate, onLogout }: CoordinationDashboardProps) {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'classes' | 'alerts' | 'emotional'>('overview');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState<any>(null);

  const handleViewClassDetails = (classItem: any) => {
    setSelectedClass(classItem);
    setShowDetailsModal(true);
  };

  const handleExportReport = () => {
    alert('Exportando relatório completo em PDF...');
  };

  const handleCreateIntervention = (alertId: number) => {
    alert(`Criando plano de intervenção para alerta ${alertId}...`);
  };

  const handleContactTeacher = (alertId: number) => {
    alert(`Entrando em contato com o professor sobre alerta ${alertId}...`);
  };

  const handleViewHistory = (alertId: number) => {
    alert(`Visualizando histórico do alerta ${alertId}...`);
  };

  const handleExportEmotionalReport = () => {
    alert('Gerando relatório psicopedagógico...');
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
      <div className="bg-gradient-to-r from-[#9b59b6] to-[#8e44ad] border-b-4 border-[#6c3483]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white border-4 border-[#3e2723] flex items-center justify-center pixel-shadow-lg">
                <span className="text-3xl">{user.avatar}</span>
              </div>
              <div>
                <h2 className="text-white drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)]">{user.name}</h2>
                <p className="text-white/90">Painel da Coordenação Pedagógica</p>
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
        {/* Main Stats - Pixel Art */}
        <div className="grid grid-cols-6 gap-4 mb-8">
          <div className="bg-[#f5f1e3] border-4 border-[#3e2723] p-6 pixel-shadow">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-[#3da5c2] border-4 border-[#2d8aa2] flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-[#3e2723]">Alunos</h4>
            </div>
            <p className="text-[#3e2723] text-2xl">{performanceMetrics.totalStudents}</p>
          </div>

          <div className="bg-[#f5f1e3] border-4 border-[#3e2723] p-6 pixel-shadow">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-[#5a9e36] border-4 border-[#3d7025] flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-[#3e2723]">Média Geral</h4>
            </div>
            <p className="text-[#3e2723] text-2xl">{performanceMetrics.avgGrade}</p>
          </div>

          <div className="bg-[#f5f1e3] border-4 border-[#3e2723] p-6 pixel-shadow">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-[#ff9933] border-4 border-[#d4610f] flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-[#3e2723]">Alertas</h4>
            </div>
            <p className="text-[#3e2723] text-2xl">{performanceMetrics.totalAlerts}</p>
          </div>

          <div className="bg-[#f5f1e3] border-4 border-[#3e2723] p-6 pixel-shadow">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-[#9b59b6] border-4 border-[#8e44ad] flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-[#3e2723]">Engajamento</h4>
            </div>
            <p className="text-[#3e2723] text-2xl">{performanceMetrics.avgEngagement}%</p>
          </div>

          <div className="bg-[#f5f1e3] border-4 border-[#3e2723] p-6 pixel-shadow">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-[#3da5c2] border-4 border-[#2d8aa2] flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-[#3e2723]">Atividades</h4>
            </div>
            <p className="text-[#3e2723] text-2xl">{performanceMetrics.completedActivities}</p>
          </div>

          <div className="bg-[#f5f1e3] border-4 border-[#3e2723] p-6 pixel-shadow">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-[#ff6b6b] border-4 border-[#d32f2f] flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-[#3e2723]">Emocionais</h4>
            </div>
            <p className="text-[#3e2723] text-2xl">{performanceMetrics.emotionalAlerts}</p>
          </div>
        </div>

        {/* Tabs - Pixel Art */}
        <div className="bg-[#f5f1e3] border-4 border-[#3e2723] overflow-hidden pixel-shadow-lg">
          <div className="flex border-b-4 border-[#3e2723]">
            <button
              onClick={() => setSelectedTab('overview')}
              className={`flex-1 px-6 py-4 ${selectedTab === 'overview' ? 'bg-[#9b59b6] text-white' : 'bg-[#e0d5c7] text-[#3e2723] hover:bg-[#c2b5a7]'} transition-colors border-r-4 border-[#3e2723]`}
            >
              <BarChart3 className="w-5 h-5 inline-block mr-2" />
              Visão Geral
            </button>
            <button
              onClick={() => setSelectedTab('classes')}
              className={`flex-1 px-6 py-4 ${selectedTab === 'classes' ? 'bg-[#9b59b6] text-white' : 'bg-[#e0d5c7] text-[#3e2723] hover:bg-[#c2b5a7]'} transition-colors border-r-4 border-[#3e2723]`}
            >
              <Users className="w-5 h-5 inline-block mr-2" />
              Turmas
            </button>
            <button
              onClick={() => setSelectedTab('alerts')}
              className={`flex-1 px-6 py-4 ${selectedTab === 'alerts' ? 'bg-[#9b59b6] text-white' : 'bg-[#e0d5c7] text-[#3e2723] hover:bg-[#c2b5a7]'} transition-colors border-r-4 border-[#3e2723] relative`}
            >
              <AlertTriangle className="w-5 h-5 inline-block mr-2" />
              Alertas
              {institutionalAlerts.length > 0 && (
                <span className="absolute top-2 right-2 bg-[#d32f2f] text-white text-xs px-2 py-1 border-2 border-[#8b0000]">
                  {institutionalAlerts.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setSelectedTab('emotional')}
              className={`flex-1 px-6 py-4 ${selectedTab === 'emotional' ? 'bg-[#9b59b6] text-white' : 'bg-[#e0d5c7] text-[#3e2723] hover:bg-[#c2b5a7]'} transition-colors`}
            >
              <Heart className="w-5 h-5 inline-block mr-2" />
              Bem-Estar Emocional
            </button>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {selectedTab === 'overview' && (
              <div>
                <h2 className="mb-6 text-[#3e2723]">Desempenho Institucional</h2>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="bg-gradient-to-r from-[#8bd3dd] to-[#5fcde4] border-4 border-[#3da5c2] p-6">
                    <h3 className="mb-4 text-[#3e2723]">Desempenho por Disciplina</h3>
                    <div className="space-y-3">
                      {[
                        { subject: 'Matemática', avg: 7.8, color: 'bg-[#3da5c2]' },
                        { subject: 'Português', avg: 8.3, color: 'bg-[#5a9e36]' },
                        { subject: 'Ciências', avg: 8.5, color: 'bg-[#9b59b6]' },
                        { subject: 'História', avg: 8.0, color: 'bg-[#ffcc33]' }
                      ].map((item) => (
                        <div key={item.subject}>
                          <div className="flex justify-between mb-1">
                            <span className="text-[#3e2723]">{item.subject}</span>
                            <span className="text-[#3e2723]">{item.avg.toFixed(1)}</span>
                          </div>
                          <div className="h-4 bg-[#e0d5c7] border-2 border-[#3e2723] overflow-hidden">
                            <div
                              className={`h-full ${item.color}`}
                              style={{ width: `${(item.avg / 10) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-[#c2a8e0] to-[#9b59b6] border-4 border-[#8e44ad] p-6">
                    <h3 className="mb-4 text-white">Taxa de Engajamento</h3>
                    <div className="text-center mb-4">
                      <div className="inline-block relative">
                        <svg className="w-40 h-40">
                          <circle
                            cx="80"
                            cy="80"
                            r="60"
                            fill="none"
                            stroke="#e0d5c7"
                            strokeWidth="12"
                          />
                          <circle
                            cx="80"
                            cy="80"
                            r="60"
                            fill="none"
                            stroke="#ffcc33"
                            strokeWidth="12"
                            strokeDasharray={`${(performanceMetrics.avgEngagement / 100) * 377} 377`}
                            strokeLinecap="round"
                            transform="rotate(-90 80 80)"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-3xl text-white">{performanceMetrics.avgEngagement}%</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-center text-white">
                      {performanceMetrics.completedActivities} atividades completadas
                    </p>
                  </div>
                </div>

                <button 
                  onClick={handleExportReport}
                  className="w-full bg-gradient-to-r from-[#9b59b6] to-[#8e44ad] hover:from-[#8e44ad] hover:to-[#6c3483] text-white py-3 border-4 border-[#6c3483] pixel-button transition-all flex items-center justify-center gap-2"
                >
                  <FileText className="w-5 h-5" />
                  Exportar Relatório Completo em PDF
                </button>
              </div>
            )}

            {/* Classes Tab */}
            {selectedTab === 'classes' && (
              <div>
                <h2 className="mb-6 text-[#3e2723]">Desempenho por Turma</h2>

                <div className="space-y-4">
                  {classesData.map((classItem) => (
                    <div key={classItem.id} className="bg-[#e0d5c7] border-4 border-[#3e2723] p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-[#3e2723]">{classItem.name}</h3>
                        <button 
                          onClick={() => handleViewClassDetails(classItem)}
                          className="bg-[#9b59b6] hover:bg-[#8e44ad] text-white px-4 py-2 border-4 border-[#6c3483] pixel-button transition-all"
                        >
                          Ver Detalhes
                        </button>
                      </div>

                      <div className="grid grid-cols-4 gap-4">
                        <div className="bg-white border-4 border-[#3e2723] p-4 text-center">
                          <p className="text-[#6d4c41] mb-1">Alunos</p>
                          <p className="text-2xl text-[#3da5c2]">{classItem.students}</p>
                        </div>
                        <div className="bg-white border-4 border-[#3e2723] p-4 text-center">
                          <p className="text-[#6d4c41] mb-1">Média</p>
                          <p className={`text-2xl ${classItem.avgGrade >= 7 ? 'text-[#5a9e36]' : 'text-[#d32f2f]'}`}>
                            {classItem.avgGrade}
                          </p>
                        </div>
                        <div className="bg-white border-4 border-[#3e2723] p-4 text-center">
                          <p className="text-[#6d4c41] mb-1">Alertas</p>
                          <p className={`text-2xl ${classItem.alerts > 3 ? 'text-[#d32f2f]' : 'text-[#ff9933]'}`}>
                            {classItem.alerts}
                          </p>
                        </div>
                        <div className="bg-white border-4 border-[#3e2723] p-4 text-center">
                          <p className="text-[#6d4c41] mb-1">Engajamento</p>
                          <p className="text-2xl text-[#9b59b6]">{classItem.engagement}%</p>
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
                <h2 className="mb-6 text-[#3e2723]">Alertas Institucionais</h2>

                <div className="space-y-4">
                  {institutionalAlerts.map((alert) => {
                    const isHighSeverity = alert.severity === 'high';
                    const bgColor = isHighSeverity ? 'bg-[#ff6b6b]' : 'bg-[#ff9933]';
                    const borderColor = isHighSeverity ? 'border-[#d32f2f]' : 'border-[#d4610f]';
                    const iconColor = isHighSeverity ? 'text-white' : 'text-[#3e2723]';

                    return (
                      <div key={alert.id} className={`${bgColor} border-4 ${borderColor} p-4`}>
                        <div className="flex items-start gap-3">
                          {alert.type === 'emotional' ? (
                            <Heart className={`w-6 h-6 flex-shrink-0 mt-1 ${iconColor}`} />
                          ) : (
                            <AlertTriangle className={`w-6 h-6 flex-shrink-0 mt-1 ${iconColor}`} />
                          )}
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className={iconColor}>{alert.student}</h3>
                                <p className={iconColor}>{alert.class}</p>
                              </div>
                              <span className={iconColor}>{alert.date}</span>
                            </div>
                            <p className={`${iconColor} mb-3`}>{alert.message}</p>
                            <div className="flex gap-2">
                              <button 
                                onClick={() => handleCreateIntervention(alert.id)}
                                className="bg-[#9b59b6] hover:bg-[#8e44ad] text-white px-4 py-2 border-4 border-[#6c3483] pixel-button transition-all"
                              >
                                Criar Plano de Intervenção
                              </button>
                              <button 
                                onClick={() => handleContactTeacher(alert.id)}
                                className="bg-[#3da5c2] hover:bg-[#2d8aa2] text-white px-4 py-2 border-4 border-[#1a6b7f] pixel-button transition-all"
                              >
                                Contatar Professor
                              </button>
                              <button 
                                onClick={() => handleViewHistory(alert.id)}
                                className="bg-white hover:bg-gray-200 px-4 py-2 border-4 border-[#3e2723] pixel-button transition-all"
                              >
                                Ver Histórico
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Emotional Tab */}
            {selectedTab === 'emotional' && (
              <div>
                <h2 className="mb-6 text-[#3e2723]">Monitoramento de Bem-Estar Emocional</h2>

                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gradient-to-r from-[#ffa4a4] to-[#ff6b6b] border-4 border-[#d32f2f] p-6">
                    <h3 className="mb-4 text-white">Distribuição de Estados Emocionais</h3>
                    <div className="space-y-3">
                      {emotionalStats.map((stat) => (
                        <div key={stat.mood}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">{stat.icon}</span>
                              <span className="text-white">{stat.mood}</span>
                            </div>
                            <span className="text-white">{stat.count} alunos ({stat.percentage}%)</span>
                          </div>
                          <div className="h-4 bg-[#e0d5c7] border-2 border-[#3e2723] overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#ffcc33] to-[#ff9933]"
                              style={{ width: `${stat.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-[#8bd3dd] to-[#5fcde4] border-4 border-[#3da5c2] p-6">
                    <h3 className="mb-4 text-[#3e2723]">Indicadores de Atenção</h3>
                    <div className="space-y-4">
                      <div className="bg-white border-4 border-[#3e2723] p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-[#d32f2f] border-4 border-[#8b0000] flex items-center justify-center">
                            <AlertTriangle className="w-5 h-5 text-white" />
                          </div>
                          <h4 className="text-[#3e2723]">Alertas Emocionais Ativos</h4>
                        </div>
                        <p className="text-3xl text-[#d32f2f]">{performanceMetrics.emotionalAlerts}</p>
                        <p className="text-[#6d4c41]">Requerem acompanhamento imediato</p>
                      </div>

                      <div className="bg-white border-4 border-[#3e2723] p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-[#5a9e36] border-4 border-[#3d7025] flex items-center justify-center">
                            <Heart className="w-5 h-5 text-white" />
                          </div>
                          <h4 className="text-[#3e2723]">Alunos em Bem-Estar</h4>
                        </div>
                        <p className="text-3xl text-[#5a9e36]">93</p>
                        <p className="text-[#6d4c41]">84% do total</p>
                      </div>

                      <div className="bg-[#ffcc33] border-4 border-[#d4a02c] p-4">
                        <p className="text-[#3e2723] flex items-start gap-2">
                          <span>💡</span>
                          <span>Sugestão: Considere implementar sessões de apoio psicopedagógico para os 6 alunos em estado emocional de risco.</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <button 
                    onClick={handleExportEmotionalReport}
                    className="w-full bg-gradient-to-r from-[#ff6b6b] to-[#d32f2f] hover:from-[#d32f2f] hover:to-[#8b0000] text-white py-3 border-4 border-[#8b0000] pixel-button transition-all flex items-center justify-center gap-2"
                  >
                    <FileText className="w-5 h-5" />
                    Gerar Relatório Psicopedagógico
                  </button>
                </div>
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

      {/* Modal */}
      {showDetailsModal && selectedClass && (
        <DetailsModal 
          onClose={() => setShowDetailsModal(false)} 
          type="class" 
          data={selectedClass} 
        />
      )}
    </div>
  );
}
