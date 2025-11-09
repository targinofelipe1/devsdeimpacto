// Tipos para Quizzes

export type QuizDifficulty = "facil" | "medio" | "dificil";

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  correctAnswerId: string;
  explanation?: string;
  difficulty?: QuizDifficulty;
}

export interface Quiz {
  id: string;
  title: string;
  subject: string;
  topic: string;
  difficulty: QuizDifficulty;
  questions: QuizQuestion[];
  createdAt: Date;
  updatedAt: Date;
  authorId?: string;
  completions?: number;
  avgScore?: number;
}

export interface QuizGenerationRequest {
  topic: string;
  subject: string;
  difficulty: QuizDifficulty;
  numberOfQuestions: number;
  targetGrade?: number; // Série escolar alvo
  specificFocus?: string; // Foco específico dentro do tópico
}

export interface QuizGenerationResponse {
  success: boolean;
  questions?: QuizQuestion[];
  error?: string;
  metadata?: {
    generatedAt: Date;
    model?: string;
    processingTime?: number;
  };
}

export interface QuizAnswer {
  questionId: string;
  selectedOptionId: string;
  isCorrect: boolean;
  timeSpent?: number;
}

export interface QuizResult {
  quizId: string;
  userId: string;
  answers: QuizAnswer[];
  score: number;
  completedAt: Date;
  totalTime?: number;
}
