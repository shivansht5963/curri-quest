import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Home, 
  LogOut, 
  MessageSquare, 
  User, 
  Settings, 
  Users, 
  BookOpen, 
  BarChart3, 
  Bell, 
  Search, 
  PlusCircle, 
  ChevronRight, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  ArrowUpRight,
  CalendarClock,
  ClipboardList,
  Video,
  Code,
  Edit,
  Trash2,
  SearchX
} from "lucide-react";
import { useUserGuardContext, firebaseAuth } from "app";
import { Leaderboard } from "components/Leaderboard";
import { TeachingMaterialEditor } from "components/TeachingMaterialEditor";
import { useFacultyStore, TeachingMaterial } from "../utils/store";

export default function FacultyDashboard() {
  const navigate = useNavigate();
  const { user } = useUserGuardContext();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Handle logout
  const handleLogout = async () => {
    try {
      await firebaseAuth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Get data from faculty store
  const { 
    students, 
    classAnalytics, 
    teachingMaterials, 
    assessments,
    addTeachingMaterial,
    updateTeachingMaterial,
    removeTeachingMaterial,
    setSelectedMaterial
  } = useFacultyStore();
  
  // State for managing materials
  const [materialFormVisible, setMaterialFormVisible] = useState(false);
  const [materialFormData, setMaterialFormData] = useState<Partial<TeachingMaterial>>({
    id: "",
    title: "",
    subject: "Mathematics",
    topic: "",
    type: "notes",
    content: "",
    tags: [],
    status: "draft",
    description: ""
  });
  const [materialSearch, setMaterialSearch] = useState("");
  const [editingMaterialId, setEditingMaterialId] = useState<string | null>(null);
  const [materialFilterSubject, setMaterialFilterSubject] = useState<string>("all");
  const [materialFilterType, setMaterialFilterType] = useState<string>("all");
  
  // Filtered materials based on search and filters
  const filteredMaterials = teachingMaterials.filter(material => {
    // Search filter
    const matchesSearch = materialSearch === "" || 
      material.title.toLowerCase().includes(materialSearch.toLowerCase()) ||
      material.description?.toLowerCase().includes(materialSearch.toLowerCase()) ||
      material.tags.some(tag => tag.toLowerCase().includes(materialSearch.toLowerCase()));
    
    // Subject filter
    const matchesSubject = materialFilterSubject === "all" || material.subject === materialFilterSubject;
    
    // Type filter
    const matchesType = materialFilterType === "all" || material.type === materialFilterType;
    
    return matchesSearch && matchesSubject && matchesType;
  });
  
  // Handle form submission for teaching materials
  const handleMaterialFormSubmit = (material: Partial<TeachingMaterial>) => {
    const now = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    
    if (editingMaterialId) {
      // Update existing material
      updateTeachingMaterial(editingMaterialId, {
        ...material,
        dateUpdated: now
      });
    } else {
      // Add new material
      const newMaterial: TeachingMaterial = {
        id: `m${Date.now()}`,
        title: material.title || "Untitled Material",
        subject: material.subject || "Mathematics",
        topic: material.topic || "General",
        type: material.type || "notes",
        content: material.content,
        fileUrl: material.fileUrl,
        dateCreated: now,
        dateUpdated: now,
        tags: material.tags || [],
        status: material.status || "draft",
        description: material.description || ""
      };
      
      addTeachingMaterial(newMaterial);
    }
    
    // Reset form
    setMaterialFormData({
      id: "",
      title: "",
      subject: "Mathematics",
      topic: "",
      type: "notes",
      content: "",
      tags: [],
      status: "draft",
      description: ""
    });
    setEditingMaterialId(null);
    setMaterialFormVisible(false);
  };
  
  // Edit material handler
  const handleEditMaterial = (material: TeachingMaterial) => {
    setMaterialFormData(material);
    setEditingMaterialId(material.id);
    setMaterialFormVisible(true);
  };
  
  // Delete material handler
  const handleDeleteMaterial = (id: string) => {
    if (window.confirm("Are you sure you want to delete this material? This action cannot be undone.")) {
      removeTeachingMaterial(id);
    }
  };

  // Reset form function
  const resetMaterialForm = () => {
    setMaterialFormData({
      id: "",
      title: "",
      subject: "Mathematics",
      topic: "",
      type: "notes",
      content: "",
      tags: [],
      status: "draft",
      description: ""
    });
    setEditingMaterialId(null);
    setMaterialFormVisible(false);
  };

  // Calculate class performance metrics
  const lowPerformingCount = students.filter(s => s.progress < 65).length;
  const highPerformingCount = students.filter(s => s.progress > 85).length;
  const mediumPerformingCount = students.length - lowPerformingCount - highPerformingCount;
  
  // Calculate attendance issues
  const attendanceIssuesCount = students.filter(s => s.attendance < 80).length;
  
  // Group teaching materials by subject for analytics
  const materialsBySubject = teachingMaterials.reduce((acc, material) => {
    acc[material.subject] = (acc[material.subject] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Group teaching materials by type for analytics
  const materialsByType = teachingMaterials.reduce((acc, material) => {
    acc[material.type] = (acc[material.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="flex flex-col min-h-screen bg-background dark text-foreground antialiased">
      <div className="flex flex-1">
        {/* Sidebar - Desktop */}
        <div className="hidden md:flex flex-col w-64 border-r border-border bg-card overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-lg bg-accent/20 text-accent flex items-center justify-center shadow-neo-inner mr-3">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-bold">CurriQuest</h2>
                <p className="text-xs text-muted-foreground">Faculty Portal</p>
              </div>
            </div>
            
            <nav className="space-y-2">
              <button 
                className="flex items-center space-x-3 rounded-lg px-3 py-2 w-full bg-accent/20 text-accent shadow-neo-inner"
              >
                <Home className="h-5 w-5" />
                <span>Dashboard</span>
              </button>
              
              <button 
                onClick={() => navigate("/VirtualAssistant")}
                className="flex items-center space-x-3 rounded-lg px-3 py-2 w-full text-muted-foreground hover:bg-muted transition-colors"
              >
                <MessageSquare className="h-5 w-5" />
                <span>Virtual Assistant</span>
              </button>
              
              <button className="flex items-center space-x-3 rounded-lg px-3 py-2 w-full text-muted-foreground hover:bg-muted transition-colors">
                <Users className="h-5 w-5" />
                <span>Students</span>
              </button>
              
              <button className="flex items-center space-x-3 rounded-lg px-3 py-2 w-full text-muted-foreground hover:bg-muted transition-colors">
                <BookOpen className="h-5 w-5" />
                <span>Teaching Materials</span>
              </button>
              
              <button className="flex items-center space-x-3 rounded-lg px-3 py-2 w-full text-muted-foreground hover:bg-muted transition-colors">
                <BarChart3 className="h-5 w-5" />
                <span>Analytics</span>
              </button>
              
              <button 
                onClick={() => navigate("/Settings")}
                className="flex items-center space-x-3 rounded-lg px-3 py-2 w-full text-muted-foreground hover:bg-muted transition-colors"
              >
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </button>
              
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-3 rounded-lg px-3 py-2 w-full text-muted-foreground hover:bg-muted transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto py-6 px-4 md:px-6 max-w-7xl">
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Welcome, {user?.displayName || 'Teacher'}</h1>
                <p className="text-muted-foreground mt-1">Faculty Dashboard - Standard X</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-accent" />
                </div>
                
                <div className="h-9 w-9 rounded-full bg-accent/20 text-accent flex items-center justify-center shadow-neo-inner">
                  <User className="h-5 w-5" />
                </div>
              </div>
            </header>

            {/* Dashboard Tabs */}
            <div className="flex border-b border-border mb-6 overflow-x-auto hide-scrollbar">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-4 py-2 font-medium text-sm ${activeTab === "overview" ? "border-b-2 border-accent text-accent" : "text-muted-foreground"}`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("students")}
                className={`px-4 py-2 font-medium text-sm ${activeTab === "students" ? "border-b-2 border-accent text-accent" : "text-muted-foreground"}`}
              >
                Students
              </button>
              <button
                onClick={() => setActiveTab("analytics")}
                className={`px-4 py-2 font-medium text-sm ${activeTab === "analytics" ? "border-b-2 border-accent text-accent" : "text-muted-foreground"}`}
              >
                Analytics
              </button>
              <button
                onClick={() => setActiveTab("materials")}
                className={`px-4 py-2 font-medium text-sm ${activeTab === "materials" ? "border-b-2 border-accent text-accent" : "text-muted-foreground"}`}
              >
                Materials
              </button>
              <button
                onClick={() => setActiveTab("assessments")}
                className={`px-4 py-2 font-medium text-sm ${activeTab === "assessments" ? "border-b-2 border-accent text-accent" : "text-muted-foreground"}`}
              >
                Assessments
              </button>
            </div>

            {/* Overview Tab Content */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Performance Leaderboard */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Leaderboard 
                    entries={students.map((student, index) => ({
                      id: student.id,
                      name: student.name,
                      rank: index + 1,
                      score: student.progress,
                      previousRank: index + (Math.random() > 0.7 ? Math.floor(Math.random() * 3) * (Math.random() > 0.5 ? 1 : -1) : 0),
                      subjects: student.areasOfConcern.length > 0 ? [
                        { name: student.areasOfConcern[0], score: Math.floor(Math.random() * 50) + 30 }
                      ] : undefined
                    }))}
                    title="Student Leaderboard"
                    showMovement={true}
                  />
                  {/* Quick Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-card rounded-xl shadow-neo-flat p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-muted-foreground">Students</p>
                        <h3 className="text-2xl font-bold mt-1">{students.length}</h3>
                      </div>
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-500 flex items-center justify-center shadow-neo-inner">
                        <Users className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">Standard X - Section A</div>
                  </div>
                  
                  <div className="bg-card rounded-xl shadow-neo-flat p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-muted-foreground">Average Progress</p>
                        <h3 className="text-2xl font-bold mt-1">{classAnalytics.averageProgress}%</h3>
                      </div>
                      <div className="w-10 h-10 rounded-lg bg-green-500/20 text-green-500 flex items-center justify-center shadow-neo-inner">
                        <BarChart3 className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-green-500">↑ 5% from last month</div>
                  </div>
                  
                  <div className="bg-card rounded-xl shadow-neo-flat p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-muted-foreground">Attendance Rate</p>
                        <h3 className="text-2xl font-bold mt-1">{classAnalytics.attendanceRate}%</h3>
                      </div>
                      <div className="w-10 h-10 rounded-lg bg-purple-500/20 text-purple-500 flex items-center justify-center shadow-neo-inner">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">{attendanceIssuesCount} student(s) below 80%</div>
                  </div>
                  
                  <div className="bg-card rounded-xl shadow-neo-flat p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-muted-foreground">Upcoming Assessments</p>
                        <h3 className="text-2xl font-bold mt-1">{classAnalytics.upcomingAssessments.length}</h3>
                      </div>
                      <div className="w-10 h-10 rounded-lg bg-orange-500/20 text-orange-500 flex items-center justify-center shadow-neo-inner">
                        <CalendarClock className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">Next: {classAnalytics.upcomingAssessments[0].title}</div>
                  </div>
                  </div>
                </div>
                
                {/* Student Performance Distribution */}
                <div className="bg-card rounded-xl shadow-neo-flat p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">Student Performance</h3>
                    <button className="text-sm text-accent flex items-center">
                      View All <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-red-500/20 to-red-500/5 rounded-lg p-4 shadow-neo-flat">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium text-red-500">Needs Attention</p>
                          <h4 className="text-2xl font-bold mt-1">{lowPerformingCount}</h4>
                          <p className="text-xs text-muted-foreground mt-1">Students below 65% progress</p>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-red-500/20 flex items-center justify-center shadow-neo-inner">
                          <AlertTriangle className="h-5 w-5 text-red-500" />
                        </div>
                      </div>
                      
                      {lowPerformingCount > 0 && (
                        <div className="mt-4">
                          <p className="text-xs font-medium mb-2">Students:</p>
                          <div className="space-y-2">
                            {students
                              .filter(s => s.progress < 65)
                              .map(student => (
                                <div key={student.id} className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <div className="h-6 w-6 rounded-full bg-card flex items-center justify-center mr-2 text-xs shadow-neo-inner">
                                      {student.name.charAt(0)}
                                    </div>
                                    <span className="text-xs">{student.name}</span>
                                  </div>
                                  <span className="text-xs font-medium">{student.progress}%</span>
                                </div>
                              ))
                            }
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 rounded-lg p-4 shadow-neo-flat">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium text-yellow-500">Making Progress</p>
                          <h4 className="text-2xl font-bold mt-1">{mediumPerformingCount}</h4>
                          <p className="text-xs text-muted-foreground mt-1">Students between 65-85% progress</p>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-yellow-500/20 flex items-center justify-center shadow-neo-inner">
                          <ArrowUpRight className="h-5 w-5 text-yellow-500" />
                        </div>
                      </div>
                      
                      {mediumPerformingCount > 0 && (
                        <div className="mt-4">
                          <p className="text-xs font-medium mb-2">Students:</p>
                          <div className="space-y-2">
                            {students
                              .filter(s => s.progress >= 65 && s.progress <= 85)
                              .map(student => (
                                <div key={student.id} className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <div className="h-6 w-6 rounded-full bg-card flex items-center justify-center mr-2 text-xs shadow-neo-inner">
                                      {student.name.charAt(0)}
                                    </div>
                                    <span className="text-xs">{student.name}</span>
                                  </div>
                                  <span className="text-xs font-medium">{student.progress}%</span>
                                </div>
                              ))
                            }
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="bg-gradient-to-br from-green-500/20 to-green-500/5 rounded-lg p-4 shadow-neo-flat">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium text-green-500">Excelling</p>
                          <h4 className="text-2xl font-bold mt-1">{highPerformingCount}</h4>
                          <p className="text-xs text-muted-foreground mt-1">Students above 85% progress</p>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center shadow-neo-inner">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        </div>
                      </div>
                      
                      {highPerformingCount > 0 && (
                        <div className="mt-4">
                          <p className="text-xs font-medium mb-2">Students:</p>
                          <div className="space-y-2">
                            {students
                              .filter(s => s.progress > 85)
                              .map(student => (
                                <div key={student.id} className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <div className="h-6 w-6 rounded-full bg-card flex items-center justify-center mr-2 text-xs shadow-neo-inner">
                                      {student.name.charAt(0)}
                                    </div>
                                    <span className="text-xs">{student.name}</span>
                                  </div>
                                  <span className="text-xs font-medium">{student.progress}%</span>
                                </div>
                              ))
                            }
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Bottom Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Areas of Concern */}
                  <div className="bg-card rounded-xl shadow-neo-flat p-6">
                    <h3 className="text-lg font-bold mb-4">Areas Needing Attention</h3>
                    <div className="space-y-4">
                      {classAnalytics.topicsTrouble.map((topic, index) => (
                        <div key={index} className="bg-secondary/10 rounded-lg p-3 shadow-neo-inner">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{topic}</span>
                            <button 
                              onClick={() => {
                                setMaterialFormData({
                                  ...materialFormData,
                                  topic,
                                  title: `Guide to ${topic}`,
                                  description: `Comprehensive guide to help students understand ${topic}`
                                });
                                setMaterialFormVisible(true);
                              }}
                              className="text-xs text-accent hover:underline"
                            >
                              Create Material
                            </button>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {Math.floor(40 + Math.random() * 25)}% of students struggle with this topic
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Recent Activity */}
                  <div className="bg-card rounded-xl shadow-neo-flat p-6">
                    <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                      {classAnalytics.recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-start">
                          <div className="h-10 w-10 rounded-lg flex items-center justify-center shadow-neo-inner mr-3">
                            {activity.type === "assessment" && <BarChart3 className="h-5 w-5 text-purple-500" />}
                            {activity.type === "material" && <BookOpen className="h-5 w-5 text-blue-500" />}
                            {activity.type === "progress" && <ArrowUpRight className="h-5 w-5 text-green-500" />}
                          </div>
                          <div>
                            <h4 className="font-medium">{activity.title}</h4>
                            <p className="text-xs text-muted-foreground">{activity.description}</p>
                            <div className="flex items-center mt-1">
                              <Clock className="h-3 w-3 text-muted-foreground mr-1" />
                              <span className="text-xs text-muted-foreground">{activity.time}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Students Tab Content */}
            {activeTab === "students" && (
              <div className="space-y-6">
                {/* Search and Add Student */}
                <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <input 
                      type="search" 
                      placeholder="Search students by name or ID..." 
                      className="h-10 w-full rounded-lg border border-input bg-card pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent shadow-neo-inner"
                    />
                  </div>
                  <button className="h-10 px-4 rounded-lg bg-accent/80 hover:bg-accent text-white font-medium shadow-neo-flat hover:shadow-neo-float transition-all flex items-center gap-2">
                    <PlusCircle className="h-4 w-4" />
                    Add Student
                  </button>
                </div>

                {/* Students List */}
                <div className="bg-card rounded-xl shadow-neo-flat overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left p-4 text-sm font-medium">Name</th>
                          <th className="text-left p-4 text-sm font-medium">Grade/Section</th>
                          <th className="text-left p-4 text-sm font-medium">Progress</th>
                          <th className="text-left p-4 text-sm font-medium">Attendance</th>
                          <th className="text-left p-4 text-sm font-medium">Areas of Concern</th>
                          <th className="text-left p-4 text-sm font-medium">Last Active</th>
                          <th className="text-left p-4 text-sm font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.map((student) => (
                          <tr key={student.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                            <td className="p-4">
                              <div className="flex items-center">
                                <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center mr-3 shadow-neo-inner">  
                                  {student.name.charAt(0)}
                                </div>
                                <div>
                                  <p className="font-medium">{student.name}</p>
                                  <p className="text-xs text-muted-foreground">ID: {student.id}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-4 text-sm">{student.grade}-{student.section}</td>
                            <td className="p-4">
                              <div className="flex items-center">
                                <div className="w-full max-w-[100px] h-2 bg-muted rounded-full overflow-hidden mr-2">
                                  <div 
                                    className={`h-full ${student.progress > 85 ? 'bg-green-500' : student.progress > 65 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                    style={{ width: `${student.progress}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm font-medium">{student.progress}%</span>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center">
                                <div className="w-full max-w-[100px] h-2 bg-muted rounded-full overflow-hidden mr-2">
                                  <div 
                                    className={`h-full ${student.attendance > 90 ? 'bg-green-500' : student.attendance > 80 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                    style={{ width: `${student.attendance}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm font-medium">{student.attendance}%</span>
                              </div>
                            </td>
                            <td className="p-4">
                              {student.areasOfConcern.length > 0 ? (
                                <div className="flex flex-wrap gap-1">
                                  {student.areasOfConcern.map((area, index) => (
                                    <span key={index} className="px-2 py-1 bg-red-500/10 text-red-500 text-xs rounded-full">
                                      {area}
                                    </span>
                                  ))}
                                </div>
                              ) : (
                                <span className="text-xs text-green-500">No concerns</span>
                              )}
                            </td>
                            <td className="p-4 text-sm text-muted-foreground">{student.lastActive}</td>
                            <td className="p-4">
                              <div className="flex space-x-2">
                                <button className="p-1 rounded-md hover:bg-muted transition-colors">
                                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                                </button>
                                <button className="p-1 rounded-md hover:bg-muted transition-colors">
                                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                                </button>
                                <button className="p-1 rounded-md hover:bg-muted transition-colors">
                                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            
            {/* Materials Tab Content */}
            {activeTab === "materials" && (
              <div className="space-y-6">
                {/* Search and Controls */}
                <div className="flex flex-col lg:flex-row justify-between gap-4 mb-4">
                  <div className="flex flex-col md:flex-row gap-4 flex-1">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                      <input 
                        type="search" 
                        placeholder="Search by title, description, or tags..." 
                        value={materialSearch}
                        onChange={(e) => setMaterialSearch(e.target.value)}
                        className="h-10 w-full rounded-lg border border-input bg-card pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent shadow-neo-inner"
                      />
                    </div>
                    <div className="flex gap-2">
                      <select 
                        value={materialFilterSubject}
                        onChange={(e) => setMaterialFilterSubject(e.target.value)}
                        className="h-10 rounded-lg border border-input bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent shadow-neo-inner"
                      >
                        <option value="all">All Subjects</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Science">Science</option>
                        <option value="Social Studies">Social Studies</option>
                        <option value="English">English</option>
                        <option value="Languages">Languages</option>
                      </select>
                      
                      <select 
                        value={materialFilterType}
                        onChange={(e) => setMaterialFilterType(e.target.value)}
                        className="h-10 rounded-lg border border-input bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent shadow-neo-inner"
                      >
                        <option value="all">All Types</option>
                        <option value="notes">Notes</option>
                        <option value="presentation">Presentations</option>
                        <option value="worksheet">Worksheets</option>
                        <option value="video">Videos</option>
                        <option value="interactive">Interactive</option>
                      </select>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => {
                      resetMaterialForm();
                      setMaterialFormVisible(true);
                    }}
                    className="h-10 px-4 rounded-lg bg-accent/80 hover:bg-accent text-white font-medium shadow-neo-flat hover:shadow-neo-float transition-all flex items-center gap-2"
                  >
                    <PlusCircle className="h-4 w-4" />
                    Add Material
                  </button>
                </div>
                
                {materialFormVisible && (
                  <TeachingMaterialEditor 
                    material={materialFormData}
                    onSave={handleMaterialFormSubmit}
                    onCancel={resetMaterialForm}
                    isEditing={!!editingMaterialId}
                  />
                )}
                
                {/* Materials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredMaterials.length > 0 ? (
                    filteredMaterials.map((material) => (
                      <div 
                        key={material.id} 
                        className="bg-card rounded-xl border border-border shadow-neo-flat hover:shadow-neo-float transition-all overflow-hidden flex flex-col"
                      >
                        <div className="p-5">
                          {/* Material Type Icon */}
                          <div className="flex justify-between items-start mb-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shadow-neo-inner
                              ${material.subject === 'Mathematics' ? 'bg-blue-500/20 text-blue-500' : 
                               material.subject === 'Science' ? 'bg-green-500/20 text-green-500' : 
                               material.subject === 'Social Studies' ? 'bg-yellow-500/20 text-yellow-500' : 
                               material.subject === 'English' ? 'bg-purple-500/20 text-purple-500' : 
                               'bg-accent/20 text-accent'}`}
                            >
                              {material.type === 'notes' && <BookOpen className="h-5 w-5" />}
                              {material.type === 'presentation' && <BarChart3 className="h-5 w-5" />}
                              {material.type === 'worksheet' && <ClipboardList className="h-5 w-5" />}
                              {material.type === 'video' && <Video className="h-5 w-5" />}
                              {material.type === 'interactive' && <Code className="h-5 w-5" />}
                            </div>
                            
                            <div>
                              <span className={`inline-block px-2 py-1 text-xs rounded-full 
                                ${material.status === 'published' ? 'bg-success/20 text-success' : 'bg-muted text-muted-foreground'}`}
                              >
                                {material.status === 'published' ? 'Published' : 'Draft'}
                              </span>
                            </div>
                          </div>
                          
                          {/* Title and Info */}
                          <h3 className="text-lg font-bold mb-1">{material.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{material.subject} • {material.topic}</p>
                          
                          {material.description && (
                            <p className="text-sm mb-3 line-clamp-2">{material.description}</p>
                          )}
                          
                          {/* Tags */}
                          {material.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-3">
                              {material.tags.map((tag, index) => (
                                <span 
                                  key={index} 
                                  className="px-2 py-0.5 bg-secondary/30 text-secondary-foreground text-xs rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                          
                          {/* Date Info */}
                          <div className="text-xs text-muted-foreground">
                            <span>Created: {material.dateCreated}</span>
                            {material.dateCreated !== material.dateUpdated && (
                              <span className="ml-2">• Updated: {material.dateUpdated}</span>
                            )}
                          </div>
                        </div>
                        
                        {/* Actions */}
                        <div className="mt-auto border-t border-border p-3 flex justify-between">
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => handleEditMaterial(material)}
                              className="p-2 rounded-lg hover:bg-muted transition-colors"
                              title="Edit"
                            >
                              <Edit className="h-4 w-4 text-muted-foreground" />
                            </button>
                            <button 
                              onClick={() => handleDeleteMaterial(material.id)}
                              className="p-2 rounded-lg hover:bg-destructive/10 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </button>
                          </div>
                          
                          <button 
                            onClick={() => setSelectedMaterial(material)}
                            className="flex items-center gap-1 p-2 rounded-lg hover:bg-secondary/20 transition-colors text-xs font-medium"
                          >
                            View Details
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                      <div className="w-16 h-16 mb-4 rounded-full bg-muted flex items-center justify-center shadow-neo-inner text-muted-foreground">
                        <SearchX className="h-8 w-8" />
                      </div>
                      <h3 className="text-lg font-medium mb-1">No teaching materials found</h3>
                      <p className="text-muted-foreground mb-4">
                        {materialSearch || materialFilterSubject !== "all" || materialFilterType !== "all" 
                          ? "Try changing your search terms or filters"
                          : "Get started by adding your first teaching material"}
                      </p>
                      {(materialSearch || materialFilterSubject !== "all" || materialFilterType !== "all") && (
                        <button
                          onClick={() => {
                            setMaterialSearch("");
                            setMaterialFilterSubject("all");
                            setMaterialFilterType("all");
                          }}
                          className="px-4 py-2 rounded-lg bg-secondary/20 hover:bg-secondary/30 text-sm font-medium transition-colors"
                        >
                          Clear Filters
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Navigation for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background md:hidden">
        <div className="grid grid-cols-5 h-16">
          <button onClick={() => navigate("/FacultyDashboard")} className="flex flex-col items-center justify-center gap-1 text-xs text-accent">
            <Home className="h-5 w-5" />
            <span>Dashboard</span>
          </button>
          <button onClick={() => navigate("/VirtualAssistant")} className="flex flex-col items-center justify-center gap-1 text-xs text-muted-foreground">
            <MessageSquare className="h-5 w-5" />
            <span>Assistant</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1 text-xs text-muted-foreground">
            <Users className="h-5 w-5" />
            <span>Students</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1 text-xs text-muted-foreground">
            <BookOpen className="h-5 w-5" />
            <span>Materials</span>
          </button>
          <button onClick={handleLogout} className="flex flex-col items-center justify-center gap-1 text-xs text-muted-foreground">
            <User className="h-5 w-5" />
            <span>Account</span>
          </button>
        </div>
      </div>
    </div>
  );
}