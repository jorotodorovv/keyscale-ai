import { TypingSession } from '../types/analytics';
import { loadFromLocalStorage, saveToLocalStorage } from './localStorage';

// Load sessions from localStorage
export const loadSessions = (): TypingSession[] => {
  return loadFromLocalStorage<TypingSession[]>('typingSessions', []);
};

// Save sessions to localStorage
export const saveSessions = (sessions: TypingSession[]): void => {
  // Keep only the last 50 sessions
  const limitedSessions = sessions.slice(-50);
  saveToLocalStorage('typingSessions', limitedSessions);
};

// Add a new session
export const addSession = (session: Omit<TypingSession, 'id'>): void => {
  const sessions = loadSessions();
  const newSession: TypingSession = {
    ...session,
    id: Date.now().toString() // Simple ID generation
  };
  sessions.push(newSession);
  saveSessions(sessions);
};

// Get recent sessions
export const getRecentSessions = (count: number = 10): TypingSession[] => {
  const sessions = loadSessions();
  return sessions.slice(-count).reverse();
};

// Calculate streak (consecutive days with practice)
export const calculateStreak = (): number => {
  const sessions = loadSessions();
  if (sessions.length === 0) return 0;
  
  // Sort sessions by date
  sessions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  let streak = 1;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Check if last session was today
  const lastSessionDate = new Date(sessions[0].date);
  lastSessionDate.setHours(0, 0, 0, 0);
  
  if (lastSessionDate.getTime() !== today.getTime()) {
    // If last session wasn't today, check if it was yesterday
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (lastSessionDate.getTime() !== yesterday.getTime()) {
      return 0; // No streak
    }
    // If it was yesterday, streak starts at 1 (already set)
  }
  
  // Count consecutive days
  for (let i = 0; i < sessions.length - 1; i++) {
    const currentDate = new Date(sessions[i].date);
    currentDate.setHours(0, 0, 0, 0);
    
    const nextDate = new Date(sessions[i + 1].date);
    nextDate.setHours(0, 0, 0, 0);
    
    // Calculate difference in days
    const diffTime = currentDate.getTime() - nextDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      streak++;
    } else if (diffDays > 1) {
      break; // Break the streak
    }
  }
  
  return streak;
};

// Calculate average WPM
export const calculateAverageWpm = (): number => {
  const sessions = loadSessions();
  if (sessions.length === 0) return 0;
  
  const totalWpm = sessions.reduce((sum, session) => sum + session.wpm, 0);
  return Math.round(totalWpm / sessions.length);
};

// Calculate average accuracy
export const calculateAverageAccuracy = (): number => {
  const sessions = loadSessions();
  if (sessions.length === 0) return 0;
  
  const totalAccuracy = sessions.reduce((sum, session) => sum + session.accuracy, 0);
  return Math.round(totalAccuracy / sessions.length);
};