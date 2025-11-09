import { useState } from 'react';
import { X, Sparkles, Plus, Trash2, Loader2 } from 'lucide-react';

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
  const [difficulty, setDifficulty] = useState('medium');
  const [numQuestions, setNumQuestions] = useState(5);
  const [questions, setQuestions] = useState<Question[]>([]);

  const handleGenerateWithAI = () => {
    if (!topic || !subject) {
      alert('Por favor, preencha o tema e a disciplina');
      return;
    }

    setStep('generating');

    // Simulate AI generation
    setTimeout(() => {
      const generatedQuestions: Question[] = [];
      
      for (let i = 0; i < numQuestions; i++) {
        generatedQuestions.push({
          question: `Questão ${i + 1} sobre ${topic}?`,
          options: [
            'Opção A gerada pela IA',
            'Opção B gerada pela IA',
            'Opção C gerada pela IA',
            'Opção D gerada pela IA'
          ],
          correctAnswer: Math.floor(Math.random() * 4)
        });
      }

      setQuestions(generatedQuestions);
      setStep('review');
    }, 2000);
  };

  const updateQuestion = (index: number, field: keyof Question, value: any) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], [field]: value };
    setQuestions(updated);
  };

  const updateOption = (questionIndex: number, optionIndex: number, value: string) => {
    const updated = [...questions];
    updated[questionIndex].options[optionIndex] = value;
    setQuestions(updated);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0
      }
    ]);
  };

  const handleSave = () => {
    if (!title || questions.length === 0) {
      alert('Por favor, preencha o título e adicione pelo menos uma questão');
      return;
    }

    onSave({
      title,
      subject,
      difficulty,
      questions
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg border-4 border-gray-300 shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 border-b-4 border-blue-700 p-6 flex items-center justify-between">
          <h2 className="text-white">Criar Novo Quiz</h2>
          <button
            onClick={onClose}
            className="bg-white hover:bg-gray-100 p-2 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {step === 'form' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2">Título do Quiz</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Ex: Frações e Decimais"
                  />
                </div>

                <div>
                  <label className="block mb-2">Disciplina</label>
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
                  </select>
                </div>
              </div>

              <div>
                <label className="block mb-2">Tema / Conteúdo</label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Ex: Operações com frações, Adição e subtração de decimais"
                />
                <p className="text-gray-500 mt-2">
                  A IA usará este tema para gerar as questões automaticamente
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2">Nível de Dificuldade</label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="easy">Fácil</option>
                    <option value="medium">Médio</option>
                    <option value="hard">Difícil</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2">Número de Questões</label>
                  <input
                    type="number"
                    min="3"
                    max="15"
                    value={numQuestions}
                    onChange={(e) => setNumQuestions(parseInt(e.target.value) || 5)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg border-2 border-purple-300 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                  <h3>Geração Automática com IA</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Nossa IA pode gerar automaticamente as questões e respostas baseadas no tema informado.
                  Você poderá revisar e editar antes de salvar.
                </p>
                <button
                  onClick={handleGenerateWithAI}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-lg border-2 border-purple-700 transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  Gerar Questões com IA
                </button>
              </div>

              <div className="pt-4 border-t-2 border-gray-200">
                <p className="text-gray-600 mb-4">Ou crie manualmente:</p>
                <button
                  onClick={() => {
                    setQuestions([{
                      question: '',
                      options: ['', '', '', ''],
                      correctAnswer: 0
                    }]);
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
              <Loader2 className="w-16 h-16 text-purple-600 animate-spin mx-auto mb-6" />
              <h3 className="mb-2">Gerando questões com IA...</h3>
              <p className="text-gray-600">
                Aguarde enquanto criamos {numQuestions} questões sobre {topic}
              </p>
            </div>
          )}

          {step === 'review' && (
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg border-2 border-blue-300 p-4">
                <p className="text-blue-800">
                  <Sparkles className="w-5 h-5 inline-block mr-2" />
                  Revise as questões geradas. Você pode editar qualquer campo antes de salvar.
                </p>
              </div>

              {questions.map((q, qIndex) => (
                <div key={qIndex} className="bg-gray-50 rounded-lg border-2 border-gray-300 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4>Questão {qIndex + 1}</h4>
                    <button
                      onClick={() => removeQuestion(qIndex)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="mb-4">
                    <label className="block mb-2">Pergunta</label>
                    <input
                      type="text"
                      value={q.question}
                      onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="Digite a pergunta..."
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="block">Opções de Resposta</label>
                    {q.options.map((option, oIndex) => (
                      <div key={oIndex} className="flex items-center gap-3">
                        <input
                          type="radio"
                          name={`correct-${qIndex}`}
                          checked={q.correctAnswer === oIndex}
                          onChange={() => updateQuestion(qIndex, 'correctAnswer', oIndex)}
                          className="w-5 h-5"
                        />
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                          className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                          placeholder={`Opção ${String.fromCharCode(65 + oIndex)}`}
                        />
                        {q.correctAnswer === oIndex && (
                          <span className="text-green-600">✓ Correta</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <button
                onClick={addQuestion}
                className="w-full bg-gray-100 hover:bg-gray-200 py-3 rounded-lg border-2 border-gray-300 transition-all flex items-center justify-center gap-2"
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
            className="flex-1 bg-gray-200 hover:bg-gray-300 py-3 rounded-lg border-2 border-gray-400 transition-all"
          >
            Cancelar
          </button>
          {step === 'review' && (
            <button
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-lg border-2 border-green-700 transition-all"
            >
              Salvar Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
