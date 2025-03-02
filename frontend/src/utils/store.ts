import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Student {
  id: string;
  name: string;
  grade: string;
  section: string;
  progress: number;
  lastActive: string;
  attendance: number;
  areasOfConcern: string[];
  strengths: string[];
}

export interface ClassAnalytics {
  averageProgress: number;
  attendanceRate: number;
  topicsTrouble: string[];
  topicsExcel: string[];
  upcomingAssessments: Assessment[];
  recentActivity: Activity[];
}

export interface Assessment {
  id: string;
  title: string;
  date: string;
  progress: number;
  description?: string;
  subject?: string;
  type?: string;
  status?: 'draft' | 'published' | 'completed';
  questions?: AssessmentQuestion[];
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  marks?: number;
}

export interface Activity {
  id: string;
  type: 'assessment' | 'material' | 'progress';
  title: string;
  time: string;
  description: string;
}

export interface TeachingMaterial {
  id: string;
  title: string;
  subject: string;
  topic: string;
  type: 'notes' | 'presentation' | 'worksheet' | 'video' | 'interactive';
  content?: string;
  fileUrl?: string;
  dateCreated: string;
  dateUpdated: string;
  tags: string[];
  status: 'draft' | 'published';
  description?: string;
}

export interface FacultyState {
  students: Student[];
  classAnalytics: ClassAnalytics;
  teachingMaterials: TeachingMaterial[];
  assessments: Assessment[];
  selectedStudent: Student | null;
  selectedMaterial: TeachingMaterial | null;
  
  // Actions
  addStudent: (student: Student) => void;
  updateStudent: (id: string, data: Partial<Student>) => void;
  removeStudent: (id: string) => void;
  setSelectedStudent: (student: Student | null) => void;
  
  addTeachingMaterial: (material: TeachingMaterial) => void;
  updateTeachingMaterial: (id: string, data: Partial<TeachingMaterial>) => void;
  removeTeachingMaterial: (id: string) => void;
  setSelectedMaterial: (material: TeachingMaterial | null) => void;
  
  addAssessment: (assessment: Assessment) => void;
  updateAssessment: (id: string, data: Partial<Assessment>) => void;
  removeAssessment: (id: string) => void;

  addActivity: (activity: Activity) => void;
}

// Sample student data
const initialStudents: Student[] = [
  { 
    id: "s1", 
    name: "Aditya Sharma", 
    grade: "10", 
    section: "A",
    progress: 78,
    lastActive: "2 hours ago",
    attendance: 92,
    areasOfConcern: ["Chemistry", "Trigonometry"],
    strengths: ["Algebra", "History"] 
  },
  { 
    id: "s2", 
    name: "Priya Patel", 
    grade: "10", 
    section: "A",
    progress: 65,
    lastActive: "1 day ago",
    attendance: 85,
    areasOfConcern: ["Geometry", "Physics"],
    strengths: ["Biology", "Literature"] 
  },
  { 
    id: "s3", 
    name: "Rahul Gupta", 
    grade: "10", 
    section: "A",
    progress: 92,
    lastActive: "3 hours ago",
    attendance: 95,
    areasOfConcern: [],
    strengths: ["Mathematics", "Science"] 
  },
  { 
    id: "s4", 
    name: "Sneha Desai", 
    grade: "10", 
    section: "A",
    progress: 42,
    lastActive: "5 days ago",
    attendance: 73,
    areasOfConcern: ["Algebra", "Physics", "Chemistry"],
    strengths: ["Geography", "History"] 
  },
  { 
    id: "s5", 
    name: "Vikram Singh", 
    grade: "10", 
    section: "A",
    progress: 85,
    lastActive: "1 hour ago",
    attendance: 98,
    areasOfConcern: ["Literature"],
    strengths: ["Mathematics", "Science", "Geography"] 
  },
];

