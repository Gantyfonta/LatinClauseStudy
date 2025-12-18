
import React, { useState, useEffect, useCallback } from 'react';
import { ClauseType, LatinQuestion, GameState } from './types';
import { INITIAL_QUESTIONS, CLAUSE_DESCRIPTIONS } from './constants';
import { generateNewQuestion } from './geminiService';

const App: React.FC = () => {
  const [state, setState] = useState<GameState>({
    currentQuestion: null,
    score: 0,
    totalAnswered: 0,
    isGameOver: false,
    lastAnswerCorrect: null,
    showExplanation: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showRules, setShowRules] = useState(false);

  // Initialize with a random question from local pool or AI
  const fetchNextQuestion = useCallback(async () => {
    setIsLoading(true);
    setState(prev => ({ ...prev, showExplanation: false, lastAnswerCorrect: null }));
    
    // Try AI generation, fall back to local pool
    const aiQuestion = await generateNewQuestion();
    if (aiQuestion) {
      setState(prev => ({ ...prev, currentQuestion: aiQuestion }));
    } else {
      const randomIdx = Math.floor(Math.random() * INITIAL_QUESTIONS.length);
      setState(prev => ({ ...prev, currentQuestion: INITIAL_QUESTIONS[randomIdx] }));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchNextQuestion();
  }, [fetchNextQuestion]);

  const handleAnswer = (selected: ClauseType) => {
    if (!state.currentQuestion || state.showExplanation) return;

    const isCorrect = selected === state.currentQuestion.correctCategory;
    
    setState(prev => ({
      ...prev,
      score: isCorrect ? prev.score + 1 : prev.score,
      totalAnswered: prev.totalAnswered + 1,
      lastAnswerCorrect: isCorrect,
      showExplanation: true,
    }));
  };

  const resetGame = () => {
    setState({
      currentQuestion: null,
      score: 0,
      totalAnswered: 0,
      isGameOver: false,
      lastAnswerCorrect: null,
      showExplanation: false,
    });
    fetchNextQuestion();
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4 sm:px-6">
      <header className="w-full max-w-4xl text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-2 latin-text italic">Ludi Syntaxeos Latinae</h1>
        <p className="text-slate-600 font-medium">Master the complex clauses of Latin literature</p>
      </header>

      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Stats/Rules Column */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Progress</h2>
            <div className="flex justify-between items-center mb-2">
              <span className="text-slate-500">Score</span>
              <span className="text-2xl font-bold text-blue-600">{state.score}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Attempted</span>
              <span className="text-2xl font-bold text-slate-700">{state.totalAnswered}</span>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 transition-all duration-500" 
                  style={{ width: `${state.totalAnswered > 0 ? (state.score / state.totalAnswered) * 100 : 0}%` }}
                />
              </div>
              <p className="text-xs text-slate-400 mt-2 text-center">Accuracy: {state.totalAnswered > 0 ? Math.round((state.score / state.totalAnswered) * 100) : 0}%</p>
            </div>
          </div>

          <button 
            onClick={() => setShowRules(!showRules)}
            className="w-full bg-slate-800 text-white py-3 px-6 rounded-xl font-semibold hover:bg-slate-700 transition shadow-md"
          >
            {showRules ? 'Hide Rules' : 'View Grammar Rules'}
          </button>

          {showRules && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 h-96 overflow-y-auto space-y-4">
              <h3 className="font-bold text-lg text-slate-800 border-b pb-2">Reference Guide</h3>
              {Object.entries(CLAUSE_DESCRIPTIONS).map(([key, desc]) => (
                <div key={key}>
                  <p className="font-bold text-sm text-blue-700 uppercase tracking-tight">{key}</p>
                  <p className="text-sm text-slate-600">{desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Main Game Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-slate-100 relative min-h-[400px] flex flex-col justify-center text-center">
            {isLoading ? (
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-slate-500 italic">Consulting the Oracle...</p>
              </div>
            ) : state.currentQuestion ? (
              <>
                <div className="mb-8">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">Challenge</span>
                  <h2 className="text-3xl font-bold text-slate-800 latin-text leading-tight mb-4">
                    &ldquo;{state.currentQuestion.latin}&rdquo;
                  </h2>
                  <p className="text-slate-400 italic font-medium">{state.currentQuestion.translation}</p>
                </div>

                {!state.showExplanation ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                    {Object.values(ClauseType).map((type) => (
                      <button
                        key={type}
                        onClick={() => handleAnswer(type)}
                        className="py-3 px-4 border-2 border-slate-200 rounded-xl text-slate-700 font-medium hover:border-blue-400 hover:bg-blue-50 transition active:scale-95 text-sm"
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className={`mt-6 p-6 rounded-2xl text-left animate-in fade-in slide-in-from-bottom-4 duration-300 ${state.lastAnswerCorrect ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${state.lastAnswerCorrect ? 'bg-green-500' : 'bg-red-500'}`}>
                        {state.lastAnswerCorrect ? '✓' : '✗'}
                      </div>
                      <h3 className="font-bold text-lg">
                        {state.lastAnswerCorrect ? 'Correct!' : 'Not quite...'}
                      </h3>
                    </div>
                    <p className="text-slate-700 mb-2">
                      <span className="font-bold">Correct Category:</span> {state.currentQuestion.correctCategory}
                    </p>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      {state.currentQuestion.explanation}
                    </p>
                    <button 
                      onClick={fetchNextQuestion}
                      className="w-full bg-slate-800 text-white py-3 rounded-xl font-bold hover:bg-slate-700 transition"
                    >
                      Next Sentence
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-slate-400 italic">No question loaded...</div>
            )}
          </div>
          
          <div className="flex justify-between items-center px-4">
            <p className="text-xs text-slate-400 italic">Note: AI generation provides endless variety. Sentences are synthesized based on classical paradigms.</p>
            <button 
              onClick={resetGame}
              className="text-xs font-bold text-red-500 hover:text-red-700 transition uppercase tracking-widest"
            >
              Reset Session
            </button>
          </div>
        </div>
      </div>

      <footer className="mt-16 text-slate-400 text-sm flex flex-col items-center">
        <div className="flex gap-4 mb-2">
           <span className="font-medium text-slate-500 italic">S.P.Q.R.</span>
        </div>
        <p>&copy; {new Date().getFullYear()} Latin Clause Master Educational Game</p>
      </footer>
    </div>
  );
};

export default App;
