import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { doc, getDoc, setDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

import { firebaseApp } from 'app';

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  role: 'student' | 'teacher';
  school?: string;
  grade?: string;
  division?: string;
  board?: string;
  subjects?: Subject[];
  weeklySchedule?: WeeklySchedule;
  createdAt: string;
  updatedAt: string;
  photoURL?: string;
  phoneNumber?: string;
  address?: string;
  parentName?: string;
  parentContact?: string;
  admissionNumber?: string;
  rollNumber?: string;
}

export interface Subject {
  id: string;
  name: string;
  teacher?: string;
  progress: number;
  lastActivity?: string;
  colorVar: string;
  icon: string;
  totalTopics: number;
  completedTopics: number;
}

export interface WeeklySchedule {
  monday: ScheduleDay;
  tuesday: ScheduleDay;
  wednesday: ScheduleDay;
  thursday: ScheduleDay;
  friday: ScheduleDay;
  saturday: ScheduleDay;
}

export interface ScheduleDay {
  periods: SchedulePeriod[];
}

export interface SchedulePeriod {
  id: string;
  subject: string;
  startTime: string;
  endTime: string;
  teacher?: string;
  room?: string;
}

export interface UserState {
  profile: UserProfile | null;
  isLoading: boolean;
  error: Error | null;
  initialized: boolean;
  
  // Actions
  initializeProfile: (userId: string) => void;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  updateSubjectProgress: (subjectId: string, progress: number) => Promise<void>;
}

// Default subjects for Maharashtra Board Std X
const defaultSubjects: Subject[] = [
  { 
    id: 'math', 
    name: 'Mathematics', 
    progress: 0, 
    colorVar: '--math-color', 
    icon: 'Triangle',
    totalTopics: 12,
    completedTopics: 0
  },
  { 
    id: 'science', 
    name: 'Science', 
    progress: 0, 
    colorVar: '--science-color', 
    icon: 'Hexagon',
    totalTopics: 18,
    completedTopics: 0
  },
  { 
    id: 'english', 
    name: 'English', 
    progress: 0, 
    colorVar: '--language-color', 
    icon: 'CircleDot',
    totalTopics: 10,
    completedTopics: 0
  },
  { 
    id: 'hindi', 
    name: 'Hindi', 
    progress: 0, 
    colorVar: '--language-color', 
    icon: 'CircleDot',
    totalTopics: 8,
    completedTopics: 0
  },
  { 
    id: 'marathi', 
    name: 'Marathi', 
    progress: 0, 
    colorVar: '--language-color', 
    icon: 'CircleDot',
    totalTopics: 8,
    completedTopics: 0
  },
  { 
    id: 'socialstudies', 
    name: 'Social Studies', 
    progress: 0, 
    colorVar: '--history-color', 
    icon: 'BookText',
    totalTopics: 15,
    completedTopics: 0
  },
];

