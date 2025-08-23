// src/state/types.ts
export interface Session {
  id: string
  timestamp: number
  mode: 'quick-test' | 'paragraph' | 'free-type'
  durationSec: number
  difficulty: 'easy' | 'medium' | 'hard'
  wpm: number
  accuracy: number
  errors: number
  weakKeys: string[]
  weakBigrams: string[]
}

export interface Settings {
  layout: 'qwerty'
  theme: 'dark'
  reducedMotion: boolean
  soundEnabled: boolean
  fontScale: number
}

export interface WeaknessProfile {
  keys: Record<string, { accuracy: number; errors: number; count: number }>
  bigrams: Record<string, { accuracy: number; errors: number; count: number }>
}

export interface AppState {
  settings: Settings
  sessions: Session[]
  weaknessProfile: WeaknessProfile
}