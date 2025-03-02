import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Search, Sparkles, Triangle, Hexagon, BookText, CircleDot, Globe, Plus } from "lucide-react";
import { useUserGuardContext } from "app";
import { SyllabusContent, Topic } from "components/SyllabusContent";

export default function Curriculum() {
  const navigate = useNavigate();
  const { user } = useUserGuardContext();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  
  // Get subject and topic from URL query params
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const querySubject = queryParams.get("subject");
  const queryTopic = queryParams.get("topic");
  
  // Set initial selected subject from URL params if available
  useState(() => {
    if (querySubject) {
      setSelectedSubject(querySubject);
    }
  }, []);
  
  // Maharashtra Board Syllabus Data
  const subjects = [
    { 
      id: "math", 
      name: "Mathematics",
      icon: <Triangle className="w-6 h-6" />, 
      colorVar: "--math-color",
      topics: [
        { 
          id: "algebra", 
          name: "Algebra", 
          description: "Equations, expressions, and algebraic structures",
          subtopics: [
            "Linear Equations in Two Variables",
            "Quadratic Equations",
            "Arithmetic Progression",
            "Financial Planning",
            "Probability",
            "Statistics"
          ],
          resources: [
            { type: "pdf", title: "MH Board Algebra Textbook", url: "#" },
            { type: "notes", title: "Quadratic Equations Complete Notes", url: "#" },
            { type: "worksheet", title: "Linear Equations Practice Sheet", url: "#" },
            { type: "link", title: "Video Lectures on Arithmetic Progression", url: "#" }
          ]
        },
        { 
          id: "geometry", 
          name: "Geometry", 
          description: "Properties and relations of points, lines, surfaces",
          subtopics: [
            "Similarity",
            "Circle", 
            "Geometric Constructions",
            "Coordinate Geometry",
            "Trigonometry",
            "Mensuration"
          ],
          resources: [
            { type: "pdf", title: "MH Board Geometry Textbook", url: "#" },
            { type: "notes", title: "Circle Theorems and Properties", url: "#" },
            { type: "worksheet", title: "Coordinate Geometry Problems", url: "#" },
            { type: "link", title: "Interactive Geometric Constructions", url: "#" }
          ]
        },
        { 
          id: "trigonometry", 
          name: "Trigonometry", 
          description: "Study of triangles and trigonometric functions",
          subtopics: [
            "Introduction to Trigonometry",
            "Trigonometric Ratios of Complementary Angles",
            "Trigonometric Identities",
            "Heights and Distances",
            "Applications of Trigonometry"
          ],
          resources: [
            { type: "pdf", title: "MH Board Trigonometry Chapter", url: "#" },
            { type: "notes", title: "Trigonometric Identities Quick Reference", url: "#" },
            { type: "worksheet", title: "Heights and Distances Problems", url: "#" }
          ]
        },
        { 
          id: "statistics", 
          name: "Statistics", 
          description: "Collection, analysis and interpretation of data",
          subtopics: [
            "Mean, Median and Mode",
            "Measures of Dispersion",
            "Graphical Representation of Data",
            "Probability",
            "Statistics in Real Life"
          ],
          resources: [
            { type: "pdf", title: "MH Board Statistics Chapter", url: "#" },
            { type: "worksheet", title: "Data Analysis Practice", url: "#" },
            { type: "link", title: "Interactive Statistics Tools", url: "#" }
          ]
        }
      ]
    },
    { 
      id: "science",
      name: "Science",
      icon: <Hexagon className="w-6 h-6" />, 
      colorVar: "--science-color",
      topics: [
        { 
          id: "physics", 
          name: "Physics", 
          description: "Study of matter, energy and their interactions",
          subtopics: [
            "Effects of Electric Current",
            "Heat",
            "Refraction of Light",
            "Lenses",
            "Spectrum",
            "Sound",
            "Magnetic Effect of Electric Current"
          ],
          resources: [
            { type: "pdf", title: "MH Board Physics Textbook", url: "#" },
            { type: "notes", title: "Magnetic Effects of Current", url: "#" },
            { type: "worksheet", title: "Optics Problem Set", url: "#" },
            { type: "link", title: "Interactive Physics Simulations", url: "#" }
          ]
        },
        { 
          id: "chemistry", 
          name: "Chemistry", 
          description: "Composition, structure and properties of substances",
          subtopics: [
            "Periodic Table and Elements",
            "Chemical Reactions and Equations",
            "Acids, Bases and Salts",
            "Metals and Non-metals",
            "Carbon Compounds",
            "Metallurgy"
          ],
          resources: [
            { type: "pdf", title: "MH Board Chemistry Textbook", url: "#" },
            { type: "notes", title: "Periodic Table Complete Guide", url: "#" },
            { type: "worksheet", title: "Balancing Chemical Equations", url: "#" },
            { type: "link", title: "Virtual Chemistry Lab", url: "#" }
          ]
        },
        { 
          id: "biology", 
          name: "Biology", 
          description: "Study of living organisms and vital processes",
          subtopics: [
            "Life Processes",
            "Control and Coordination",
            "Heredity and Evolution",
            "Environmental Management",
            "Cell Biology and Biotechnology",
            "Reproduction and Sexual Health"
          ],
          resources: [
            { type: "pdf", title: "MH Board Biology Textbook", url: "#" },
            { type: "notes", title: "Heredity and Evolution Notes", url: "#" },
            { type: "worksheet", title: "Life Processes Worksheets", url: "#" },
            { type: "link", title: "Interactive Biology Animations", url: "#" }
          ]
        }
      ]
    },
    { 
      id: "history",
      name: "History",
      icon: <BookText className="w-6 h-6" />, 
      colorVar: "--history-color",
      topics: [
        { 
          id: "ancient", 
          name: "Ancient History", 
          description: "Early civilizations through the fall of Rome",
          subtopics: [
            "Indus Valley Civilization",
            "Vedic Period",
            "Rise of Janapadas and Mahajanapadas",
            "Mauryan Empire",
            "Gupta Empire"
          ],
          resources: [
            { type: "pdf", title: "MH Board Ancient History Chapter", url: "#" },
            { type: "notes", title: "Indus Valley Civilization Notes", url: "#" },
            { type: "link", title: "Virtual Tour of Ancient Indian Sites", url: "#" }
          ]
        },
        { 
          id: "medieval", 
          name: "Medieval History", 
          description: "Middle Ages from 5th to 15th century",
          subtopics: [
            "Delhi Sultanate",
            "Vijayanagara Empire",
            "Mughal Empire",
            "Maratha Empire",
            "Rise of European Trading Powers"
          ],
          resources: [
            { type: "pdf", title: "MH Board Medieval History Chapter", url: "#" },
            { type: "notes", title: "Mughal Dynasty Complete Guide", url: "#" },
            { type: "worksheet", title: "Medieval India Timeline", url: "#" }
          ]
        },
        { 
          id: "modern", 
          name: "Modern History", 
          description: "Recent history from 16th century onwards",
          subtopics: [
            "British Colonial Rule",
            "Indian Freedom Struggle",
            "Social and Religious Reform Movements",
            "Indian National Movement",
            "Post-Independence India"
          ],
          resources: [
            { type: "pdf", title: "MH Board Modern History Textbook", url: "#" },
            { type: "notes", title: "Indian Freedom Struggle Notes", url: "#" },
            { type: "worksheet", title: "Important Freedom Fighters", url: "#" },
            { type: "link", title: "Documentary on India's Independence", url: "#" }
          ]
        }
      ]
    },
    { 
      id: "language",
      name: "Language",
      icon: <CircleDot className="w-6 h-6" />, 
      colorVar: "--language-color", 
      topics: [
        { id: "grammar", name: "Grammar", description: "Rules of language structure and composition" },
        { id: "literature", name: "Literature", description: "Written works of artistic or intellectual value" },
        { id: "composition", name: "Composition", description: "Art of writing essays, stories and compositions" }
      ]
    },
    { 
      id: "geography",
      name: "Geography",
      icon: <Globe className="w-6 h-6" />, 
      colorVar: "--geography-color",
      topics: [
        { id: "physical", name: "Physical Geography", description: "Natural features of the Earth's surface" },
        { id: "human", name: "Human Geography", description: "Human interaction with the environment" },
        { id: "maps", name: "Maps and Navigation", description: "Reading and creating maps and navigational tools" }
      ]
    },
  ];
  
  return (
    <div className="flex flex-col min-h-screen bg-background dark text-foreground antialiased p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header with back button */}
      <header className="flex items-center mb-6">
        <button 
          onClick={() => navigate("/Dashboard")} 
          className="mr-4 flex items-center justify-center h-10 w-10 rounded-lg bg-card shadow-neo-flat hover:shadow-neo-float transition-all"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-2xl md:text-3xl font-bold">Curriculum Explorer</h1>
      </header>
      
      {/* Search Bar */}
      <div className="mb-8 relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <input 
          type="search" 
          placeholder="Search topics, subjects or keywords..." 
          className="h-12 w-full rounded-lg border border-input bg-card pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent shadow-neo-inner"
        />
      </div>
      
      {/* Subjects Grid */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Browse by Subject</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {subjects.map((subject) => (
            <motion.div
              key={subject.id}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedSubject(subject.id === selectedSubject ? null : subject.id)}
              className={`cursor-pointer group relative overflow-hidden rounded-xl bg-card shadow-neo-flat hover:shadow-neo-float transition-all duration-300 ${selectedSubject === subject.id ? 'ring-2 ring-[hsl(var(' + subject.colorVar + '))]' : ''}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-r from-[hsl(var(${subject.colorVar}))] to-[hsl(var(${subject.colorVar}))] opacity-10 group-hover:opacity-20 transition-opacity`}></div>
              <div className="p-4 flex flex-col items-center text-center space-y-3">
                <div className={`w-12 h-12 rounded-lg bg-[hsl(var(${subject.colorVar}))/20] flex items-center justify-center shadow-neo-inner`}>
                  <div className={`text-[hsl(var(${subject.colorVar}))]`}>{subject.icon}</div>
                </div>
                <div>
                  <h3 className="font-bold">{subject.name}</h3>
                  <p className="text-xs text-muted-foreground">{subject.topics.length} topics</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Selected Subject Topics */}
      {selectedSubject && queryTopic && (
        <section className="mb-8 animate-fadeIn">
          <SyllabusContent
            subject={subjects.find(s => s.id === selectedSubject)?.name || ""}
            topic={subjects.find(s => s.id === selectedSubject)?.topics.find(t => t.id === queryTopic) as Topic}
            colorVar={`--${selectedSubject}-color`}
          />
        </section>
      )}
      
      {/* Topic List */}
      {selectedSubject && !queryTopic && (
        <section className="mb-8 animate-fadeIn">
          <h2 className="text-xl font-bold mb-4">
            {subjects.find(s => s.id === selectedSubject)?.name} Topics
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjects.find(s => s.id === selectedSubject)?.topics.map((topic) => {
              const isTopicSelected = queryTopic === topic.id;
              
              return (
                <motion.div 
                  key={topic.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => {
                    if (!isTopicSelected) {
                      const params = new URLSearchParams(location.search);
                      params.set("subject", selectedSubject || "");
                      params.set("topic", topic.id);
                      navigate({ search: params.toString() });
                    }
                  }}
                  className={`bg-card rounded-xl p-5 shadow-neo-flat hover:shadow-neo-float transition-all duration-300 cursor-pointer ${isTopicSelected ? 'ring-2 ring-[hsl(var(--' + selectedSubject + '-color))]' : ''}`}
                >
                  <h3 className="font-bold text-lg mb-2">{topic.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{topic.description}</p>
                  <div className="flex justify-end">
                    <button className={`px-4 py-2 rounded-lg text-sm font-medium bg-[hsl(var(--${selectedSubject}-color))/20] text-[hsl(var(--${selectedSubject}-color))] hover:bg-[hsl(var(--${selectedSubject}-color))/30] transition-colors`}>
                      {isTopicSelected ? 'Selected' : 'Explore Content'}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      )}
      
      {/* Popular Topics */}
      {!selectedSubject && (
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Popular Topics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-card rounded-xl p-5 shadow-neo-flat hover:shadow-neo-float transition-all duration-300">
              <div className="flex items-start mb-3">
                <div className="w-10 h-10 rounded-lg bg-[hsl(var(--math-color))/20] flex items-center justify-center mr-3 shadow-neo-inner">
                  <Triangle className="w-5 h-5 text-[hsl(var(--math-color))]" />
                </div>
                <div>
                  <h3 className="font-bold">Quadratic Equations</h3>
                  <p className="text-xs text-muted-foreground">Mathematics • Algebra</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">Solving equations with second-degree polynomials</p>
              <div className="flex justify-end">
                <button className="px-4 py-2 rounded-lg text-sm font-medium bg-[hsl(var(--math-color))/20] text-[hsl(var(--math-color))] hover:bg-[hsl(var(--math-color))/30] transition-colors">
                  Start Learning
                </button>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-5 shadow-neo-flat hover:shadow-neo-float transition-all duration-300">
              <div className="flex items-start mb-3">
                <div className="w-10 h-10 rounded-lg bg-[hsl(var(--science-color))/20] flex items-center justify-center mr-3 shadow-neo-inner">
                  <Hexagon className="w-5 h-5 text-[hsl(var(--science-color))]" />
                </div>
                <div>
                  <h3 className="font-bold">Chemical Reactions</h3>
                  <p className="text-xs text-muted-foreground">Science • Chemistry</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">Understanding balancing and types of reactions</p>
              <div className="flex justify-end">
                <button className="px-4 py-2 rounded-lg text-sm font-medium bg-[hsl(var(--science-color))/20] text-[hsl(var(--science-color))] hover:bg-[hsl(var(--science-color))/30] transition-colors">
                  Start Learning
                </button>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-5 shadow-neo-flat hover:shadow-neo-float transition-all duration-300">
              <div className="flex items-start mb-3">
                <div className="w-10 h-10 rounded-lg bg-[hsl(var(--history-color))/20] flex items-center justify-center mr-3 shadow-neo-inner">
                  <BookText className="w-5 h-5 text-[hsl(var(--history-color))]" />
                </div>
                <div>
                  <h3 className="font-bold">World War II</h3>
                  <p className="text-xs text-muted-foreground">History • Modern History</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">Key events, figures and impact of WWII</p>
              <div className="flex justify-end">
                <button className="px-4 py-2 rounded-lg text-sm font-medium bg-[hsl(var(--history-color))/20] text-[hsl(var(--history-color))] hover:bg-[hsl(var(--history-color))/30] transition-colors">
                  Start Learning
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex justify-center">
            <button className="px-6 py-3 rounded-lg text-sm font-medium bg-secondary/30 text-foreground hover:bg-secondary/50 transition-colors shadow-neo-flat hover:shadow-neo-float">
              Explore All Topics
            </button>
          </div>
        </section>
      )}
      
      {/* Recently Added Content */}
      <section>
        <h2 className="text-xl font-bold mb-4">Recently Added</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="group relative overflow-hidden rounded-xl bg-card shadow-neo-flat hover:shadow-neo-float transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--language-color))] to-[hsl(var(--language-color))] opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <div className="p-4">
              <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-[hsl(var(--language-color))/20] text-[hsl(var(--language-color))] mb-3">
                Language • Grammar
              </span>
              <h3 className="font-bold mb-2">Advanced Punctuation Rules</h3>
              <p className="text-sm text-muted-foreground mb-4">Master the art of using semicolons, em dashes, and more</p>
              <div className="flex items-center text-xs text-muted-foreground">
                <BookOpen className="w-4 h-4 mr-1" />
                <span>15 min read</span>
              </div>
            </div>
          </div>
          
          <div className="group relative overflow-hidden rounded-xl bg-card shadow-neo-flat hover:shadow-neo-float transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--math-color))] to-[hsl(var(--math-color))] opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <div className="p-4">
              <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-[hsl(var(--math-color))/20] text-[hsl(var(--math-color))] mb-3">
                Mathematics • Geometry
              </span>
              <h3 className="font-bold mb-2">3D Geometric Constructions</h3>
              <p className="text-sm text-muted-foreground mb-4">Interactive visualization of three-dimensional shapes</p>
              <div className="flex items-center text-xs text-muted-foreground">
                <BookOpen className="w-4 h-4 mr-1" />
                <span>Interactive Activity</span>
              </div>
            </div>
          </div>
          
          <div className="group relative overflow-hidden rounded-xl bg-card shadow-neo-flat hover:shadow-neo-float transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--geography-color))] to-[hsl(var(--geography-color))] opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <div className="p-4">
              <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-[hsl(var(--geography-color))/20] text-[hsl(var(--geography-color))] mb-3">
                Geography • Maps
              </span>
              <h3 className="font-bold mb-2">Digital Mapping Techniques</h3>
              <p className="text-sm text-muted-foreground mb-4">Modern tools and technologies for cartography</p>
              <div className="flex items-center text-xs text-muted-foreground">
                <BookOpen className="w-4 h-4 mr-1" />
                <span>Video Series</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}