// Types for analytics and session data

export interface TypingSession {
  id: string;
  date: string; // Stored as ISO string in localStorage
  wpm: number;
  accuracy: number;
  duration: number; // in seconds
  textLength: number;
  mistakes: number;
}