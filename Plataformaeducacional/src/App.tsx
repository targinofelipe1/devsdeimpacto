import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { HomePage } from './components/HomePage';
import { StudentDashboard } from './components/StudentDashboard';
import { TeacherDashboard } from './components/TeacherDashboard';
import { CoordinationDashboard } from './components/CoordinationDashboard';
import { BattleQuiz } from './components/BattleQuiz';
import { EmotionalAssistant } from './components/EmotionalAssistant';
import { ProfilePage } from './components/ProfilePage';
import { RankingPage } from './components/RankingPage';
import { ChatAssistant } from './components/ChatAssistant';
import { BadgeShop, BadgeItem } from './components/BadgeShop';
import { LearningPath } from './components/LearningPath';

export type UserRole = 'student' | 'teacher' | 'coordination' | null;

export interface User {
  id: string;
  name: string;
  nickname?: string;
  avatar: string;
  role: UserRole;
  level: number;
  xp: number;
  gems: number;
  emotionalState?: string;
  badges?: string[];
}

export interface AppContextType {
  updateUserAvatar: (avatar: string) => void;
}

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'dashboard' | 'battle' | 'emotional' | 'profile' | 'ranking' | 'chat' | 'shop' | 'path'>('home');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (email: string, password: string) => {
    // Mock authentication
    const users = {
      'aluno@demo.com': {
        id: '1',
        name: 'João Silva',
        nickname: 'HeroJoao',
        avatar: '🦊',
        role: 'student' as UserRole,
        level: 2,
        xp: 450,
        gems: 125,
        emotionalState: 'happy',
        badges: []
      },
      'professor@demo.com': {
        id: '2',
        name: 'Prof. Maria Santos',
        avatar: '👩‍🏫',
        role: 'teacher' as UserRole,
        level: 5,
        xp: 1000,
        gems: 0
      },
      'coordenacao@demo.com': {
        id: '3',
        name: 'Coord. Pedro Lima',
        avatar: '👨‍💼',
        role: 'coordination' as UserRole,
        level: 5,
        xp: 1000,
        gems: 0
      }
    };

    const user = users[email as keyof typeof users];
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      setCurrentView('dashboard');
    } else {
      alert('Credenciais inválidas. Use uma das contas demo.');
    }
  };

  const handleStartBattle = (topic: string) => {
    setSelectedSubject(topic);
    setCurrentView('path');
  };

  const handleStartTopic = (topicId: string) => {
    setSelectedTopic(topicId);
    setCurrentView('battle');
  };

  const handleBattleComplete = (gemsEarned: number) => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, gems: currentUser.gems + gemsEarned });
    }
    setCurrentView('dashboard');
  };

  const updateUserAvatar = (avatar: string) => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, avatar });
    }
  };

  const navigateTo = (view: 'home' | 'dashboard' | 'battle' | 'emotional' | 'profile' | 'ranking' | 'chat' | 'shop' | 'path') => {
    setCurrentView(view);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setCurrentView('home');
  };

  const handlePurchaseBadge = (badge: BadgeItem) => {
    if (!currentUser) return;
    
    if (currentUser.gems >= badge.price && !currentUser.badges?.includes(badge.id)) {
      setCurrentUser({
        ...currentUser,
        gems: currentUser.gems - badge.price,
        badges: [...(currentUser.badges || []), badge.id]
      });
    }
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (currentView === 'home' || !currentUser) {
    return <HomePage onLogin={handleLogin} />;
  }

  if (currentView === 'battle' && currentUser.role === 'student') {
    return (
      <BattleQuiz
        topic={selectedTopic}
        onComplete={handleBattleComplete}
        onBack={() => setCurrentView('path')}
      />
    );
  }

  if (currentView === 'path' && currentUser.role === 'student') {
    return (
      <LearningPath
        user={currentUser}
        subject={selectedSubject}
        onBack={() => setCurrentView('dashboard')}
        onStartTopic={handleStartTopic}
      />
    );
  }

  if (currentView === 'emotional' && currentUser.role === 'student') {
    return (
      <EmotionalAssistant
        user={currentUser}
        onClose={() => setCurrentView('dashboard')}
      />
    );
  }

  if (currentView === 'chat' && currentUser.role === 'student') {
    return (
      <ChatAssistant
        user={currentUser}
        onClose={() => setCurrentView('dashboard')}
      />
    );
  }

  if (currentView === 'shop' && currentUser.role === 'student') {
    return (
      <BadgeShop
        user={currentUser}
        onBack={() => setCurrentView('dashboard')}
        onPurchase={handlePurchaseBadge}
      />
    );
  }

  if (currentView === 'profile') {
    return (
      <ProfilePage
        user={currentUser}
        onBack={() => setCurrentView('dashboard')}
        onUpdateAvatar={updateUserAvatar}
      />
    );
  }

  if (currentView === 'ranking' && currentUser.role === 'student') {
    return (
      <RankingPage
        currentUser={currentUser}
        onBack={() => setCurrentView('dashboard')}
      />
    );
  }

  if (currentUser.role === 'student') {
    return (
      <StudentDashboard
        user={currentUser}
        onStartBattle={handleStartBattle}
        onNavigate={navigateTo}
        onLogout={handleLogout}
      />
    );
  }

  if (currentUser.role === 'teacher') {
    return (
      <TeacherDashboard
        user={currentUser}
        onNavigate={navigateTo}
        onLogout={handleLogout}
      />
    );
  }

  if (currentUser.role === 'coordination') {
    return (
      <CoordinationDashboard
        user={currentUser}
        onNavigate={navigateTo}
        onLogout={handleLogout}
      />
    );
  }

  return null;
}