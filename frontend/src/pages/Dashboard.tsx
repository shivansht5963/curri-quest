import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Home, 
  Search, 
  Book, 
  BookOpen, 
  LineChart, 
  Settings, 
  ChevronRight,
  Triangle, 
  Hexagon, 
  BookText, 
  CircleDot, 
  Globe,
  Clock,
  ArrowRight,
  Sparkles,
  LogOut,
  MessageSquare,
  User,
  Youtube
} from "lucide-react";
import { useUserGuardContext, firebaseAuth } from "app";
import { useUserStore } from "../utils/userStore";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useUserGuardContext();
  const { profile, initializeProfile, isLoading } = useUserStore();
  
  // Initialize user profile when component mounts
  useEffect(() => {
    if (user) {
      initializeProfile(user.uid);
    }
  }, [user, initializeProfile]);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  
  // Handle logout
  const handleLogout = async () => {
    try {
      await firebaseAuth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  
  // Use profile data for progress stats, fallback to sample data if not loaded
  const subjectProgress = profile?.subjects ? profile.subjects.map(subject => ({
    id: subject.id,
    name: subject.name,
    progress: subject.progress,
    colorVar: subject.colorVar,
    icon: subject.icon === 'Triangle' ? Triangle :
          subject.icon === 'Hexagon' ? Hexagon :
          subject.icon === 'BookText' ? BookText :
          subject.icon === 'CircleDot' ? CircleDot :
          subject.icon === 'Globe' ? Globe : Triangle
  })) : [
    { id: 'math', name: 'Mathematics', progress: 65, colorVar: '--math-color', icon: Triangle },
    { id: 'science', name: 'Science', progress: 42, colorVar: '--science-color', icon: Hexagon },
    { id: 'history', name: 'History', progress: 78, colorVar: '--history-color', icon: BookText },
    { id: 'language', name: 'Language', progress: 51, colorVar: '--language-color', icon: CircleDot },
    { id: 'geography', name: 'Geography', progress: 35, colorVar: '--geography-color', icon: Globe },
  ];
  
  // Sample data for recent activity
  const recentActivity = [
    { id: 1, title: 'Completed Algebra Quiz', subject: 'Mathematics', time: '2 hours ago', type: 'quiz' },
    { id: 2, title: 'Watched Forces and Motion', subject: 'Science', time: '4 hours ago', type: 'video' },
    { id: 3, title: 'Submitted Geography Assignment', subject: 'Geography', time: 'Yesterday', type: 'assignment' },
  ];
  
  // Sample data for recommended content
  const recommendedContent = [
    { 
      id: 1, 
      title: 'Introduction to Trigonometry', 
      description: 'Learn the basics of trigonometric functions and their applications', 
      subject: 'Mathematics',
      type: 'lesson',
      colorVar: '--math-color',
      icon: Triangle
    },
    { 
      id: 2, 
      title: 'Cell Division Interactive', 
      description: 'Interactive animation explaining mitosis and meiosis', 
      subject: 'Science',
      type: 'interactive',
      colorVar: '--science-color',
      icon: Hexagon
    },
    { 
      id: 3, 
      title: 'World War I Overview', 
      description: 'Comprehensive overview of causes and effects of WWI', 
      subject: 'History',
      type: 'article',
      colorVar: '--history-color',
      icon: BookText
    },
  ];
  
  // Sample topics data for the selected subject
  const topics = {
    math: [
      { id: 'algebra', name: 'Algebra', progress: 75 },
      { id: 'geometry', name: 'Geometry', progress: 60 },
      { id: 'trigonometry', name: 'Trigonometry', progress: 40 },
      { id: 'statistics', name: 'Statistics', progress: 85 },
    ],
    science: [
      { id: 'physics', name: 'Physics', progress: 55 },
      { id: 'chemistry', name: 'Chemistry', progress: 45 },
      { id: 'biology', name: 'Biology', progress: 30 },
      { id: 'environmental', name: 'Environmental Science', progress: 20 },
    ],
    history: [
      { id: 'ancient', name: 'Ancient History', progress: 90 },
      { id: 'medieval', name: 'Medieval History', progress: 80 },
      { id: 'modern', name: 'Modern History', progress: 65 },
      { id: 'world-wars', name: 'World Wars', progress: 70 },
    ],
    language: [
      { id: 'grammar', name: 'Grammar', progress: 60 },
      { id: 'literature', name: 'Literature', progress: 45 },
      { id: 'writing', name: 'Writing Skills', progress: 70 },
      { id: 'comprehension', name: 'Comprehension', progress: 55 },
    ],
    geography: [
      { id: 'physical', name: 'Physical Geography', progress: 40 },
      { id: 'human', name: 'Human Geography', progress: 30 },
      { id: 'cartography', name: 'Cartography', progress: 20 },
      { id: 'climate', name: 'Climate', progress: 50 },
    ],
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-background dark text-foreground antialiased">
      {/* Mobile Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:hidden">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-accent" />
            <span className="font-bold">CurriQuest</span>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <button className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-muted/50 hover:bg-muted p-2">
              <Search className="h-4 w-4" />
            </button>
            <button className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-muted/50 hover:bg-muted p-2">
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1">
        {/* Sidebar - Hidden on mobile */}
        <div className="hidden lg:flex lg:w-60 lg:flex-col lg:fixed lg:inset-y-0 h-screen">
          <div className="flex flex-col space-y-4 py-4 border-r border-border/40 h-full">
            <div className="px-4 py-2 flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-accent" />
              <span className="text-xl font-bold">CurriQuest</span>
            </div>
            
            <nav className="mt-8 flex flex-1 flex-col px-2 space-y-1">
              <button 
                onClick={() => navigate("/")}
                className="flex items-center space-x-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted transition-colors"
              >
                <Home className="h-5 w-5" />
                <span>Home</span>
              </button>
              
              <button 
                className="flex items-center space-x-3 rounded-lg px-3 py-2 bg-accent/10 text-accent transition-colors"
              >
                <Book className="h-5 w-5" />
                <span>Dashboard</span>
              </button>
              
              <button 
                onClick={() => navigate("/Curriculum")}
                className="flex items-center space-x-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted transition-colors"
              >
                <BookOpen className="h-5 w-5" />
                <span>Curriculum</span>
              </button>
              
              <button 
                onClick={() => navigate("/VirtualAssistant")}
                className="flex items-center space-x-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted transition-colors"
              >
                <MessageSquare className="h-5 w-5" />
                <span>Virtual Assistant</span>
              </button>
              
              <button 
                onClick={() => navigate("/Quiz")}
                className="flex items-center space-x-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted transition-colors"
              >
                <LineChart className="h-5 w-5" />
                <span>Quizzes</span>
              </button>
              
              <button 
                onClick={() => navigate("/Profile")}
                className="flex items-center space-x-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted transition-colors"
              >
                <User className="h-5 w-5" />
                <span>Profile</span>
              </button>
              
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </div>
        
        {/* Main Content */}
        <main className="flex-1 lg:pl-60">
          <div className="container mx-auto py-6 px-4 md:px-6 space-y-8">
            {/* Greeting + Search Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Welcome back, {profile?.displayName || user?.displayName || 'Student'}</h1>
                <p className="text-muted-foreground mt-1">{profile?.school || 'Std X School'} | {profile?.grade || '10'}-{profile?.division || 'A'} | {profile?.board || 'Maharashtra State Board'}</p>
                <p className="text-muted-foreground mt-1">Continue your learning journey</p>
              </div>
              
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input 
                  type="search" 
                  placeholder="Search content..." 
                  className="h-10 w-full rounded-lg border border-input bg-card pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>
            
            {/* Bottom Navigation for Mobile */}
            <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background lg:hidden">
              <div className="grid grid-cols-5 h-16">
                <button onClick={() => navigate("/")} className="flex flex-col items-center justify-center gap-1 text-xs text-muted-foreground">
                  <Home className="h-5 w-5" />
                  <span>Home</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-1 text-xs text-accent">
                  <Book className="h-5 w-5" />
                  <span>Dashboard</span>
                </button>
                <button 
                  onClick={() => navigate("/Curriculum")}
                  className="flex flex-col items-center justify-center gap-1 text-xs text-muted-foreground"
                >
                  <BookOpen className="h-5 w-5" />
                  <span>Curriculum</span>
                </button>
                <button 
                  onClick={() => navigate("/Quiz")}
                  className="flex flex-col items-center justify-center gap-1 text-xs text-muted-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  <span>Quizzes</span>
                </button>
                <button 
                  onClick={() => navigate('/Profile')}
                  className="flex flex-col items-center justify-center gap-1 text-xs text-muted-foreground"
                >
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </button>
              </div>
            </div>
            
            {/* Main Dashboard Content */}
            <div className="pb-20 lg:pb-0">  {/* Extra padding at bottom for mobile nav */}
              {/* Progress Overview Section */}
              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Your Progress</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {subjectProgress.map((subject) => {
                    const Icon = subject.icon;
                    return (
                      <motion.div
                        key={subject.id}
                        whileHover={{ y: -5 }}
                        onClick={() => setSelectedSubject(subject.id)}
                        className={`cursor-pointer group relative overflow-hidden rounded-xl bg-card shadow-neo-flat hover:shadow-neo-float transition-all duration-300 ${selectedSubject === subject.id ? 'ring-2 ring-[hsl(var(' + subject.colorVar + '))]' : ''}`}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-r from-[hsl(var(${subject.colorVar}))] to-[hsl(var(${subject.colorVar}))] opacity-10 group-hover:opacity-20 transition-opacity`}></div>
                        <div className="p-4 flex flex-col items-center text-center space-y-3">
                          <div className={`w-12 h-12 rounded-lg bg-[hsl(var(${subject.colorVar}))/20] flex items-center justify-center shadow-neo-inner`}>
                            <Icon className={`w-6 h-6 text-[hsl(var(${subject.colorVar}))]`} />
                          </div>
                          <div className="w-full">
                            <h3 className="font-bold text-sm">{subject.name}</h3>
                            <div className="w-full h-2 rounded-full bg-muted mt-2 overflow-hidden">
                              <div 
                                className={`h-full bg-[hsl(var(${subject.colorVar}))]`}
                                style={{ width: `${subject.progress}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{subject.progress}% complete</p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </section>
              
              {/* Topics for Selected Subject */}
              {selectedSubject && (
                <section className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">
                      {subjectProgress.find(s => s.id === selectedSubject)?.name} Topics
                    </h2>
                    <button className="text-sm text-accent flex items-center">
                      View all <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {selectedSubject && topics[selectedSubject as keyof typeof topics].map((topic) => (
                      <div key={topic.id} className="bg-card rounded-xl p-4 shadow-neo-flat hover:shadow-neo-float transition-all duration-300">
                        <h3 className="font-bold mb-2">{topic.name}</h3>
                        <div className="w-full h-2 rounded-full bg-muted mb-2 overflow-hidden">
                          <div 
                            className={`h-full bg-[hsl(var(--${selectedSubject}-color))]`}
                            style={{ width: `${topic.progress}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between items-center text-xs text-muted-foreground">
                          <span>{topic.progress}% complete</span>
                          <button className="text-accent hover:underline">Continue</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity Section */}
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">Recent Activity</h2>
                    <button className="text-sm text-accent flex items-center">
                      View all <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="bg-card rounded-xl p-4 shadow-neo-flat hover:shadow-neo-float transition-all duration-300 flex items-center">
                        <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center mr-4">
                          <Clock className="h-5 w-5 text-accent" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{activity.title}</h3>
                          <p className="text-sm text-muted-foreground">{activity.subject} | {activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
                
                {/* Recommended Content Section with YouTube Videos */}
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">Recommended For You</h2>
                    <button className="text-sm text-accent flex items-center">
                      More <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {recommendedContent.map((content) => {
                      const Icon = content.icon;
                      return (
                        <div key={content.id} className="group bg-card rounded-xl overflow-hidden shadow-neo-flat hover:shadow-neo-float transition-all duration-300">
                          <div className="p-4">
                            <div className="flex items-start">
                              <div className={`h-10 w-10 rounded-lg bg-[hsl(var(${content.colorVar}))/20] flex items-center justify-center mr-4 shadow-neo-inner`}>
                                <Icon className={`h-5 w-5 text-[hsl(var(${content.colorVar}))]`} />
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between">
                                  <h3 className="font-medium">{content.title}</h3>
                                  <span className="text-xs text-muted-foreground">{content.subject}</span>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">{content.description}</p>
                              </div>
                            </div>
                            <div className="mt-4 flex justify-end">
                              <a 
                                href={`https://www.youtube.com/results?search_query=maharashtra+board+class+10+${content.subject.toLowerCase()}`}
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-sm text-accent flex items-center transition-all group-hover:translate-x-1"
                              >
                                Watch on YouTube <Youtube className="h-4 w-4 ml-1" />
                              </a>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}