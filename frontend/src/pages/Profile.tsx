import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserGuardContext } from "app";
import { useUserStore } from "../utils/userStore";
import { motion } from "framer-motion";
import {
  User,
  School,
  BookOpen,
  Calendar,
  Clock,
  Phone,
  Mail,
  Home,
  Users,
  ChevronLeft,
  Save,
  Loader2,
  Pencil,
  X,
  Calendar as CalendarIcon,
  Triangle,
  Hexagon,
  BookText,
  CircleDot,
  Globe,
  Youtube
} from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();
  const { user } = useUserGuardContext();
  const { profile, initializeProfile, updateProfile, isLoading } = useUserStore();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: "",
    school: "",
    grade: "",
    division: "",
    board: "",
    phoneNumber: "",
    address: "",
    parentName: "",
    parentContact: "",
    admissionNumber: "",
    rollNumber: ""
  });
  
  // Initialize user profile when component mounts
  useEffect(() => {
    if (user) {
      initializeProfile(user.uid);
    }
  }, [user, initializeProfile]);
  
  // Update form data when profile changes
  useEffect(() => {
    if (profile) {
      setFormData({
        displayName: profile.displayName || "",
        school: profile.school || "",
        grade: profile.grade || "",
        division: profile.division || "",
        board: profile.board || "",
        phoneNumber: profile.phoneNumber || "",
        address: profile.address || "",
        parentName: profile.parentName || "",
        parentContact: profile.parentContact || "",
        admissionNumber: profile.admissionNumber || "",
        rollNumber: profile.rollNumber || ""
      });
    }
  }, [profile]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile(formData);
    setIsEditing(false);
  };
  
  // Generate a placeholder avatar if no photoURL
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };
  
  // Map subject icon names to actual components
  const getSubjectIcon = (iconName: string) => {
    switch(iconName) {
      case 'Triangle': return Triangle;
      case 'Hexagon': return Hexagon;
      case 'BookText': return BookText;
      case 'CircleDot': return CircleDot;
      case 'Globe': return Globe;
      default: return BookOpen;
    }
  };
  
  if (!profile && isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
        <span className="ml-2">Loading profile...</span>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-background dark text-foreground antialiased">
      {/* Mobile Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="mr-4 flex items-center gap-1 text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            Dashboard
          </button>
          <h1 className="flex-1 text-lg font-semibold">Profile</h1>
          {isEditing ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="flex h-9 items-center justify-center rounded-md bg-destructive/10 px-3 text-destructive hover:bg-destructive/20"
              >
                <X className="mr-1 h-4 w-4" />
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex h-9 items-center justify-center rounded-md bg-accent/80 px-3 text-white hover:bg-accent"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-1 h-4 w-4" />
                    Save
                  </>
                )}
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex h-9 items-center justify-center rounded-md bg-accent/10 px-3 text-accent hover:bg-accent/20"
            >
              <Pencil className="mr-1 h-4 w-4" />
              Edit
            </button>
          )}
        </div>
      </header>
      
      <main className="flex-1 pb-16">
        <div className="container mx-auto py-6 px-4 md:px-6 space-y-8">
          {/* Profile Header */}
          <section className="mb-6">
            <div className="rounded-xl bg-card p-6 shadow-neo-flat overflow-hidden relative">
              <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-accent/30 to-accent-secondary/30"></div>
              
              <div className="relative flex flex-col md:flex-row items-center gap-4 md:gap-6 pt-12">
                {/* Avatar */}
                <div className="relative">
                  {profile?.photoURL ? (
                    <img 
                      src={profile.photoURL} 
                      alt={profile.displayName} 
                      className="h-24 w-24 rounded-full border-4 border-background shadow-neo-flat"
                    />
                  ) : (
                    <div className="h-24 w-24 rounded-full bg-accent/10 flex items-center justify-center shadow-neo-flat border-4 border-background">
                      <span className="text-2xl font-bold text-accent">
                        {getInitials(profile?.displayName || 'Student')}
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Profile Info */}
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl font-bold">{profile?.displayName}</h2>
                  <p className="text-muted-foreground">{profile?.email}</p>
                  <div className="flex flex-wrap gap-3 mt-3 justify-center md:justify-start">
                    <span className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                      <School className="mr-1 h-3 w-3" />
                      {profile?.school || 'Student'}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-secondary/10 px-3 py-1 text-xs font-medium text-secondary-foreground">
                      <Users className="mr-1 h-3 w-3" />
                      Class {profile?.grade}-{profile?.division}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary-foreground">
                      <BookOpen className="mr-1 h-3 w-3" />
                      {profile?.board}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {isEditing ? (
            /* Edit Form */
            <section className="mb-6">
              <div className="rounded-xl bg-card p-6 shadow-neo-flat">
                <h3 className="text-xl font-bold mb-4">Edit Profile</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full Name</label>
                      <input 
                        type="text" 
                        name="displayName" 
                        value={formData.displayName} 
                        onChange={handleChange}
                        className="h-10 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm shadow-neo-inner focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">School Name</label>
                      <input 
                        type="text" 
                        name="school" 
                        value={formData.school} 
                        onChange={handleChange}
                        className="h-10 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm shadow-neo-inner focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Grade/Standard</label>
                      <input 
                        type="text" 
                        name="grade" 
                        value={formData.grade} 
                        onChange={handleChange}
                        className="h-10 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm shadow-neo-inner focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Division/Section</label>
                      <input 
                        type="text" 
                        name="division" 
                        value={formData.division} 
                        onChange={handleChange}
                        className="h-10 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm shadow-neo-inner focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Education Board</label>
                      <input 
                        type="text" 
                        name="board" 
                        value={formData.board} 
                        onChange={handleChange}
                        className="h-10 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm shadow-neo-inner focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Phone Number</label>
                      <input 
                        type="text" 
                        name="phoneNumber" 
                        value={formData.phoneNumber} 
                        onChange={handleChange}
                        className="h-10 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm shadow-neo-inner focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium">Address</label>
                      <input 
                        type="text" 
                        name="address" 
                        value={formData.address} 
                        onChange={handleChange}
                        className="h-10 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm shadow-neo-inner focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Parent/Guardian Name</label>
                      <input 
                        type="text" 
                        name="parentName" 
                        value={formData.parentName} 
                        onChange={handleChange}
                        className="h-10 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm shadow-neo-inner focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Parent/Guardian Contact</label>
                      <input 
                        type="text" 
                        name="parentContact" 
                        value={formData.parentContact} 
                        onChange={handleChange}
                        className="h-10 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm shadow-neo-inner focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Admission Number</label>
                      <input 
                        type="text" 
                        name="admissionNumber" 
                        value={formData.admissionNumber} 
                        onChange={handleChange}
                        className="h-10 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm shadow-neo-inner focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Roll Number</label>
                      <input 
                        type="text" 
                        name="rollNumber" 
                        value={formData.rollNumber} 
                        onChange={handleChange}
                        className="h-10 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm shadow-neo-inner focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </section>
          ) : (
            /* View Mode Sections */
            <>
              {/* Personal Info */}
              <section className="mb-6">
                <div className="rounded-xl bg-card p-6 shadow-neo-flat">
                  <h3 className="text-xl font-bold mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="flex items-start">
                      <Phone className="mt-0.5 mr-2 h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Phone Number</p>
                        <p className="text-muted-foreground">{profile?.phoneNumber || 'Not provided'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Mail className="mt-0.5 mr-2 h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Email</p>
                        <p className="text-muted-foreground">{profile?.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Home className="mt-0.5 mr-2 h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Address</p>
                        <p className="text-muted-foreground">{profile?.address || 'Not provided'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Users className="mt-0.5 mr-2 h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Parent/Guardian</p>
                        <p className="text-muted-foreground">{profile?.parentName || 'Not provided'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Phone className="mt-0.5 mr-2 h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Parent Contact</p>
                        <p className="text-muted-foreground">{profile?.parentContact || 'Not provided'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Academic Info */}
              <section className="mb-6">
                <div className="rounded-xl bg-card p-6 shadow-neo-flat">
                  <h3 className="text-xl font-bold mb-4">Academic Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="flex items-start">
                      <School className="mt-0.5 mr-2 h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">School</p>
                        <p className="text-muted-foreground">{profile?.school || 'Not provided'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <BookOpen className="mt-0.5 mr-2 h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Grade/Division</p>
                        <p className="text-muted-foreground">{profile?.grade || '10'}-{profile?.division || 'A'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <User className="mt-0.5 mr-2 h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Roll Number</p>
                        <p className="text-muted-foreground">{profile?.rollNumber || 'Not provided'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Calendar className="mt-0.5 mr-2 h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Admission Number</p>
                        <p className="text-muted-foreground">{profile?.admissionNumber || 'Not provided'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Subject Progress */}
              <section className="mb-6">
                <div className="rounded-xl bg-card p-6 shadow-neo-flat">
                  <h3 className="text-xl font-bold mb-4">Subject Progress</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {profile?.subjects?.map((subject) => {
                      const IconComponent = getSubjectIcon(subject.icon);
                      return (
                        <div key={subject.id} className="flex flex-col rounded-lg bg-card p-4 shadow-neo-flat hover:shadow-neo-float transition-all">
                          <div className="flex items-center mb-3">
                            <div className={`h-10 w-10 rounded-lg bg-[hsl(var(${subject.colorVar}))/20] flex items-center justify-center mr-3 shadow-neo-inner`}>
                              <IconComponent className={`h-5 w-5 text-[hsl(var(${subject.colorVar}))]`} />
                            </div>
                            <div>
                              <h4 className="font-bold">{subject.name}</h4>
                              <div className="flex items-center text-xs text-muted-foreground">
                                <Clock className="mr-1 h-3 w-3" />
                                Last activity: {subject.lastActivity ? new Date(subject.lastActivity).toLocaleDateString() : 'Never'}
                              </div>
                            </div>
                          </div>
                          
                          <div className="w-full h-2 rounded-full bg-muted mb-2 overflow-hidden">
                            <div 
                              className={`h-full bg-[hsl(var(${subject.colorVar}))]`}
                              style={{ width: `${subject.progress}%` }}
                            ></div>
                          </div>
                          
                          <div className="flex justify-between items-center mt-1 text-xs">
                            <span className="text-muted-foreground">{subject.progress}% complete</span>
                            <span className="text-muted-foreground">{subject.completedTopics}/{subject.totalTopics} topics</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>
              
              {/* Learning Resources */}
              <section className="mb-6">
                <div className="rounded-xl bg-card p-6 shadow-neo-flat">
                  <h3 className="text-xl font-bold mb-4">Recommended Learning Resources</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-lg overflow-hidden shadow-neo-flat hover:shadow-neo-float transition-all">
                      <div className="relative pb-[56.25%] bg-muted">
                        <iframe 
                          className="absolute top-0 left-0 w-full h-full"
                          src="https://www.youtube.com/embed/IiKUa6s-F-Y?rel=0"
                          title="Maharashtra Board Class 10 Math Lectures"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                      <div className="p-3 bg-card">
                        <div className="flex items-center gap-2 mb-1">
                          <Youtube className="h-4 w-4 text-red-500" />
                          <span className="text-xs text-muted-foreground">Math Lectures</span>
                        </div>
                        <h4 className="font-bold text-sm">Maharashtra Board Class 10 - Algebra</h4>
                      </div>
                    </div>
                    
                    <div className="rounded-lg overflow-hidden shadow-neo-flat hover:shadow-neo-float transition-all">
                      <div className="relative pb-[56.25%] bg-muted">
                        <iframe 
                          className="absolute top-0 left-0 w-full h-full"
                          src="https://www.youtube.com/embed/D4cMQTw9M1U?rel=0"
                          title="Maharashtra Board Class 10 Science Lectures"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                      <div className="p-3 bg-card">
                        <div className="flex items-center gap-2 mb-1">
                          <Youtube className="h-4 w-4 text-red-500" />
                          <span className="text-xs text-muted-foreground">Science Lectures</span>
                        </div>
                        <h4 className="font-bold text-sm">Maharashtra Board Class 10 - Science Chapter 1</h4>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <a 
                      href="https://www.youtube.com/results?search_query=maharashtra+board+class+10+lectures" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-accent hover:underline inline-flex items-center gap-1"
                    >
                      <Youtube className="h-4 w-4" />
                      Explore more learning resources
                    </a>
                  </div>
                </div>
              </section>
              
              {/* Weekly Schedule */}
              <section className="mb-6">
                <div className="rounded-xl bg-card p-6 shadow-neo-flat">
                  <h3 className="text-xl font-bold mb-4">Weekly Schedule</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="pb-2 text-left font-medium text-muted-foreground">Day</th>
                          <th className="pb-2 text-left font-medium text-muted-foreground">Period 1</th>
                          <th className="pb-2 text-left font-medium text-muted-foreground">Period 2</th>
                          <th className="pb-2 text-left font-medium text-muted-foreground">Period 3</th>
                          <th className="pb-2 text-left font-medium text-muted-foreground">Period 4</th>
                          <th className="pb-2 text-left font-medium text-muted-foreground">Period 5</th>
                          <th className="pb-2 text-left font-medium text-muted-foreground">Period 6</th>
                        </tr>
                      </thead>
                      <tbody>
                        {profile?.weeklySchedule ? (
                          <>
                            <tr className="border-b border-border/50">
                              <td className="py-3 font-medium">Monday</td>
                              {profile.weeklySchedule.monday.periods.map((period) => (
                                <td key={period.id} className="py-3">
                                  <div className="text-sm">{period.subject}</div>
                                  <div className="text-xs text-muted-foreground">{period.startTime}-{period.endTime}</div>
                                </td>
                              ))}
                            </tr>
                            <tr className="border-b border-border/50">
                              <td className="py-3 font-medium">Tuesday</td>
                              {profile.weeklySchedule.tuesday.periods.map((period) => (
                                <td key={period.id} className="py-3">
                                  <div className="text-sm">{period.subject}</div>
                                  <div className="text-xs text-muted-foreground">{period.startTime}-{period.endTime}</div>
                                </td>
                              ))}
                            </tr>
                            <tr className="border-b border-border/50">
                              <td className="py-3 font-medium">Wednesday</td>
                              {profile.weeklySchedule.wednesday.periods.map((period) => (
                                <td key={period.id} className="py-3">
                                  <div className="text-sm">{period.subject}</div>
                                  <div className="text-xs text-muted-foreground">{period.startTime}-{period.endTime}</div>
                                </td>
                              ))}
                            </tr>
                            <tr className="border-b border-border/50">
                              <td className="py-3 font-medium">Thursday</td>
                              {profile.weeklySchedule.thursday.periods.map((period) => (
                                <td key={period.id} className="py-3">
                                  <div className="text-sm">{period.subject}</div>
                                  <div className="text-xs text-muted-foreground">{period.startTime}-{period.endTime}</div>
                                </td>
                              ))}
                            </tr>
                            <tr className="border-b border-border/50">
                              <td className="py-3 font-medium">Friday</td>
                              {profile.weeklySchedule.friday.periods.map((period) => (
                                <td key={period.id} className="py-3">
                                  <div className="text-sm">{period.subject}</div>
                                  <div className="text-xs text-muted-foreground">{period.startTime}-{period.endTime}</div>
                                </td>
                              ))}
                            </tr>
                            <tr>
                              <td className="py-3 font-medium">Saturday</td>
                              {profile.weeklySchedule.saturday.periods.map((period, i) => (
                                <td key={period.id} className="py-3">
                                  <div className="text-sm">{period.subject}</div>
                                  <div className="text-xs text-muted-foreground">{period.startTime}-{period.endTime}</div>
                                </td>
                              ))}
                              {/* Fill remaining cells for Saturday if needed */}
                              {profile.weeklySchedule.saturday.periods.length < 6 && 
                                Array(6 - profile.weeklySchedule.saturday.periods.length).fill(0).map((_, i) => (
                                  <td key={`empty-${i}`} className="py-3">
                                    <div className="text-sm text-muted-foreground">-</div>
                                  </td>
                                ))
                              }
                            </tr>
                          </>
                        ) : (
                          <tr>
                            <td colSpan={7} className="py-4 text-center text-muted-foreground">
                              Schedule not available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            </>
          )}
        </div>
      </main>
      
      {/* Mobile Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background md:hidden">
        <div className="grid grid-cols-5 h-16">
          <button onClick={() => navigate("/Dashboard")} className="flex flex-col items-center justify-center gap-1 text-xs text-muted-foreground">
            <Home className="h-5 w-5" />
            <span>Dashboard</span>
          </button>
          <button onClick={() => navigate("/Curriculum")} className="flex flex-col items-center justify-center gap-1 text-xs text-muted-foreground">
            <BookOpen className="h-5 w-5" />
            <span>Curriculum</span>
          </button>
          <button onClick={() => navigate("/Quiz")} className="flex flex-col items-center justify-center gap-1 text-xs text-muted-foreground">
            <CalendarIcon className="h-5 w-5" />
            <span>Quizzes</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1 text-xs text-accent">
            <User className="h-5 w-5" />
            <span>Profile</span>
          </button>
          <button onClick={() => navigate("/Logout")} className="flex flex-col items-center justify-center gap-1 text-xs text-muted-foreground">
            <X className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}