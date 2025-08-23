// Types for analytics and session data

export interface TypingSession {
  id: string;
  date: Date;
  wpm: number;
  accuracy: number;
  duration: number; // in seconds
  textLength: number;
  mistakes: number;
}