// Sample class analytics
const initialClassAnalytics: ClassAnalytics = {
  averageProgress: 72,
  attendanceRate: 89,
  topicsTrouble: ["Chemical Reactions", "Trigonometric Ratios", "Linear Equations"],
  topicsExcel: ["Geometry", "Ancient History", "Physical Geography"],
  upcomingAssessments: [
    { id: "a1", title: "Mathematics Monthly Test", date: "Aug 10, 2023", progress: 25 },
    { id: "a2", title: "Science Project Submission", date: "Aug 15, 2023", progress: 40 },
    { id: "a3", title: "History Quiz", date: "Aug 18, 2023", progress: 10 },
  ],
  recentActivity: [
    { id: "r1", type: "assessment", title: "Grammar Quiz Results", time: "2 hours ago", description: "Class average: 76%" },
    { id: "r2", type: "material", title: "New Study Material Added", time: "1 day ago", description: "Chapter 5: Chemical Bonding" },
    { id: "r3", type: "progress", title: "Progress Reports Generated", time: "2 days ago", description: "Monthly progress for all students" },
  ]
};

// Sample teaching materials
const initialTeachingMaterials: TeachingMaterial[] = [
  {
    id: "m1",
    title: "Chemical Bonding Introduction",
    subject: "Science",
    topic: "Chemistry",
    type: "notes",
    content: "Chemical bonding is the process where atoms of elements combine together through different types of bonds. The main types are ionic, covalent, and metallic bonds.",
    dateCreated: "2023-07-15",
    dateUpdated: "2023-07-18",
    tags: ["chemistry", "bonding", "class10"],
    status: "published",
    description: "An introduction to different types of chemical bonds and their properties."
  },
  {
    id: "m2",
    title: "Trigonometric Functions Explained",
    subject: "Mathematics",
    topic: "Trigonometry",
    type: "presentation",
    fileUrl: "/assets/trigonometry-presentation.pdf",
    dateCreated: "2023-07-10",
    dateUpdated: "2023-07-10",
    tags: ["mathematics", "trigonometry", "functions"],
    status: "published",
    description: "Interactive presentation explaining all the basic trigonometric functions and their applications."
  },
  {
    id: "m3",
    title: "Linear Equations Worksheet",
    subject: "Mathematics",
    topic: "Algebra",
    type: "worksheet",
    fileUrl: "/assets/linear-equations-worksheet.pdf",
    dateCreated: "2023-06-28",
    dateUpdated: "2023-07-05",
    tags: ["mathematics", "algebra", "practice"],
    status: "published",
    description: "Practice worksheet with 20 problems on solving linear equations in one variable."
  },
  {
    id: "m4",
    title: "Motion and Forces - Video Lesson",
    subject: "Science",
    topic: "Physics",
    type: "video",
    fileUrl: "https://example.com/videos/motion-and-forces",
    dateCreated: "2023-07-12",
    dateUpdated: "2023-07-12",
    tags: ["physics", "forces", "motion", "newton's laws"],
    status: "published",
    description: "Video explaining the basic concepts of motion and forces, including Newton's laws of motion."
  },
  {
    id: "m5",
    title: "Indian Freedom Movement Timeline",
    subject: "Social Studies",
    topic: "History",
    type: "interactive",
    fileUrl: "/assets/freedom-movement-timeline.html",
    dateCreated: "2023-06-15",
    dateUpdated: "2023-07-02",
    tags: ["history", "india", "freedom movement", "timeline"],
    status: "published",
    description: "Interactive timeline of India's struggle for independence from 1857 to 1947."
  },
];

// Sample assessments
const initialAssessments: Assessment[] = [
  {
    id: "a1",
    title: "Mathematics Monthly Test",
    subject: "Mathematics",
    type: "Monthly Test",
    date: "Aug 10, 2023",
    progress: 25,
    status: "draft",
    description: "Monthly assessment covering algebraic expressions, linear equations, and coordinate geometry.",
    questions: [
      {
        id: "q1",
        question: "Solve for x: 3x + 7 = 22",
        options: ["x = 5", "x = 7", "x = 15", "x = 29/3"],
        correctAnswer: 0,
        explanation: "3x + 7 = 22\n3x = 22 - 7\n3x = 15\nx = 5",
        difficulty: "easy",
        marks: 2
      },
      {
        id: "q2",
        question: "What is the slope of the line passing through points (2,3) and (6,8)?",
        options: ["4/5", "5/4", "3/2", "5/2"],
        correctAnswer: 1,
        explanation: "Slope = (y₂ - y₁)/(x₂ - x₁) = (8 - 3)/(6 - 2) = 5/4",
        difficulty: "medium",
        marks: 3
      }
    ]
  },
  {
    id: "a2",
    title: "Science Project Submission",
    subject: "Science",
    type: "Project",
    date: "Aug 15, 2023",
    progress: 40,
    status: "published",
    description: "Research project on renewable energy sources and their applications."
  },
  {
    id: "a3",
    title: "History Quiz",
    subject: "Social Studies",
    type: "Quiz",
    date: "Aug 18, 2023",
    progress: 10,
    status: "draft",
    description: "Short quiz covering Indian history from 1857 to 1947."
  }
];

