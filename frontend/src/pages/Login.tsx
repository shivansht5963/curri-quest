import { SignInOrUpForm } from "app";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { firebaseAuth, firebaseApp } from "app";
import { motion } from "framer-motion";
import { BookOpen, Sparkles } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  
  // When authenticated, redirect to proper dashboard based on role
  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        // Get user role from Firestore
        try {
          const db = firebaseApp.firestore();
          const userDoc = await db.collection('users').doc(user.uid).get();
          
          if (userDoc.exists) {
            const userData = userDoc.data();
            if (userData?.role === 'teacher') {
              navigate('/faculty-dashboard');
            } else {
              navigate('/dashboard');
            }
          } else {
            // Default to student dashboard if role not found
            navigate('/dashboard');
          }
        } catch (error) {
          console.error("Error checking user role:", error);
          navigate('/dashboard'); // Default fallback
        }
      }
    });
    
    return () => unsubscribe();
  }, [navigate]);
  
  return (
    <div className="flex min-h-screen flex-col bg-background dark text-foreground antialiased">
      <div className="flex flex-1 items-center justify-center p-4 sm:p-8">
        <div className="mx-auto w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mx-auto flex h-20 w-20 items-center justify-center rounded-xl bg-accent/10 shadow-neo-flat"
            >
              <Sparkles className="h-10 w-10 text-accent" />
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
              <p className="text-muted-foreground">Sign in to continue your learning journey</p>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-xl bg-card p-6 shadow-neo-flat"
          >
            <SignInOrUpForm signInOptions={{ google: true }} />
            
            <div className="mt-4 text-center text-sm text-muted-foreground">
              <p>New to CurriQuest? <a href="/register" className="text-accent hover:underline">Create an account</a></p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center text-sm text-muted-foreground"
          >
            <p>By signing in, you agree to our <a href="#" className="text-accent hover:underline">Terms of Service</a> and <a href="#" className="text-accent hover:underline">Privacy Policy</a></p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};