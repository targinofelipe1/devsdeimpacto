import { useState, useEffect } from 'react';
import { ArrowLeft, Lightbulb } from 'lucide-react';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  hint?: string;
}

interface BattleQuizProps {
  topic: string;
  onComplete: (gemsEarned: number) => void;
  onBack: () => void;
}

const quizData: Record<string, Question[]> = {
  math: [
    {
      question: 'Qual é o resultado de 15 + 27?',
      options: ['32', '42', '52', '62'],
      correctAnswer: 1,
      hint: 'Dica: Comece somando as unidades (5+7) e depois as dezenas!'
    },
    {
      question: 'Quanto é 8 × 9?',
      options: ['63', '72', '81', '90'],
      correctAnswer: 1,
      hint: 'Dica: Pense em 8 × 10 e depois subtraia 8!'
    },
    {
      question: 'Qual é a metade de 64?',
      options: ['28', '30', '32', '34'],
      correctAnswer: 2,
      hint: 'Dica: Dividir por 2 é o mesmo que encontrar a metade!'
    },
    {
      question: 'Quanto é 100 - 37?',
      options: ['57', '63', '67', '73'],
      correctAnswer: 1,
      hint: 'Dica: Você pode pensar como 100 - 30 - 7'
    },
    {
      question: 'Qual é o próximo número: 5, 10, 15, 20, __?',
      options: ['22', '25', '30', '35'],
      correctAnswer: 1,
      hint: 'Dica: Os números estão aumentando de 5 em 5!'
    }
  ],
  portuguese: [
    {
      question: 'Qual é o plural de "luz"?',
      options: ['luzes', 'luzs', 'luze', 'luzez'],
      correctAnswer: 0,
      hint: 'Dica: Palavras terminadas em "z" fazem plural com "es"'
    },
    {
      question: 'Qual alternativa tem um substantivo próprio?',
      options: ['casa', 'Maria', 'livro', 'caneta'],
      correctAnswer: 1,
      hint: 'Dica: Substantivos próprios nomeiam pessoas, lugares específicos'
    },
    {
      question: 'Qual é o sinônimo de "feliz"?',
      options: ['triste', 'alegre', 'zangado', 'cansado'],
      correctAnswer: 1,
      hint: 'Dica: Sinônimo é uma palavra com significado parecido'
    },
    {
      question: 'Quantas sílabas tem "borboleta"?',
      options: ['2', '3', '4', '5'],
      correctAnswer: 2,
      hint: 'Dica: Separe assim: bor-bo-le-ta'
    },
    {
      question: 'Qual frase está correta?',
      options: ['Nós vai ao parque', 'Nós vamos ao parque', 'Nós vão ao parque', 'Nós vais ao parque'],
      correctAnswer: 1,
      hint: 'Dica: O verbo precisa concordar com "nós"'
    }
  ]
};

