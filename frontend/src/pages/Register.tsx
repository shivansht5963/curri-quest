import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { firebaseApp } from "app";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  BookOpen,
  Mail,
  Lock,
  User,
  ChalkboardTeacher,
  GraduationCap,
  Loader2
} from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<"student" | "teacher" | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Student-specific fields
  const [school, setSchool] = useState("");
  const [grade, setGrade] = useState("10");
  const [division, setDivision] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [board, setBoard] = useState("Maharashtra State Board");
  const [parentName, setParentName] = useState("");
  const [parentContact, setParentContact] = useState("");
  
  // Teacher-specific fields
  const [qualification, setQualification] = useState("");
  const [experience, setExperience] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [subjectsArray, setSubjectsArray] = useState<string[]>([]);
  
  // Step management for multi-step form
  const [step, setStep] = useState(1);
  
  // Handle multiple subject selections
  const toggleSubject = (subject: string) => {
    if (subjectsArray.includes(subject)) {
      setSubjectsArray(subjectsArray.filter(s => s !== subject));
    } else {
      setSubjectsArray([...subjectsArray, subject]);
    }
  };

  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !fullName || !role) {
      toast.error("Please fill in all fields and select a role");
      return;
    }

    try {
      setLoading(true);
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update profile with display name
      await updateProfile(user, {
        displayName: fullName
      });

      // Create user document in Firestore with role-specific information
      if (role === "student") {
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: user.email,
          displayName: fullName,
          role: role,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          school: school,
          grade: grade,
          division: division,
          rollNumber: rollNumber,
          board: board,
          parentName: parentName,
          parentContact: parentContact,
          // Default subject progress will be added by the userStore when they first log in
        });
      } else if (role === "teacher") {
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: user.email,
          displayName: fullName,
          role: role,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          qualification: qualification,
          experience: experience,
          specialization: specialization,
          phoneNumber: phoneNumber,
          subjects: subjectsArray,
        });
      }

      toast.success("Registration successful!");
      
      // Redirect based on role
      if (role === "teacher") {
        navigate("/faculty-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error: any) {
      console.error("Error during registration:", error);
      toast.error(error.message || "Failed to register");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background dark text-foreground antialiased">
      <div className="flex flex-1">
        <div className="flex flex-col justify-center items-center w-full max-w-md mx-auto p-6">
          <div className="w-full">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <motion.div 
                  className="rounded-xl overflow-hidden bg-accent/10 w-16 h-16 flex items-center justify-center shadow-neo-flat"
                  whileHover={{ rotate: 5 }}
                >
                  <BookOpen className="h-8 w-8 text-accent" />
                </motion.div>
              </div>
              <h1 className="text-3xl font-bold mb-1">Create Account</h1>
              <p className="text-muted-foreground">Join CurriQuest to start learning</p>
            </div>

            <div className="space-y-6">
              {/* Role Selection */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <button
                  type="button"
                  onClick={() => setRole("student")}
                  className={`flex flex-col items-center p-4 rounded-lg ${role === "student" ? 'bg-accent/20 shadow-neo-inner' : 'bg-card shadow-neo-flat hover:shadow-neo-float'} transition-all`}
                >
                  <GraduationCap className={`h-8 w-8 mb-2 ${role === "student" ? 'text-accent' : 'text-muted-foreground'}`} />
                  <span className={`font-medium ${role === "student" ? 'text-accent' : 'text-muted-foreground'}`}>Student</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole("teacher")}
                  className={`flex flex-col items-center p-4 rounded-lg ${role === "teacher" ? 'bg-accent/20 shadow-neo-inner' : 'bg-card shadow-neo-flat hover:shadow-neo-float'} transition-all`}
                >
                  <ChalkboardTeacher className={`h-8 w-8 mb-2 ${role === "teacher" ? 'text-accent' : 'text-muted-foreground'}`} />
                  <span className={`font-medium ${role === "teacher" ? 'text-accent' : 'text-muted-foreground'}`}>Teacher</span>
                </button>
              </div>

              {/* Step 1: Basic Information */}
              {step === 1 && (
                <form className="space-y-4">
                  <div className="space-y-2">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <input
                        className="h-12 w-full rounded-lg border border-input bg-card pl-10 pr-4 py-3 text-sm shadow-neo-inner focus:outline-none focus:ring-2 focus:ring-accent"
                        id="name"
                        placeholder="Full Name"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <input
                        className="h-12 w-full rounded-lg border border-input bg-card pl-10 pr-4 py-3 text-sm shadow-neo-inner focus:outline-none focus:ring-2 focus:ring-accent"
                        id="email"
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <input
                        className="h-12 w-full rounded-lg border border-input bg-card pl-10 pr-4 py-3 text-sm shadow-neo-inner focus:outline-none focus:ring-2 focus:ring-accent"
                        id="password"
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <button
                    className="w-full py-3 mt-6 rounded-lg bg-accent/80 hover:bg-accent text-white font-medium shadow-neo-flat hover:shadow-neo-float transition-all flex items-center justify-center gap-2"
                    type="button"
                    disabled={!email || !password || !fullName || !role}
                    onClick={() => setStep(2)}
                  >
                    Continue
                  </button>
                </form>
              )}
              
              {/* Step 2: Role-Specific Information */}
              {step === 2 && role === "student" && (
                <form className="space-y-4">
                  <h3 className="text-lg font-semibold mb-3">Student Information</h3>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">School Name</label>
                    <input
                      className="h-12 w-full rounded-lg border border-input bg-card px-4 py-3 text-sm shadow-neo-inner focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="Enter your school name"
                      type="text"
                      value={school}
                      onChange={(e) => setSchool(e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Grade/Standard</label>
                      <select
                        className="h-12 w-full rounded-lg border border-input bg-card px-4 py-3 text-sm shadow-neo-inner focus:outline-none focus:ring-2 focus:ring-accent"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                      >
                        <option value="8">8th Std</option>
                        <option value="9">9th Std</option>
                        <option value="10">10th Std</option>
                        <option value="11">11th Std</option>
                        <option value="12">12th Std</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Division</label>
                      <input
                        className="h-12 w-full rounded-lg border border-input bg-card px-4 py-3 text-sm shadow-neo-inner focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="A, B, C, etc."
                        type="text"
                        value={division}
                        onChange={(e) => setDivision(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Roll Number</label>
                    <input
                      className="h-12 w-full rounded-lg border border-input bg-card px-4 py-3 text-sm shadow-neo-inner focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="Enter your roll number"
                      type="text"
                      value={rollNumber}
                      onChange={(e) => setRollNumber(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Education Board</label>
                    <select
                      className="h-12 w-full rounded-lg border border-input bg-card px-4 py-3 text-sm shadow-neo-inner focus:outline-none focus:ring-2 focus:ring-accent"
                      value={board}
                      onChange={(e) => setBoard(e.target.value)}
                    >
                      <option value="Maharashtra State Board">Maharashtra State Board</option>
                      <option value="CBSE">CBSE</option>
                      <option value="ICSE">ICSE</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Parent/Guardian Name</label>
                    <input
                      className="h-12 w-full rounded-lg border border-input bg-card px-4 py-3 text-sm shadow-neo-inner focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="Enter parent/guardian name"
                      type="text"
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Parent/Guardian Contact</label>
                    <input
                      className="h-12 w-full rounded-lg border border-input bg-card px-4 py-3 text-sm shadow-neo-inner focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="Enter parent/guardian phone number"
                      type="tel"
                      value={parentContact}
                      onChange={(e) => setParentContact(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex gap-3 mt-4">
                    <button
                      className="flex-1 py-3 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground font-medium shadow-neo-flat hover:shadow-neo-float transition-all"
                      type="button"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </button>
                    
                    <button
                      className="flex-1 py-3 rounded-lg bg-accent/80 hover:bg-accent text-white font-medium shadow-neo-flat hover:shadow-neo-float transition-all"
                      type="button"
                      onClick={handleSubmit}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin mr-2" />
                          Creating Account...
                        </>
                      ) : (
                        "Create Account"
                      )}
                    </button>
                  </div>
                </form>
              )}
              
              {/* Teacher Registration Form */}
              {step === 2 && role === "teacher" && (
                <form className="space-y-4">
                  <h3 className="text-lg font-semibold mb-3">Teacher Information</h3>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Qualification</label>
                    <input
                      className="h-12 w-full rounded-lg border border-input bg-card px-4 py-3 text-sm shadow-neo-inner focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="E.g., B.Ed, M.Sc., etc."
                      type="text"
                      value={qualification}
                      onChange={(e) => setQualification(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Years of Experience</label>
                    <input
                      className="h-12 w-full rounded-lg border border-input bg-card px-4 py-3 text-sm shadow-neo-inner focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="Enter years of teaching experience"
                      type="number"
                      min="0"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Phone Number</label>
                    <input
                      className="h-12 w-full rounded-lg border border-input bg-card px-4 py-3 text-sm shadow-neo-inner focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="Enter your phone number"
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Specialization</label>
                    <input
                      className="h-12 w-full rounded-lg border border-input bg-card px-4 py-3 text-sm shadow-neo-inner focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="Your subject specialization"
                      type="text"
                      value={specialization}
                      onChange={(e) => setSpecialization(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Subjects You Teach</label>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      {[
                        "Mathematics", 
                        "Science", 
                        "English", 
                        "Hindi", 
                        "Marathi", 
                        "Social Studies"
                      ].map((subject) => (
                        <div 
                          key={subject}
                          onClick={() => toggleSubject(subject)}
                          className={`cursor-pointer rounded-lg p-3 text-sm flex items-center gap-2 transition-all ${subjectsArray.includes(subject) ? 'bg-accent/20 shadow-neo-inner' : 'bg-card shadow-neo-flat hover:shadow-neo-float'}`}
                        >
                          <div className={`w-4 h-4 rounded border ${subjectsArray.includes(subject) ? 'bg-accent border-accent flex items-center justify-center' : 'border-muted-foreground'}`}>
                            {subjectsArray.includes(subject) && <span className="text-xs text-white">✓</span>}
                          </div>
                          <span>{subject}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-3 mt-4">
                    <button
                      className="flex-1 py-3 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground font-medium shadow-neo-flat hover:shadow-neo-float transition-all"
                      type="button"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </button>
                    
                    <button
                      className="flex-1 py-3 rounded-lg bg-accent/80 hover:bg-accent text-white font-medium shadow-neo-flat hover:shadow-neo-float transition-all"
                      type="button"
                      onClick={handleSubmit}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin mr-2" />
                          Creating Account...
                        </>
                      ) : (
                        "Create Account"
                      )}
                    </button>
                  </div>
                </form>
              )}
              
              {/* Regular form for reference - will be removed */}
              <form onSubmit={handleSubmit} className="hidden space-y-4">
                <div className="space-y-2">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      className="h-12 w-full rounded-lg border border-input bg-card pl-10 pr-4 py-3 text-sm shadow-neo-inner focus:outline-none focus:ring-2 focus:ring-accent"
                      id="name"
                      placeholder="Full Name"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      className="h-12 w-full rounded-lg border border-input bg-card pl-10 pr-4 py-3 text-sm shadow-neo-inner focus:outline-none focus:ring-2 focus:ring-accent"
                      id="email"
                      placeholder="Email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <input
                      className="h-12 w-full rounded-lg border border-input bg-card pl-10 pr-4 py-3 text-sm shadow-neo-inner focus:outline-none focus:ring-2 focus:ring-accent"
                      id="password"
                      placeholder="Password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  className="w-full py-3 mt-6 rounded-lg bg-accent/80 hover:bg-accent text-white font-medium shadow-neo-flat hover:shadow-neo-float transition-all flex items-center justify-center gap-2"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link to="/Login" className="text-accent hover:underline">
                    Log in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Side Panel (hidden on mobile) */}
        <div className="hidden lg:block lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-accent/20 to-transparent">
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-12">
            <div className="max-w-lg text-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold mb-4">Welcome to CurriQuest</h2>
                <p className="text-xl mb-6">
                  Your interactive learning journey begins here. 
                  <span className="block mt-2">Explore, learn, and excel with our engaging curriculum.</span>
                </p>
              </motion.div>
              
              <div className="grid grid-cols-2 gap-4 mt-8">
                <motion.div 
                  className="p-4 rounded-xl bg-accent/10 shadow-neo-flat"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h3 className="font-bold mb-2">Interactive Learning</h3>
                  <p className="text-sm">Engage with our interactive content to master concepts quickly.</p>
                </motion.div>
                <motion.div 
                  className="p-4 rounded-xl bg-accent/10 shadow-neo-flat"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <h3 className="font-bold mb-2">Virtual Assistance</h3>
                  <p className="text-sm">Get help anytime with our AI-powered virtual assistant.</p>
                </motion.div>
                <motion.div 
                  className="p-4 rounded-xl bg-accent/10 shadow-neo-flat"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <h3 className="font-bold mb-2">Progress Tracking</h3>
                  <p className="text-sm">Monitor your learning journey with detailed progress reports.</p>
                </motion.div>
                <motion.div 
                  className="p-4 rounded-xl bg-accent/10 shadow-neo-flat"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <h3 className="font-bold mb-2">Maharashtra Board</h3>
                  <p className="text-sm">Content aligned with the Maharashtra State Board curriculum.</p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}