// Default weekly schedule
const defaultWeeklySchedule: WeeklySchedule = {
  monday: {
    periods: [
      { id: 'mon1', subject: 'Mathematics', startTime: '08:00', endTime: '08:45', room: '10A' },
      { id: 'mon2', subject: 'Science', startTime: '08:50', endTime: '09:35', room: 'Lab 2' },
      { id: 'mon3', subject: 'English', startTime: '09:40', endTime: '10:25', room: '10A' },
      { id: 'mon4', subject: 'Hindi', startTime: '10:45', endTime: '11:30', room: '10A' },
      { id: 'mon5', subject: 'Social Studies', startTime: '11:35', endTime: '12:20', room: '10A' },
      { id: 'mon6', subject: 'Marathi', startTime: '12:25', endTime: '13:10', room: '10A' },
    ]
  },
  tuesday: {
    periods: [
      { id: 'tue1', subject: 'Science', startTime: '08:00', endTime: '08:45', room: 'Lab 1' },
      { id: 'tue2', subject: 'Mathematics', startTime: '08:50', endTime: '09:35', room: '10A' },
      { id: 'tue3', subject: 'Social Studies', startTime: '09:40', endTime: '10:25', room: '10A' },
      { id: 'tue4', subject: 'English', startTime: '10:45', endTime: '11:30', room: '10A' },
      { id: 'tue5', subject: 'Marathi', startTime: '11:35', endTime: '12:20', room: '10A' },
      { id: 'tue6', subject: 'Hindi', startTime: '12:25', endTime: '13:10', room: '10A' },
    ]
  },
  wednesday: {
    periods: [
      { id: 'wed1', subject: 'Mathematics', startTime: '08:00', endTime: '08:45', room: '10A' },
      { id: 'wed2', subject: 'Science', startTime: '08:50', endTime: '09:35', room: 'Lab 3' },
      { id: 'wed3', subject: 'Hindi', startTime: '09:40', endTime: '10:25', room: '10A' },
      { id: 'wed4', subject: 'Social Studies', startTime: '10:45', endTime: '11:30', room: '10A' },
      { id: 'wed5', subject: 'English', startTime: '11:35', endTime: '12:20', room: '10A' },
      { id: 'wed6', subject: 'Marathi', startTime: '12:25', endTime: '13:10', room: '10A' },
    ]
  },
  thursday: {
    periods: [
      { id: 'thu1', subject: 'Science', startTime: '08:00', endTime: '08:45', room: 'Lab 2' },
      { id: 'thu2', subject: 'Social Studies', startTime: '08:50', endTime: '09:35', room: '10A' },
      { id: 'thu3', subject: 'Mathematics', startTime: '09:40', endTime: '10:25', room: '10A' },
      { id: 'thu4', subject: 'Hindi', startTime: '10:45', endTime: '11:30', room: '10A' },
      { id: 'thu5', subject: 'Marathi', startTime: '11:35', endTime: '12:20', room: '10A' },
      { id: 'thu6', subject: 'English', startTime: '12:25', endTime: '13:10', room: '10A' },
    ]
  },
  friday: {
    periods: [
      { id: 'fri1', subject: 'Mathematics', startTime: '08:00', endTime: '08:45', room: '10A' },
      { id: 'fri2', subject: 'English', startTime: '08:50', endTime: '09:35', room: '10A' },
      { id: 'fri3', subject: 'Science', startTime: '09:40', endTime: '10:25', room: 'Lab 1' },
      { id: 'fri4', subject: 'Social Studies', startTime: '10:45', endTime: '11:30', room: '10A' },
      { id: 'fri5', subject: 'Hindi', startTime: '11:35', endTime: '12:20', room: '10A' },
      { id: 'fri6', subject: 'Marathi', startTime: '12:25', endTime: '13:10', room: '10A' },
    ]
  },
  saturday: {
    periods: [
      { id: 'sat1', subject: 'Science', startTime: '08:00', endTime: '08:45', room: 'Lab 3' },
      { id: 'sat2', subject: 'Mathematics', startTime: '08:50', endTime: '09:35', room: '10A' },
      { id: 'sat3', subject: 'Social Studies', startTime: '09:40', endTime: '10:25', room: '10A' },
      { id: 'sat4', subject: 'English', startTime: '10:45', endTime: '11:30', room: '10A' },
    ]
  },
};

