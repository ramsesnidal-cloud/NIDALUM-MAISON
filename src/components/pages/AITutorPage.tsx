import { useState, useRef, useEffect } from 'react';
import { AITutorService } from '@/lib/api-service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Send, AlertCircle, BookOpen } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface Exercise {
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
}

export default function AITutorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        'Bonjour! Je suis votre tuteur IA Nidalum. Je peux vous aider à apprendre la langue, répondre à vos questions, et créer des exercices personnalisés. Par quoi voulez-vous commencer?',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExerciseFeedback, setShowExerciseFeedback] = useState(false);
  const [exerciseFeedback, setExerciseFeedback] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setError(null);

    try {
      // Get AI response
      const response = await AITutorService.chat([
        ...messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
        { role: 'user', content: inputValue },
      ]);

      const assistantMessage: Message = {
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Une erreur est survenue';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateExercise = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const exercise = await AITutorService.generateExercise(
        'Vocabulaire général',
        'intermédiaire'
      );
      setCurrentExercise(exercise);
      setSelectedAnswer(null);
      setShowExerciseFeedback(false);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erreur lors de la génération';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!currentExercise || !selectedAnswer) return;

    setIsLoading(true);
    try {
      const feedback = await AITutorService.correctExercise(
        currentExercise.question,
        selectedAnswer,
        currentExercise.correctAnswer
      );
      setExerciseFeedback(feedback);
      setShowExerciseFeedback(true);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erreur lors de la correction';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen size={32} className="text-primary" />
            <h1 className="text-4xl font-bold font-heading text-primary">
              Tuteur IA Nidalum
            </h1>
          </div>
          <p className="text-lg text-secondary">
            Apprenez avec un tuteur IA personnalisé
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <Card className="bg-red-500/10 border-red-500/30 p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-500 font-semibold">Erreur</p>
              <p className="text-red-400/80 text-sm">{error}</p>
              <p className="text-red-400/60 text-xs mt-2">
                Assurez-vous que la clé OpenAI est configurée dans les variables
                d'environnement.
              </p>
            </div>
          </Card>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Section */}
          <div className="lg:col-span-2">
            <Card className="bg-white/5 border-secondary/20 h-[600px] flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-primary/20 text-white'
                          : 'bg-secondary/20 text-white'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-50 mt-1">
                        {message.timestamp.toLocaleTimeString('fr-FR', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-secondary/20 px-4 py-3 rounded-lg">
                      <LoadingSpinner />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="border-t border-secondary/20 p-4">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Posez une question..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    disabled={isLoading}
                    className="flex-1 bg-white/10 border-secondary/30"
                  />
                  <Button
                    type="submit"
                    disabled={isLoading || !inputValue.trim()}
                    className="bg-primary hover:bg-primary/80"
                  >
                    <Send size={18} />
                  </Button>
                </form>
              </div>
            </Card>
          </div>

          {/* Exercise Section */}
          <div className="lg:col-span-1">
            <Card className="bg-white/5 border-secondary/20 p-6">
              <h3 className="text-xl font-bold text-primary font-heading mb-4">
                Exercices
              </h3>

              {!currentExercise ? (
                <Button
                  onClick={handleGenerateExercise}
                  disabled={isLoading}
                  className="w-full bg-secondary hover:bg-secondary/80 text-black"
                >
                  {isLoading ? <LoadingSpinner /> : 'Générer un exercice'}
                </Button>
              ) : !showExerciseFeedback ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-white/80 font-semibold mb-3">
                      {currentExercise.question}
                    </p>

                    {currentExercise.options ? (
                      <div className="space-y-2">
                        {currentExercise.options.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedAnswer(option)}
                            className={`w-full p-3 rounded-lg text-left transition-colors ${
                              selectedAnswer === option
                                ? 'bg-primary/30 border-primary/50 border'
                                : 'bg-white/5 border-secondary/20 border hover:bg-white/10'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <Input
                        type="text"
                        placeholder="Votre réponse..."
                        value={selectedAnswer || ''}
                        onChange={(e) => setSelectedAnswer(e.target.value)}
                        className="bg-white/10 border-secondary/30"
                      />
                    )}
                  </div>

                  <Button
                    onClick={handleSubmitAnswer}
                    disabled={isLoading || !selectedAnswer}
                    className="w-full bg-primary hover:bg-primary/80"
                  >
                    Vérifier
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div
                    className={`p-4 rounded-lg ${
                      exerciseFeedback?.isCorrect
                        ? 'bg-green-500/20 border border-green-500/30'
                        : 'bg-red-500/20 border border-red-500/30'
                    }`}
                  >
                    <p
                      className={`font-semibold ${
                        exerciseFeedback?.isCorrect
                          ? 'text-green-400'
                          : 'text-red-400'
                      }`}
                    >
                      {exerciseFeedback?.isCorrect ? '✓ Correct!' : '✗ Incorrect'}
                    </p>
                    <p className="text-white/80 text-sm mt-2">
                      {exerciseFeedback?.feedback}
                    </p>
                  </div>

                  {exerciseFeedback?.explanation && (
                    <div className="bg-white/5 p-4 rounded-lg">
                      <p className="text-secondary text-sm font-semibold mb-2">
                        Explication
                      </p>
                      <p className="text-white/80 text-sm">
                        {exerciseFeedback.explanation}
                      </p>
                    </div>
                  )}

                  <Button
                    onClick={handleGenerateExercise}
                    disabled={isLoading}
                    className="w-full bg-secondary hover:bg-secondary/80 text-black"
                  >
                    Nouvel exercice
                  </Button>
                </div>
              )}
            </Card>
          </div>
        </div>

        {/* Configuration Notice */}
        <Card className="bg-blue-500/10 border-blue-500/30 p-4 mt-6">
          <p className="text-blue-400 text-sm">
            <strong>Configuration requise:</strong> Pour utiliser le tuteur IA,
            ajoutez votre clé OpenAI dans le fichier .env:
            <code className="block bg-black/30 p-2 rounded mt-2 text-xs">
              VITE_OPENAI_API_KEY=sk-...
            </code>
          </p>
        </Card>
      </div>
    </div>
  );
}
