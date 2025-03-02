import React, { useState } from "react";
import { Check, X, ChevronRight, ChevronLeft, RotateCcw } from "lucide-react";

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface QuizProps {
  title: string;
  description: string;
  subject: string;
  topic: string;
  questions: QuizQuestion[];
  colorVar: string;
  onComplete?: (score: number, totalQuestions: number) => void;
}

export function QuizComponent({
  title,
  description,
  subject,
  topic,
  questions,
  colorVar,
  onComplete
}: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleOptionSelect = (optionIndex: number) => {
    if (showExplanation || quizCompleted) return; // Prevent changing after submission
    setSelectedOption(optionIndex);
  };

  const checkAnswer = () => {
    if (selectedOption === null) return; // Don't proceed if no option selected

    // Update user answers
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestion] = selectedOption;
    setUserAnswers(newUserAnswers);

    // Show explanation
    setShowExplanation(true);

    // Update score if correct
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    setShowExplanation(false);
    setSelectedOption(null);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz completed
      setQuizCompleted(true);
      if (onComplete) {
        onComplete(score, questions.length);
      }
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(userAnswers[currentQuestion - 1]);
      setShowExplanation(userAnswers[currentQuestion - 1] !== null);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setScore(0);
    setUserAnswers(new Array(questions.length).fill(null));
    setQuizCompleted(false);
  };

  const currentQuestionData = questions[currentQuestion];

  // Results screen
  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    let feedback = "";
    
    if (percentage >= 90) {
      feedback = "Excellent! You've mastered this topic.";
    } else if (percentage >= 70) {
      feedback = "Great job! You have a good understanding of this topic.";
    } else if (percentage >= 50) {
      feedback = "Good effort! Review the areas you missed to improve further.";
    } else {
      feedback = "Keep practicing! We recommend reviewing this topic again.";
    }

    return (
      <div className="p-6 bg-card rounded-xl shadow-neo-flat overflow-hidden">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold">{title} - Results</h2>
          <p className="text-muted-foreground mt-2">{subject} • {topic}</p>
        </div>

        <div className="mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-muted" strokeWidth="3" />
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  className={`stroke-[hsl(var(${colorVar}))]`}
                  strokeWidth="3"
                  strokeDasharray="100"
                  strokeDashoffset={100 - percentage}
                  transform="rotate(-90 18 18)"
                />
              </svg>
              <span className="absolute text-2xl font-bold">{percentage}%</span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-lg font-medium mb-2">
              You scored {score} out of {questions.length} questions
            </p>
            <p className="text-muted-foreground">{feedback}</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold">Question Review:</h3>
          <div className="space-y-3 max-h-64 overflow-y-auto p-2">
            {questions.map((q, index) => {
              const isCorrect = userAnswers[index] === q.correctAnswer;
              return (
                <div 
                  key={q.id} 
                  className={`p-3 rounded-lg ${isCorrect ? 'bg-success/10 border border-success/20' : 'bg-destructive/10 border border-destructive/20'}`}
                >
                  <div className="flex items-start gap-2">
                    <div className={`mt-0.5 h-5 w-5 rounded-full flex items-center justify-center ${isCorrect ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'}`}>
                      {isCorrect ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{index + 1}. {q.question}</p>
                      <p className="text-xs mt-1">
                        <span className="font-medium">Your answer:</span> {userAnswers[index] !== null ? q.options[userAnswers[index]] : 'Not answered'}
                      </p>
                      <p className="text-xs mt-1">
                        <span className="font-medium">Correct answer:</span> {q.options[q.correctAnswer]}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button 
            onClick={resetQuiz}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium bg-[hsl(var(${colorVar}))/20] text-[hsl(var(${colorVar}))] hover:bg-[hsl(var(${colorVar}))/30] transition-colors shadow-neo-flat hover:shadow-neo-float`}
          >
            <RotateCcw className="h-4 w-4" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-card rounded-xl shadow-neo-flat overflow-hidden">
      {/* Quiz Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold">{title}</h2>
          <span className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>
        <p className="text-muted-foreground">{subject} • {topic}</p>
        
        {/* Progress bar */}
        <div className="w-full h-2 rounded-full bg-muted mt-4 overflow-hidden">
          <div 
            className={`h-full bg-[hsl(var(${colorVar}))]`}
            style={{ width: `${((currentQuestion + (showExplanation ? 1 : 0)) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">{currentQuestionData.question}</h3>
        
        {/* Options */}
        <div className="space-y-3">
          {currentQuestionData.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(index)}
              className={`w-full text-left p-4 rounded-lg transition-all shadow-neo-flat hover:shadow-neo-float ${selectedOption === index 
                ? showExplanation 
                  ? index === currentQuestionData.correctAnswer 
                    ? 'bg-success/10 border border-success/20' 
                    : 'bg-destructive/10 border border-destructive/20' 
                  : `bg-[hsl(var(${colorVar}))/20] border border-[hsl(var(${colorVar}))/20]`
                : 'bg-secondary/20 border border-border/20 hover:bg-secondary/30'}`}
            >
              <div className="flex items-center">
                <div className={`h-6 w-6 rounded-full mr-3 flex items-center justify-center ${selectedOption === index 
                  ? showExplanation 
                    ? index === currentQuestionData.correctAnswer 
                      ? 'bg-success/20 text-success' 
                      : 'bg-destructive/20 text-destructive' 
                    : `bg-[hsl(var(${colorVar}))/40] text-[hsl(var(${colorVar}))]`
                  : 'bg-muted text-muted-foreground'}`}
                >
                  {showExplanation && selectedOption === index 
                    ? index === currentQuestionData.correctAnswer 
                      ? <Check className="h-4 w-4" /> 
                      : <X className="h-4 w-4" /> 
                    : String.fromCharCode(65 + index) /* A, B, C, D... */}
                </div>
                <span>{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Explanation Section */}
      {showExplanation && (
        <div className={`p-4 rounded-lg mb-6 ${selectedOption === currentQuestionData.correctAnswer ? 'bg-success/10' : 'bg-destructive/10'}`}>
          <div className="flex items-start gap-2">
            <div className={`mt-1 h-5 w-5 rounded-full flex items-center justify-center ${selectedOption === currentQuestionData.correctAnswer ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'}`}>
              {selectedOption === currentQuestionData.correctAnswer ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
            </div>
            <div>
              <p className="font-medium">
                {selectedOption === currentQuestionData.correctAnswer ? 'Correct!' : 'Incorrect!'}
              </p>
              <p className="text-sm mt-1">{currentQuestionData.explanation}</p>
            </div>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex justify-between">
        <button
          onClick={prevQuestion}
          disabled={currentQuestion === 0}
          className={`px-4 py-2 rounded-lg flex items-center gap-1 ${currentQuestion === 0 ? 'text-muted-foreground bg-muted/30 cursor-not-allowed' : 'bg-secondary/30 hover:bg-secondary/50 text-foreground shadow-neo-flat hover:shadow-neo-float'}`}
        >
          <ChevronLeft className="h-4 w-4" /> Previous
        </button>
        
        {!showExplanation ? (
          <button
            onClick={checkAnswer}
            disabled={selectedOption === null}
            className={`px-6 py-2 rounded-lg font-medium ${selectedOption === null ? 'bg-muted/30 text-muted-foreground cursor-not-allowed' : `bg-[hsl(var(${colorVar}))/20] text-[hsl(var(${colorVar}))] hover:bg-[hsl(var(${colorVar}))/30] shadow-neo-flat hover:shadow-neo-float`}`}
          >
            Check Answer
          </button>
        ) : (
          <button
            onClick={nextQuestion}
            className={`px-6 py-2 rounded-lg font-medium flex items-center gap-1 bg-[hsl(var(${colorVar}))/20] text-[hsl(var(${colorVar}))] hover:bg-[hsl(var(${colorVar}))/30] shadow-neo-flat hover:shadow-neo-float`}
          >
            {currentQuestion < questions.length - 1 ? (
              <>
                Next <ChevronRight className="h-4 w-4" />
              </>
            ) : (
              'Complete Quiz'
            )}
          </button>
        )}
      </div>
    </div>
  );
}