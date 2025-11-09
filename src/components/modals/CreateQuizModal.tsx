import { useState } from 'react';
import { X, Sparkles, Plus, Trash2, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { QuizQuestion, QuizDifficulty, QuizGenerationRequest } from '../../types/quiz';
import { generateQuiz, validateQuizRequest } from '../../services/quizService';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface CreateQuizModalProps {
  onClose: () => void;
  onSave: (quiz: {
    title: string;
    subject: string;
    difficulty: string;
    questions: Question[];
  }) => void;
}

export function CreateQuizModal({ onClose, onSave }: CreateQuizModalProps) {
  const [step, setStep] = useState<'form' | 'generating' | 'review'>('form');
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState<QuizDifficulty>('medio');
  const [numQuestions, setNumQuestions] = useState(5);
  const [specificFocus, setSpecificFocus] = useState('');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [error, setError] = useState('');
  const [generationProgress, setGenerationProgress] = useState(0);

  const handleGenerateWithAI = async () => {
    // Validar campos
    if (!topic.trim()) {
      setError('Por favor, preencha o tema do quiz');
      return;
    }
    if (!subject.trim()) {
      setError('Por favor, selecione uma disciplina');
      return;
    }
    
    setError('');
    setStep('generating');
    setGenerationProgress(0);

    try {
      // Criar requisição de geração
      const request: QuizGenerationRequest = {
        topic: topic.trim(),
        subject: subject.trim(),
        difficulty,
        numberOfQuestions: numQuestions,
        specificFocus: specificFocus.trim() || undefined
      };

      // Validar requisição
      const validation = validateQuizRequest(request);
      if (!validation.valid) {
        setError(validation.error || 'Dados inválidos');
        setStep('form');
        return;
      }

      // Simular progresso
      const progressInterval = setInterval(() => {
        setGenerationProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 400);

      // Gerar quiz
      const response = await generateQuiz(request);

      clearInterval(progressInterval);
      setGenerationProgress(100);

      if (!response.success || !response.questions) {
        setError(response.error || 'Erro ao gerar quiz');
        setStep('form');
        return;
      }

      setQuestions(response.questions);
      
      // Preencher título automaticamente se estiver vazio
      if (!title.trim()) {
        setTitle(`${topic} - ${subject}`);
      }

      setTimeout(() => {
        setStep('review');
      }, 500);

    } catch (err) {
      setError('Erro inesperado ao gerar quiz. Tente novamente.');
      setStep('form');
    }
  };

  const updateQuestion = (index: number, field: keyof QuizQuestion, value: any) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], [field]: value };
    setQuestions(updated);
  };

  const updateOption = (questionIndex: number, optionIndex: number, value: string) => {
    const updated = [...questions];
    updated[questionIndex].options[optionIndex] = {
      ...updated[questionIndex].options[optionIndex],
      text: value
    };
    setQuestions(updated);
  };

  const setCorrectAnswer = (questionIndex: number, optionIndex: number) => {
    const updated = [...questions];
    updated[questionIndex].correctAnswerId = updated[questionIndex].options[optionIndex].id;
    setQuestions(updated);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const addQuestion = () => {
    const newQuestion: QuizQuestion = {
      id: `q_${Date.now()}_new`,
      question: '',
      options: [
        { id: `opt_${Date.now()}_0`, text: '' },
        { id: `opt_${Date.now()}_1`, text: '' },
        { id: `opt_${Date.now()}_2`, text: '' },
        { id: `opt_${Date.now()}_3`, text: '' }
      ],
      correctAnswerId: `opt_${Date.now()}_0`,
      difficulty
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleSave = () => {
    // Validar
    if (!title.trim()) {
      setError('Por favor, preencha o título do quiz');
      return;
    }

    if (questions.length === 0) {
      setError('Adicione pelo menos uma questão');
      return;
    }

    // Verificar se todas as questões estão preenchidas
    const hasEmptyQuestions = questions.some(q => 
      !q.question.trim() || 
      q.options.some(opt => !opt.text.trim())
    );

    if (hasEmptyQuestions) {
      setError('Preencha todas as questões e opções antes de salvar');
      return;
    }

    // Converter para o formato esperado pelo onSave
    const formattedQuestions: Question[] = questions.map(q => ({
      question: q.question,
      options: q.options.map(opt => opt.text),
      correctAnswer: q.options.findIndex(opt => opt.id === q.correctAnswerId)
    }));

    onSave({
      title: title.trim(),
      subject: subject.trim(),
      difficulty,
      questions: formattedQuestions
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg border-4 border-gray-300 shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 border-b-4 border-blue-700 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-white text-2xl font-bold">Criar Novo Quiz com IA</h2>
            <p className="text-white/90 text-sm mt-1">
              {step === 'form' && 'Preencha os dados e deixe a IA gerar as questões'}
              {step === 'generating' && 'Gerando questões inteligentes...'}
              {step === 'review' && 'Revise e edite as questões geradas'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="bg-white hover:bg-gray-100 p-2 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-800 font-medium">Erro</p>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {step === 'form' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 font-medium text-gray-700">
                    Título do Quiz <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Ex: Frações e Decimais"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium text-gray-700">
                    Disciplina <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Selecione...</option>
                    <option value="Matemática">Matemática</option>
                    <option value="Português">Português</option>
                    <option value="Ciências">Ciências</option>
                    <option value="História">História</option>
                    <option value="Geografia">Geografia</option>
                    <option value="Inglês">Inglês</option>
                    <option value="Física">Física</option>
                    <option value="Química">Química</option>
                    <option value="Biologia">Biologia</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Tema / Tópico Principal <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Ex: Operações com frações, Adição e subtração de decimais"
                />
                <p className="text-gray-500 text-sm mt-2">
                  💡 A IA usará este tema para gerar questões relevantes e bem estruturadas
                </p>
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  Foco Específico (Opcional)
                </label>
                <input
                  type="text"
                  value={specificFocus}
                  onChange={(e) => setSpecificFocus(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Ex: Aplicações práticas, Resolução de problemas, Conceitos teóricos"
                />
                <p className="text-gray-500 text-sm mt-2">
                  Defina um enfoque específico para as questões (opcional)
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 font-medium text-gray-700">
                    Nível de Dificuldade
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as QuizDifficulty)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="facil">🟢 Fácil - Conceitos básicos</option>
                    <option value="medio">🟡 Médio - Aplicação de conceitos</option>
                    <option value="dificil">🔴 Difícil - Análise e síntese</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 font-medium text-gray-700">
                    Número de Questões
                  </label>
                  <input
                    type="number"
                    min="3"
                    max="20"
                    value={numQuestions}
                    onChange={(e) => setNumQuestions(Math.min(20, Math.max(3, parseInt(e.target.value) || 5)))}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <p className="text-gray-500 text-sm mt-1">Entre 3 e 20 questões</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg border-2 border-purple-300 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-800">Geração Automática com IA</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Nossa inteligência artificial irá gerar automaticamente questões de múltipla escolha
                  baseadas no tema, disciplina e dificuldade informados. As questões incluem:
                </p>
                <ul className="text-gray-700 mb-4 space-y-1 ml-4">
                  <li>✓ Perguntas relevantes e bem formuladas</li>
                  <li>✓ 4 opções de resposta por questão</li>
                  <li>✓ Explicações para as respostas corretas</li>
                  <li>✓ Possibilidade de edição após geração</li>
                </ul>
                <button
                  onClick={handleGenerateWithAI}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-4 rounded-lg border-2 border-purple-700 transition-all flex items-center justify-center gap-2 font-medium text-lg"
                >
                  <Sparkles className="w-6 h-6" />
                  Gerar {numQuestions} Questões com IA
                </button>
              </div>

              <div className="pt-4 border-t-2 border-gray-200">
                <p className="text-gray-600 mb-4 font-medium">Ou crie manualmente:</p>
                <button
                  onClick={() => {
                    if (!title.trim() || !subject.trim()) {
                      setError('Preencha o título e a disciplina primeiro');
                      return;
                    }
                    setError('');
                    addQuestion();
                    setStep('review');
                  }}
                  className="w-full bg-gray-100 hover:bg-gray-200 py-3 rounded-lg border-2 border-gray-300 transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Criar Questões Manualmente
                </button>
              </div>
            </div>
          )}

          {step === 'generating' && (
            <div className="text-center py-12">
              <Loader2 className="w-20 h-20 text-purple-600 animate-spin mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Gerando questões com IA...</h3>
              <p className="text-gray-600 mb-6">
                Aguarde enquanto criamos {numQuestions} questões sobre <strong>{topic}</strong>
              </p>
              
              {/* Progress Bar */}
              <div className="max-w-md mx-auto mb-4">
                <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-500 ease-out"
                    style={{ width: `${generationProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">{generationProgress}%</p>
              </div>

              <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 max-w-lg mx-auto">
                <p className="text-blue-800 text-sm">
                  💡 <strong>Dica:</strong> As questões geradas são totalmente editáveis.
                  Você poderá revisar e ajustar tudo antes de salvar!
                </p>
              </div>
            </div>
          )}

          {step === 'review' && (
            <div className="space-y-6">
              <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4 flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-green-800 font-medium">
                    {questions.length} {questions.length === 1 ? 'questão gerada' : 'questões geradas'} com sucesso!
                  </p>
                  <p className="text-green-700 text-sm mt-1">
                    Revise as questões abaixo. Você pode editar qualquer campo antes de salvar.
                  </p>
                </div>
              </div>

              {questions.map((q, qIndex) => (
                <div key={q.id} className="bg-gray-50 rounded-lg border-2 border-gray-300 p-5 hover:border-blue-300 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-lg text-gray-800">Questão {qIndex + 1}</h4>
                      <span className={`px-2 py-1 text-xs rounded ${
                        q.difficulty === 'facil' ? 'bg-green-100 text-green-700' :
                        q.difficulty === 'medio' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {q.difficulty === 'facil' ? '🟢 Fácil' : 
                         q.difficulty === 'medio' ? '🟡 Médio' : '🔴 Difícil'}
                      </span>
                    </div>
                    <button
                      onClick={() => removeQuestion(qIndex)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded transition-colors"
                      title="Remover questão"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="mb-4">
                    <label className="block mb-2 font-medium text-gray-700">Pergunta</label>
                    <textarea
                      value={q.question}
                      onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 min-h-[80px]"
                      placeholder="Digite a pergunta..."
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="block font-medium text-gray-700">Opções de Resposta</label>
                    {q.options.map((option, oIndex) => (
                      <div key={option.id} className="flex items-center gap-3">
                        <input
                          type="radio"
                          name={`correct-${qIndex}`}
                          checked={q.correctAnswerId === option.id}
                          onChange={() => setCorrectAnswer(qIndex, oIndex)}
                          className="w-5 h-5 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={option.text}
                          onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                          className={`flex-1 px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-blue-500 ${
                            q.correctAnswerId === option.id 
                              ? 'border-green-400 bg-green-50' 
                              : 'border-gray-300'
                          }`}
                          placeholder={`Opção ${String.fromCharCode(65 + oIndex)}`}
                        />
                        {q.correctAnswerId === option.id && (
                          <span className="text-green-600 font-medium flex items-center gap-1">
                            <CheckCircle2 className="w-5 h-5" />
                            Correta
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  {q.explanation && (
                    <div className="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                      <p className="text-sm text-blue-800">
                        <strong>💡 Explicação:</strong> {q.explanation}
                      </p>
                    </div>
                  )}
                </div>
              ))}

              <button
                onClick={addQuestion}
                className="w-full bg-gray-100 hover:bg-gray-200 py-4 rounded-lg border-2 border-gray-300 transition-all flex items-center justify-center gap-2 font-medium"
              >
                <Plus className="w-5 h-5" />
                Adicionar Nova Questão
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t-4 border-gray-300 p-6 bg-gray-50 flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 hover:bg-gray-300 py-3 rounded-lg border-2 border-gray-400 transition-all font-medium"
          >
            Cancelar
          </button>
          {step === 'review' && (
            <button
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-lg border-2 border-green-700 transition-all font-medium flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              Salvar Quiz ({questions.length} {questions.length === 1 ? 'questão' : 'questões'})
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