export const useUserStore = create<UserState>(
  persist(
    (set, get) => ({
      profile: null,
      isLoading: false,
      error: null,
      initialized: false,
      
      initializeProfile: (userId) => {
        const db = getFirestore(firebaseApp);
        set({ isLoading: true, error: null });
        
        // First, try to get the user profile from Firestore
        const unsubscribe = onSnapshot(
          doc(db, 'users', userId),
          async (docSnap) => {
            if (docSnap.exists()) {
              // User profile exists
              const userData = docSnap.data() as UserProfile;
              
              // If user doesn't have subjects yet, add default ones
              if (!userData.subjects || userData.subjects.length === 0) {
                userData.subjects = defaultSubjects;
                userData.weeklySchedule = defaultWeeklySchedule;
                
                // Update the user document with default data
                try {
                  await updateDoc(doc(db, 'users', userId), {
                    subjects: defaultSubjects,
                    weeklySchedule: defaultWeeklySchedule,
                    updatedAt: new Date().toISOString()
                  });
                } catch (error) {
                  console.error('Error updating user with default data:', error);
                }
              }
              
              set({ 
                profile: userData,
                isLoading: false,
                initialized: true
              });
            } else {
              // User document doesn't exist, create one with default values
              try {
                // Get user basic info
                const auth = getAuth();
                const user = auth.currentUser;
                
                if (user) {
                  const newUserProfile: UserProfile = {
                    uid: user.uid,
                    displayName: user.displayName || 'Student',
                    email: user.email || '',
                    role: 'student', // Default role
                    subjects: defaultSubjects,
                    weeklySchedule: defaultWeeklySchedule,
                    grade: '10',
                    division: 'A',
                    board: 'Maharashtra State Board',
                    school: 'Std X School',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    photoURL: user.photoURL || undefined
                  };
                  
                  await setDoc(doc(db, 'users', userId), newUserProfile);
                  
                  set({ 
                    profile: newUserProfile,
                    isLoading: false,
                    initialized: true
                  });
                }
              } catch (error: any) {
                console.error('Error creating user profile:', error);
                set({ 
                  error: new Error(error.message || 'Failed to create user profile'),
                  isLoading: false,
                  initialized: true
                });
              }
            }
          },
          (error) => {
            console.error('Error fetching user profile:', error);
            set({ 
              error: new Error(error.message || 'Failed to fetch user profile'),
              isLoading: false,
              initialized: true
            });
          }
        );
        
        // Return unsubscribe function (zustand will not use this, but it's good practice)
        return unsubscribe;
      },
      
      updateProfile: async (data) => {
        const { profile } = get();
        if (!profile) return;
        
        try {
          set({ isLoading: true, error: null });
          const db = getFirestore(firebaseApp);
          
          // Update with new data and updatedAt timestamp
          const updatedData = {
            ...data,
            updatedAt: new Date().toISOString()
          };
          
          await updateDoc(doc(db, 'users', profile.uid), updatedData);
          
          // Local update of state
          set({ 
            profile: { ...profile, ...updatedData },
            isLoading: false 
          });
        } catch (error: any) {
          console.error('Error updating profile:', error);
          set({ 
            error: new Error(error.message || 'Failed to update profile'),
            isLoading: false 
          });
        }
      },
      
      updateSubjectProgress: async (subjectId, progress) => {
        const { profile } = get();
        if (!profile || !profile.subjects) return;
        
        try {
          set({ isLoading: true, error: null });
          const db = getFirestore(firebaseApp);
          
          // Find subject index
          const subjectIndex = profile.subjects.findIndex(s => s.id === subjectId);
          if (subjectIndex === -1) throw new Error('Subject not found');
          
          // Create updated subjects array
          const updatedSubjects = [...profile.subjects];
          updatedSubjects[subjectIndex] = {
            ...updatedSubjects[subjectIndex],
            progress,
            completedTopics: Math.floor(updatedSubjects[subjectIndex].totalTopics * (progress / 100)),
            lastActivity: new Date().toISOString()
          };
          
          // Update in Firestore
          await updateDoc(doc(db, 'users', profile.uid), {
            subjects: updatedSubjects,
            updatedAt: new Date().toISOString()
          });
          
          // Update local state
          set({
            profile: {
              ...profile,
              subjects: updatedSubjects,
              updatedAt: new Date().toISOString()
            },
            isLoading: false
          });
        } catch (error: any) {
          console.error('Error updating subject progress:', error);
          set({ 
            error: new Error(error.message || 'Failed to update subject progress'),
            isLoading: false 
          });
        }
      }
    }),
    {
      name: 'user-store',
    }
  )
);

import { getAuth } from 'firebase/auth';