export function BattleQuiz({ topic, onComplete, onBack }: BattleQuizProps) {
  const [questions] = useState<Question[]>(quizData[topic] || quizData.math);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [monsterHealth, setMonsterHealth] = useState(questions.length);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [hintCount, setHintCount] = useState(2);
  const [gameOver, setGameOver] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(index);
    setShowFeedback(true);

    const isCorrect = index === questions[currentQuestion].correctAnswer;
    
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
      setMonsterHealth(prev => prev - 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
        setShowHint(false);
      } else {
        setGameOver(true);
      }
    }, 1500);
  };

  const toggleHint = () => {
    if (hintCount > 0 && !showHint) {
      setShowHint(true);
      setHintCount(prev => prev - 1);
    } else {
      setShowHint(false);
    }
  };

  const gemsEarned = correctAnswers * 5;
  const victory = monsterHealth === 0;

  if (gameOver) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-700 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg border-4 border-gray-300 shadow-2xl p-8 max-w-md w-full">
          <h2 className="text-center mb-6">{victory ? '🎉 Vitória!' : '💪 Batalha Concluída!'}</h2>
          
          <div className="text-center mb-8">
            <div className="text-8xl mb-4">
              {victory ? '🏆' : '⚔️'}
            </div>
            <p className="text-gray-600 mb-6">
              {victory ? 'Você derrotou o monstro!' : 'Continue treinando, você está melhorando!'}
            </p>
          </div>

          <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-lg border-2 border-yellow-400 p-6 mb-6">
            <div className="flex justify-between items-center mb-3">
              <span>Questões acertadas:</span>
              <span className="text-green-600">{correctAnswers}/{questions.length}</span>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span>Gemas ganhas:</span>
              <span className="text-yellow-600">+{gemsEarned} 💎</span>
            </div>
            <div className="border-t-2 border-yellow-400 pt-3 mt-3">
              <div className="flex justify-between items-center">
                <span>Total de Gemas:</span>
                <span className="text-yellow-600">{gemsEarned} 💎</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              onComplete(gemsEarned);
            }}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-lg border-2 border-green-700 transition-all"
          >
            Ir para Home →
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const healthPercentage = (monsterHealth / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-900 to-purple-900 relative overflow-hidden">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-4 left-4 bg-white hover:bg-gray-100 px-4 py-2 rounded-lg border-2 border-gray-300 flex items-center gap-2 transition-colors z-10"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Voltar</span>
      </button>

      {/* Hint Button */}
      <button
        onClick={toggleHint}
        disabled={hintCount === 0}
        className={`absolute top-4 right-4 ${hintCount > 0 ? 'bg-yellow-400 hover:bg-yellow-500 border-yellow-600' : 'bg-gray-300 border-gray-400 cursor-not-allowed'} px-4 py-2 rounded-lg border-2 flex items-center gap-2 transition-colors z-10`}
      >
        <Lightbulb className="w-5 h-5" />
        <span>Dicas ({hintCount})</span>
      </button>

      <div className="container mx-auto px-4 py-8">
        {/* Monster Area */}
        <div className="text-center mb-8">
          <div className="inline-block bg-black/30 rounded-lg p-4 border-2 border-red-500">
            <div className="text-8xl mb-4 animate-bounce">👹</div>
            <div className="w-64 bg-gray-700 rounded-full h-6 border-2 border-gray-500 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-500 to-red-600 transition-all duration-500"
                style={{ width: `${healthPercentage}%` }}
              >
                <div className="h-full w-full bg-white/20"></div>
              </div>
            </div>
            <p className="text-white mt-2">Vida: {monsterHealth}/{questions.length}</p>
          </div>
        </div>

        {/* Question Area */}
        <div className="max-w-2xl mx-auto bg-white rounded-lg border-4 border-gray-700 shadow-2xl p-8 mb-8">
          <div className="mb-4">
            <span className="bg-purple-600 text-white px-3 py-1 rounded">
              Questão {currentQuestion + 1}/{questions.length}
            </span>
          </div>
          
          <h3 className="mb-6">{question.question}</h3>

          {showHint && question.hint && (
            <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4 mb-6 flex items-start gap-3">
              <Lightbulb className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
              <p className="text-yellow-800">{question.hint}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === question.correctAnswer;
              const showResult = showFeedback && isSelected;

              let buttonClass = 'bg-gradient-to-b from-blue-400 to-blue-600 border-blue-700 hover:from-blue-500 hover:to-blue-700';
              
              if (showResult) {
                buttonClass = isCorrect
                  ? 'bg-gradient-to-b from-green-400 to-green-600 border-green-700'
                  : 'bg-gradient-to-b from-red-400 to-red-600 border-red-700';
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={selectedAnswer !== null}
                  className={`${buttonClass} text-white p-4 rounded-lg border-4 transition-all disabled:opacity-75 relative overflow-hidden group`}
                >
                  <span className="relative z-10">{option}</span>
                  {showResult && isCorrect && (
                    <span className="absolute top-2 right-2 text-2xl">✓</span>
                  )}
                  {showResult && !isCorrect && (
                    <span className="absolute top-2 right-2 text-2xl">✗</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Hero Area */}
        <div className="text-center">
          <div className="inline-block bg-black/30 rounded-lg p-4 border-2 border-green-500">
            <p className="text-white mb-2">Seu Herói</p>
            <div className="text-6xl">🦸</div>
          </div>
        </div>
      </div>
    </div>
  );
}
