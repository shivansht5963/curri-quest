import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, Search, Sparkles, Hexagon, Triangle, BookText, CircleDot, Globe, BookOpen } from "lucide-react";
import { useUserGuardContext } from "app";
import { QuizComponent, QuizQuestion } from "components/QuizComponent";

export default function Quiz() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUserGuardContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  // Get subject and topic from URL query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const subject = params.get("subject");
    if (subject) {
      setSelectedSubject(subject);
    }
  }, [location]);

  const quizzesBySubject = {
    math: [
      {
        id: "math-algebra-1",
        title: "Algebra Fundamentals",
        description: "Test your knowledge of algebraic expressions and equations",
        topic: "Algebra",
        difficulty: "Medium",
        questions: [
          {
            id: "m-alg-q1",
            question: "What is the value of x in the equation 2x + 5 = 15?",
            options: ["x = 5", "x = 6", "x = 7", "x = 8"],
            correctAnswer: 0,
            explanation: "To solve for x: 2x + 5 = 15, subtract 5 from both sides to get 2x = 10, then divide both sides by 2 to get x = 5."
          },
          {
            id: "m-alg-q2",
            question: "Which of the following is the factored form of x² - 9?",
            options: ["(x + 3)(x - 3)", "(x + 9)(x - 1)", "(x - 3)²", "(x + 9)(x - 9)"],
            correctAnswer: 0,
            explanation: "x² - 9 can be written as x² - 3² which is a difference of squares. The formula is a² - b² = (a + b)(a - b), so x² - 9 = (x + 3)(x - 3)."
          },
          {
            id: "m-alg-q3",
            question: "If f(x) = 3x² - 4x + 2, what is f(2)?",
            options: ["6", "8", "10", "12"],
            correctAnswer: 1,
            explanation: "To find f(2), substitute x = 2 into the function: f(2) = 3(2)² - 4(2) + 2 = 3(4) - 8 + 2 = 12 - 8 + 2 = 6 + 2 = 8."
          },
          {
            id: "m-alg-q4",
            question: "Which of the following is a solution to the system of equations: x + y = 5 and 2x - y = 4?",
            options: ["x = 3, y = 2", "x = 2, y = 3", "x = 4, y = 1", "x = 1, y = 4"],
            correctAnswer: 0,
            explanation: "To verify: For x = 3, y = 2: First equation: 3 + 2 = 5 ✓. Second equation: 2(3) - 2 = 6 - 2 = 4 ✓. Therefore, x = 3, y = 2 is the solution."
          },
          {
            id: "m-alg-q5",
            question: "What is the slope of the line passing through the points (2, 5) and (4, 9)?",
            options: ["1", "2", "3", "4"],
            correctAnswer: 1,
            explanation: "The slope formula is (y₂ - y₁)/(x₂ - x₁). Using the given points: (9 - 5)/(4 - 2) = 4/2 = 2."
          }
        ]
      },
      {
        id: "math-geometry-1",
        title: "Geometry Concepts",
        description: "Test your understanding of geometric shapes and theorems",
        topic: "Geometry",
        difficulty: "Hard",
        questions: [
          {
            id: "m-geo-q1",
            question: "In a right-angled triangle, if one angle is 90° and another is 30°, what is the third angle?",
            options: ["30°", "45°", "60°", "75°"],
            correctAnswer: 2,
            explanation: "The sum of angles in a triangle is 180°. If one angle is 90° and another is 30°, then the third angle is 180° - 90° - 30° = 60°."
          },
          {
            id: "m-geo-q2",
            question: "What is the area of a circle with radius 6 cm?",
            options: ["36π cm²", "12π cm²", "24π cm²", "18π cm²"],
            correctAnswer: 0,
            explanation: "The area of a circle is given by the formula A = πr². For radius 6 cm: A = π(6)² = 36π cm²."
          },
          {
            id: "m-geo-q3",
            question: "In a right-angled triangle, if the two legs are 6 cm and 8 cm long, what is the length of the hypotenuse?",
            options: ["10 cm", "12 cm", "14 cm", "√100 cm"],
            correctAnswer: 0,
            explanation: "Using the Pythagorean theorem: c² = a² + b², where c is the hypotenuse. c² = 6² + 8² = 36 + 64 = 100, so c = 10 cm."
          },
          {
            id: "m-geo-q4",
            question: "What is the perimeter of a rectangle with length 12 cm and width 5 cm?",
            options: ["17 cm", "24 cm", "34 cm", "60 cm"],
            correctAnswer: 2,
            explanation: "The perimeter of a rectangle is given by 2(length + width). P = 2(12 + 5) = 2(17) = 34 cm."
          },
          {
            id: "m-geo-q5",
            question: "If two angles of a triangle are 45° and 45°, what is the third angle?",
            options: ["45°", "60°", "90°", "120°"],
            correctAnswer: 2,
            explanation: "The sum of angles in a triangle is 180°. If two angles are 45° each, then the third angle is 180° - 45° - 45° = 90°."
          }
        ]
      }
    ],
    science: [
      {
        id: "science-physics-1",
        title: "Forces and Motion",
        description: "Test your knowledge of Newton's laws and mechanics",
        topic: "Physics",
        difficulty: "Medium",
        questions: [
          {
            id: "s-phy-q1",
            question: "Which of Newton's laws states that for every action, there is an equal and opposite reaction?",
            options: ["First Law", "Second Law", "Third Law", "Law of Conservation of Momentum"],
            correctAnswer: 2,
            explanation: "Newton's Third Law states that for every action, there is an equal and opposite reaction."
          },
          {
            id: "s-phy-q2",
            question: "What is the acceleration of a 2 kg object when a force of 10 N is applied to it?",
            options: ["2 m/s²", "5 m/s²", "8 m/s²", "10 m/s²"],
            correctAnswer: 1,
            explanation: "Using Newton's Second Law: F = ma. Rearranging, a = F/m = 10 N / 2 kg = 5 m/s²."
          },
          {
            id: "s-phy-q3",
            question: "What happens to the kinetic energy of an object when its velocity is doubled?",
            options: ["It doubles", "It increases by a factor of 4", "It increases by a factor of 8", "It remains the same"],
            correctAnswer: 1,
            explanation: "The formula for kinetic energy is KE = (1/2)mv². If velocity doubles, the kinetic energy increases by a factor of 2² = 4, since it depends on the square of velocity."
          },
          {
            id: "s-phy-q4",
            question: "Which of the following is the SI unit of force?",
            options: ["Joule", "Watt", "Newton", "Pascal"],
            correctAnswer: 2,
            explanation: "The SI unit of force is the Newton (N), named after Sir Isaac Newton."
          },
          {
            id: "s-phy-q5",
            question: "A car travels 120 meters in 15 seconds. What is its average speed?",
            options: ["6 m/s", "8 m/s", "10 m/s", "12 m/s"],
            correctAnswer: 1,
            explanation: "Average speed = distance / time = 120 m / 15 s = 8 m/s."
          }
        ]
      },
      {
        id: "science-chemistry-1",
        title: "Chemical Reactions",
        description: "Test your knowledge of chemical reactions and compounds",
        topic: "Chemistry",
        difficulty: "Hard",
        questions: [
          {
            id: "s-chem-q1",
            question: "What type of reaction is: 2H₂ + O₂ → 2H₂O?",
            options: ["Decomposition", "Single displacement", "Double displacement", "Synthesis/Combination"],
            correctAnswer: 3,
            explanation: "This is a synthesis or combination reaction where hydrogen and oxygen combine to form water."
          },
          {
            id: "s-chem-q2",
            question: "What is the chemical formula for sodium chloride?",
            options: ["NaCl₂", "Na₂Cl", "NaCl", "NaClO"],
            correctAnswer: 2,
            explanation: "Sodium chloride (table salt) has the chemical formula NaCl."
          },
          {
            id: "s-chem-q3",
            question: "Which of the following is NOT a state of matter at standard temperature and pressure?",
            options: ["Solid", "Liquid", "Gas", "Plasma"],
            correctAnswer: 3,
            explanation: "At standard temperature and pressure (STP), plasma is not commonly observed. It requires very high temperatures or strong electromagnetic fields to exist."
          },
          {
            id: "s-chem-q4",
            question: "What is the pH of a neutral solution?",
            options: ["0", "7", "10", "14"],
            correctAnswer: 1,
            explanation: "A neutral solution has a pH of 7. Values below 7 are acidic, and values above 7 are basic or alkaline."
          },
          {
            id: "s-chem-q5",
            question: "Which of the following elements is a noble gas?",
            options: ["Chlorine", "Sodium", "Helium", "Oxygen"],
            correctAnswer: 2,
            explanation: "Helium (He) is a noble gas. Noble gases are in Group 18 of the periodic table and are characterized by their stable electron configurations."
          }
        ]
      }
    ],
    history: [
      {
        id: "history-modern-1",
        title: "Modern Indian History",
        description: "Test your knowledge of India's freedom struggle and modern events",
        topic: "Modern History",
        difficulty: "Medium",
        questions: [
          {
            id: "h-mod-q1",
            question: "When was the First War of Independence (also known as the Sepoy Mutiny) fought in India?",
            options: ["1757", "1857", "1905", "1947"],
            correctAnswer: 1,
            explanation: "The First War of Independence, also known as the Sepoy Mutiny or the Revolt of 1857, was fought in 1857 against the rule of the British East India Company."
          },
          {
            id: "h-mod-q2",
            question: "Who founded the Indian National Congress in 1885?",
            options: ["Mahatma Gandhi", "Jawaharlal Nehru", "Allan Octavian Hume", "Bal Gangadhar Tilak"],
            correctAnswer: 2,
            explanation: "The Indian National Congress was founded by Allan Octavian Hume, a retired British civil servant, in 1885."
          },
          {
            id: "h-mod-q3",
            question: "Which movement was launched by Mahatma Gandhi in 1942?",
            options: ["Non-Cooperation Movement", "Civil Disobedience Movement", "Quit India Movement", "Khilafat Movement"],
            correctAnswer: 2,
            explanation: "The Quit India Movement, also known as the August Movement, was launched by Mahatma Gandhi in August 1942 during World War II, demanding an end to British rule in India."
          },
          {
            id: "h-mod-q4",
            question: "Who was the first Prime Minister of independent India?",
            options: ["Sardar Vallabhbhai Patel", "Jawaharlal Nehru", "Mahatma Gandhi", "B.R. Ambedkar"],
            correctAnswer: 1,
            explanation: "Jawaharlal Nehru was the first Prime Minister of independent India, serving from 15 August 1947 until his death in May 1964."
          },
          {
            id: "h-mod-q5",
            question: "When did India adopt its Constitution?",
            options: ["15 August 1947", "26 January 1950", "26 November 1949", "15 August 1950"],
            correctAnswer: 1,
            explanation: "India adopted its Constitution on 26 January 1950, which is celebrated as Republic Day. The Constitution was drafted between 1947 and 1949, with Dr. B.R. Ambedkar as the chairman of the drafting committee."
          }
        ]
      }
    ]
  };

  // All quizzes flattened
  const allQuizzes = Object.values(quizzesBySubject).flatMap(quizzes => quizzes);
  
  // Filter quizzes based on search term and selected subject
  const filteredQuizzes = allQuizzes.filter(quiz => {
    const matchesSearch = searchTerm === "" || 
      quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      quiz.topic.toLowerCase().includes(searchTerm.toLowerCase()) || 
      quiz.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesSubject = selectedSubject === null || 
      Object.keys(quizzesBySubject).find(subject => 
        quizzesBySubject[subject as keyof typeof quizzesBySubject].includes(quiz)
      ) === selectedSubject;
      
    return matchesSearch && matchesSubject;
  });

  // Get current active quiz from URL params
  const [activeQuizId, setActiveQuizId] = useState<string | null>(null);
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const quizId = params.get("quiz");
    if (quizId) {
      setActiveQuizId(quizId);
    }
  }, [location]);
  
  const activeQuiz = activeQuizId ? allQuizzes.find(quiz => quiz.id === activeQuizId) : null;
  
  const getColorVarForQuiz = (quiz: any) => {
    // Find which subject this quiz belongs to
    for (const [subject, quizzes] of Object.entries(quizzesBySubject)) {
      if (quizzes.some((q: any) => q.id === quiz.id)) {
        return `--${subject}-color`;
      }
    }
    return "--accent-color"; // Fallback
  };

  return (
    <div className="flex flex-col min-h-screen bg-background dark text-foreground antialiased">
      <div className="container mx-auto py-6 px-4 md:px-6 max-w-7xl">
        {/* Header with back button */}
        <header className="flex items-center mb-6">
          <button 
            onClick={() => {
              if (activeQuizId) {
                // Go back to quiz list
                const params = new URLSearchParams(location.search);
                params.delete("quiz");
                navigate({ search: params.toString() });
                setActiveQuizId(null);
              } else {
                // Go back to dashboard
                navigate("/Dashboard");
              }
            }} 
            className="mr-4 flex items-center justify-center h-10 w-10 rounded-lg bg-card shadow-neo-flat hover:shadow-neo-float transition-all"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h1 className="text-2xl md:text-3xl font-bold">
            {activeQuiz ? activeQuiz.title : "Quiz Library"}
          </h1>
        </header>

        {/* Quiz Content */}
        {activeQuiz ? (
          <QuizComponent 
            title={activeQuiz.title}
            description={activeQuiz.description}
            subject={Object.keys(quizzesBySubject).find(subject => 
              quizzesBySubject[subject as keyof typeof quizzesBySubject].some(q => q.id === activeQuiz.id)
            ) || ""}
            topic={activeQuiz.topic}
            questions={activeQuiz.questions as QuizQuestion[]}
            colorVar={getColorVarForQuiz(activeQuiz)}
            onComplete={(score, total) => {
              console.log(`Quiz completed with score ${score}/${total}`);
            }}
          />
        ) : (
          <>
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input 
                  type="search" 
                  placeholder="Search quizzes..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-12 w-full rounded-lg border border-input bg-card pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent shadow-neo-inner"
                />
              </div>
              
              <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
                <button 
                  onClick={() => setSelectedSubject(null)}
                  className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap ${selectedSubject === null ? 'bg-accent/20 text-accent shadow-neo-inner' : 'bg-secondary/20 text-foreground shadow-neo-flat hover:shadow-neo-float'}`}
                >
                  All Subjects
                </button>
                
                <button 
                  onClick={() => setSelectedSubject("math")}
                  className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap flex items-center gap-2 ${selectedSubject === "math" ? 'bg-[hsl(var(--math-color))/20] text-[hsl(var(--math-color))] shadow-neo-inner' : 'bg-secondary/20 text-foreground shadow-neo-flat hover:shadow-neo-float'}`}
                >
                  <Triangle className="h-4 w-4" /> Mathematics
                </button>
                
                <button 
                  onClick={() => setSelectedSubject("science")}
                  className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap flex items-center gap-2 ${selectedSubject === "science" ? 'bg-[hsl(var(--science-color))/20] text-[hsl(var(--science-color))] shadow-neo-inner' : 'bg-secondary/20 text-foreground shadow-neo-flat hover:shadow-neo-float'}`}
                >
                  <Hexagon className="h-4 w-4" /> Science
                </button>
                
                <button 
                  onClick={() => setSelectedSubject("history")}
                  className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap flex items-center gap-2 ${selectedSubject === "history" ? 'bg-[hsl(var(--history-color))/20] text-[hsl(var(--history-color))] shadow-neo-inner' : 'bg-secondary/20 text-foreground shadow-neo-flat hover:shadow-neo-float'}`}
                >
                  <BookText className="h-4 w-4" /> History
                </button>
                
                <button 
                  onClick={() => setSelectedSubject("language")}
                  className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap flex items-center gap-2 ${selectedSubject === "language" ? 'bg-[hsl(var(--language-color))/20] text-[hsl(var(--language-color))] shadow-neo-inner' : 'bg-secondary/20 text-foreground shadow-neo-flat hover:shadow-neo-float'}`}
                >
                  <CircleDot className="h-4 w-4" /> Language
                </button>
                
                <button 
                  onClick={() => setSelectedSubject("geography")}
                  className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap flex items-center gap-2 ${selectedSubject === "geography" ? 'bg-[hsl(var(--geography-color))/20] text-[hsl(var(--geography-color))] shadow-neo-inner' : 'bg-secondary/20 text-foreground shadow-neo-flat hover:shadow-neo-float'}`}
                >
                  <Globe className="h-4 w-4" /> Geography
                </button>
              </div>
            </div>
            
            {/* Quiz List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredQuizzes.length > 0 ? (
                filteredQuizzes.map((quiz) => {
                  const colorVar = getColorVarForQuiz(quiz);
                  const subjectName = Object.keys(quizzesBySubject).find(subject => 
                    quizzesBySubject[subject as keyof typeof quizzesBySubject].includes(quiz)
                  );
                  
                  let SubjectIcon;
                  switch(subjectName) {
                    case 'math': SubjectIcon = Triangle; break;
                    case 'science': SubjectIcon = Hexagon; break;
                    case 'history': SubjectIcon = BookText; break;
                    case 'language': SubjectIcon = CircleDot; break;
                    case 'geography': SubjectIcon = Globe; break;
                    default: SubjectIcon = Sparkles;
                  }
                  
                  return (
                    <motion.div
                      key={quiz.id}
                      whileHover={{ y: -5 }}
                      onClick={() => {
                        // Update URL with quiz ID
                        const params = new URLSearchParams(location.search);
                        params.set("quiz", quiz.id);
                        navigate({ search: params.toString() });
                        setActiveQuizId(quiz.id);
                      }}
                      className="cursor-pointer group relative overflow-hidden rounded-xl bg-card shadow-neo-flat hover:shadow-neo-float transition-all duration-300"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r from-[hsl(var(${colorVar}))] to-[hsl(var(${colorVar}))] opacity-10 group-hover:opacity-20 transition-opacity`}></div>
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-3">
                          <div className={`h-10 w-10 rounded-lg bg-[hsl(var(${colorVar}))/20] flex items-center justify-center shadow-neo-inner`}>
                            <SubjectIcon className={`h-5 w-5 text-[hsl(var(${colorVar}))]`} />
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium bg-[hsl(var(${colorVar}))/20] text-[hsl(var(${colorVar}))]`}>
                            {quiz.difficulty}
                          </span>
                        </div>
                        
                        <h3 className="font-bold text-lg mb-1">{quiz.title}</h3>
                        <p className="text-xs text-muted-foreground mb-2">{subjectName} • {quiz.topic}</p>
                        <p className="text-sm mb-4">{quiz.description}</p>
                        
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <BookOpen className="h-4 w-4" />
                            <span>{quiz.questions.length} questions</span>
                          </div>
                          <span className={`text-sm font-medium text-[hsl(var(${colorVar}))] group-hover:underline`}>Start Quiz</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <div className="col-span-full text-center py-12">
                  <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No quizzes found</h3>
                  <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
                  <button 
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedSubject(null);
                    }}
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-accent/20 text-accent hover:bg-accent/30 transition-colors"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}