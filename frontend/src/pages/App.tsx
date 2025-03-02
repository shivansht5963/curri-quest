import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen, Sparkles, LineChart, Triangle, Hexagon, CircleDot, Globe, BookText } from "lucide-react";

export default function App() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen bg-background dark text-foreground antialiased">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center text-center space-y-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-blue">
                  CurriQuest
                </h1>
                <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl">
                  Your interactive journey through the Std X curriculum. Explore, learn, and excel with personalized content.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="w-full max-w-3xl aspect-video relative bg-card rounded-2xl shadow-neo-flat overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-transparent opacity-70"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-brand-purple/20 flex items-center justify-center shadow-neo-inner">
                    <Sparkles className="w-12 h-12 text-brand-purple" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-center">
                  <p className="text-sm md:text-base font-medium">Interactive learning designed for students</p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <button 
                  onClick={() => navigate("/Dashboard")}
                  className="rounded-pill bg-accent text-accent-foreground hover:shadow-neo-accent transition-all py-3 px-8 text-base font-medium shadow-neo-flat hover:translate-y-[-2px] flex items-center gap-2"
                >
                  Get Started <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            </div>
          </div>
          
          {/* Floating Shapes */}
          <div className="absolute -top-10 -left-10 w-72 h-72 bg-brand-purple/10 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-brand-blue/10 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
        </section>
        
        {/* Features Section */}
        <section className="py-12 md:py-24 bg-muted/20">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Features</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-lg">
                Explore the powerful tools designed to enhance your learning experience
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              {/* Feature 1 */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="flex flex-col p-6 bg-card rounded-xl shadow-neo-flat hover:shadow-neo-float transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-brand-purple/20 flex items-center justify-center mb-4 shadow-neo-inner">
                  <BookOpen className="w-6 h-6 text-brand-purple" />
                </div>
                <h3 className="text-xl font-bold mb-2">Curriculum Browsing</h3>
                <p className="text-muted-foreground">
                  Navigate through subjects, topics, and subtopics with an intuitive interface
                </p>
              </motion.div>
              
              {/* Feature 2 */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="flex flex-col p-6 bg-card rounded-xl shadow-neo-flat hover:shadow-neo-float transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-brand-blue/20 flex items-center justify-center mb-4 shadow-neo-inner">
                  <Sparkles className="w-6 h-6 text-brand-blue" />
                </div>
                <h3 className="text-xl font-bold mb-2">Interactive Content</h3>
                <p className="text-muted-foreground">
                  Engage with multimedia lessons, audio Q&A, and geometric animations
                </p>
              </motion.div>
              
              {/* Feature 3 */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="flex flex-col p-6 bg-card rounded-xl shadow-neo-flat hover:shadow-neo-float transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-brand-green/20 flex items-center justify-center mb-4 shadow-neo-inner">
                  <LineChart className="w-6 h-6 text-brand-green" />
                </div>
                <h3 className="text-xl font-bold mb-2">Progress Tracking</h3>
                <p className="text-muted-foreground">
                  Visualize your learning journey with detailed analytics and insights
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Subjects Section */}
        <section className="py-12 md:py-24">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Explore Subjects</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-lg">
                Dive into your curriculum with subject-specific learning paths
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
              {/* Math */}
              <div className="group relative overflow-hidden rounded-xl bg-card shadow-neo-flat hover:shadow-neo-float transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--math-color))] to-[hsl(var(--math-color))] opacity-10 group-hover:opacity-20 transition-opacity"></div>
                <div className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-[hsl(var(--math-color))/20] flex items-center justify-center shadow-neo-inner">
                    <Triangle className="w-6 h-6 text-[hsl(var(--math-color))]" />
                  </div>
                  <h3 className="font-bold">Mathematics</h3>
                </div>
              </div>
              
              {/* Science */}
              <div className="group relative overflow-hidden rounded-xl bg-card shadow-neo-flat hover:shadow-neo-float transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--science-color))] to-[hsl(var(--science-color))] opacity-10 group-hover:opacity-20 transition-opacity"></div>
                <div className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-[hsl(var(--science-color))/20] flex items-center justify-center shadow-neo-inner">
                    <Hexagon className="w-6 h-6 text-[hsl(var(--science-color))]" />
                  </div>
                  <h3 className="font-bold">Science</h3>
                </div>
              </div>
              
              {/* History */}
              <div className="group relative overflow-hidden rounded-xl bg-card shadow-neo-flat hover:shadow-neo-float transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--history-color))] to-[hsl(var(--history-color))] opacity-10 group-hover:opacity-20 transition-opacity"></div>
                <div className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-[hsl(var(--history-color))/20] flex items-center justify-center shadow-neo-inner">
                    <BookText className="w-6 h-6 text-[hsl(var(--history-color))]" />
                  </div>
                  <h3 className="font-bold">History</h3>
                </div>
              </div>
              
              {/* Language */}
              <div className="group relative overflow-hidden rounded-xl bg-card shadow-neo-flat hover:shadow-neo-float transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--language-color))] to-[hsl(var(--language-color))] opacity-10 group-hover:opacity-20 transition-opacity"></div>
                <div className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-[hsl(var(--language-color))/20] flex items-center justify-center shadow-neo-inner">
                    <CircleDot className="w-6 h-6 text-[hsl(var(--language-color))]" />
                  </div>
                  <h3 className="font-bold">Language</h3>
                </div>
              </div>
              
              {/* Geography */}
              <div className="group relative overflow-hidden rounded-xl bg-card shadow-neo-flat hover:shadow-neo-float transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--geography-color))] to-[hsl(var(--geography-color))] opacity-10 group-hover:opacity-20 transition-opacity"></div>
                <div className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-[hsl(var(--geography-color))/20] flex items-center justify-center shadow-neo-inner">
                    <Globe className="w-6 h-6 text-[hsl(var(--geography-color))]" />
                  </div>
                  <h3 className="font-bold">Geography</h3>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-12 md:py-24 bg-muted/20">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="relative overflow-hidden rounded-2xl shadow-neo-float p-8 md:p-12">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-purple/20 to-brand-blue/20"></div>
              <div className="relative z-10 flex flex-col items-center text-center space-y-6 md:space-y-8">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Ready to Enhance Your Learning?</h2>
                <p className="text-muted-foreground max-w-[600px] md:text-lg">
                  Join CurriQuest today and transform the way you experience your curriculum with interactive lessons and personalized insights.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="rounded-pill bg-accent text-accent-foreground hover:shadow-neo-accent transition-all py-3 px-8 text-base font-medium shadow-neo-flat hover:translate-y-[-2px]">
                    Sign Up
                  </button>
                  <button className="rounded-pill bg-card text-card-foreground transition-all py-3 px-8 text-base font-medium shadow-neo-flat hover:shadow-neo-float hover:translate-y-[-2px]">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="py-6 md:py-8 border-t border-border">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-6 h-6 text-accent" />
              <span className="text-xl font-bold">CurriQuest</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 CurriQuest. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