export const useFacultyStore = create<FacultyState>(
  persist(
    (set) => ({
      students: initialStudents,
      classAnalytics: initialClassAnalytics,
      teachingMaterials: initialTeachingMaterials,
      assessments: initialAssessments,
      selectedStudent: null,
      selectedMaterial: null,
      
      // Student actions
      addStudent: (student) => set((state) => ({ 
        students: [...state.students, student],
        classAnalytics: {
          ...state.classAnalytics,
          recentActivity: [
            {
              id: `act-${Date.now()}`,
              type: 'progress',
              title: 'New Student Added',
              time: 'Just now',
              description: `${student.name} has been added to class ${student.grade}-${student.section}`
            },
            ...state.classAnalytics.recentActivity
          ]
        }
      })),
      
      updateStudent: (id, data) => set((state) => ({
        students: state.students.map(student => 
          student.id === id ? { ...student, ...data } : student
        )
      })),
      
      removeStudent: (id) => set((state) => ({
        students: state.students.filter(student => student.id !== id),
        selectedStudent: state.selectedStudent?.id === id ? null : state.selectedStudent
      })),
      
      setSelectedStudent: (student) => set({ selectedStudent: student }),
      
      // Teaching material actions
      addTeachingMaterial: (material) => set((state) => ({
        teachingMaterials: [...state.teachingMaterials, material],
        classAnalytics: {
          ...state.classAnalytics,
          recentActivity: [
            {
              id: `act-${Date.now()}`,
              type: 'material',
              title: 'New Teaching Material',
              time: 'Just now',
              description: `${material.title} has been added to ${material.subject}`
            },
            ...state.classAnalytics.recentActivity
          ]
        }
      })),
      
      updateTeachingMaterial: (id, data) => set((state) => ({
        teachingMaterials: state.teachingMaterials.map(material => 
          material.id === id ? { ...material, ...data, dateUpdated: new Date().toISOString().split('T')[0] } : material
        )
      })),
      
      removeTeachingMaterial: (id) => set((state) => ({
        teachingMaterials: state.teachingMaterials.filter(material => material.id !== id),
        selectedMaterial: state.selectedMaterial?.id === id ? null : state.selectedMaterial
      })),
      
      setSelectedMaterial: (material) => set({ selectedMaterial: material }),
      
      // Assessment actions
      addAssessment: (assessment) => set((state) => ({
        assessments: [...state.assessments, assessment],
        classAnalytics: {
          ...state.classAnalytics,
          upcomingAssessments: [...state.classAnalytics.upcomingAssessments, {
            id: assessment.id,
            title: assessment.title,
            date: assessment.date,
            progress: 0
          }],
          recentActivity: [
            {
              id: `act-${Date.now()}`,
              type: 'assessment',
              title: 'New Assessment Created',
              time: 'Just now',
              description: `${assessment.title} scheduled for ${assessment.date}`
            },
            ...state.classAnalytics.recentActivity
          ]
        }
      })),
      
      updateAssessment: (id, data) => set((state) => ({
        assessments: state.assessments.map(assessment => 
          assessment.id === id ? { ...assessment, ...data } : assessment
        ),
        classAnalytics: {
          ...state.classAnalytics,
          upcomingAssessments: state.classAnalytics.upcomingAssessments.map(assessment => 
            assessment.id === id 
              ? { ...assessment, ...data } 
              : assessment
          )
        }
      })),
      
      removeAssessment: (id) => set((state) => ({
        assessments: state.assessments.filter(assessment => assessment.id !== id),
        classAnalytics: {
          ...state.classAnalytics,
          upcomingAssessments: state.classAnalytics.upcomingAssessments.filter(
            assessment => assessment.id !== id
          )
        }
      })),
      
      // Activity actions
      addActivity: (activity) => set((state) => ({
        classAnalytics: {
          ...state.classAnalytics,
          recentActivity: [
            activity,
            ...state.classAnalytics.recentActivity
          ]
        }
      })),
    }),
    {
      name: 'faculty-store',
    }
  )
);
