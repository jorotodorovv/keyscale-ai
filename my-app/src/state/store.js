// src/state/store.js
import { useState, useEffect } from 'react'
import { AppState, Settings, Session, WeaknessProfile } from './types'

const DEFAULT_SETTINGS: Settings = {
  layout: 'qwerty',
  theme: 'dark',
  reducedMotion: false,
  soundEnabled: true,
  fontScale: 1,
}

const DEFAULT_WEAKNESS_PROFILE: WeaknessProfile = {
  keys: {},
  bigrams: {},
}

const DEFAULT_STATE: AppState = {
  settings: DEFAULT_SETTINGS,
  sessions: [],
  weaknessProfile: DEFAULT_WEAKNESS_PROFILE,
}

const STORAGE_KEY = 'ai-touch-typing-trainer'

export const useStore = () => {
  const [state, setState] = useState<AppState>(DEFAULT_STATE)

  // Load state from localStorage on initial render
  useEffect(() => {
    try {
      const savedState = localStorage.getItem(STORAGE_KEY)
      if (savedState) {
        setState(JSON.parse(savedState))
      }
    } catch (error) {
      console.error('Failed to load state from localStorage:', error)
    }
  }, [])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch (error) {
      console.error('Failed to save state to localStorage:', error)
    }
  }, [state])

  const updateSettings = (newSettings: Partial<Settings>) => {
    setState(prev => ({
      ...prev,
      settings: { ...prev.settings, ...newSettings },
    }))
  }

  const addSession = (session: Session) => {
    setState(prev => ({
      ...prev,
      sessions: [session, ...prev.sessions].slice(0, 50), // Keep only last 50 sessions
    }))
  }

  const updateWeaknessProfile = (profile: WeaknessProfile) => {
    setState(prev => ({
      ...prev,
      weaknessProfile: profile,
    }))
  }

  const clearAllData = () => {
    setState(DEFAULT_STATE)
    localStorage.removeItem(STORAGE_KEY)
  }

  const exportData = (): string => {
    return JSON.stringify(state)
  }

  const importData = (data: string) => {
    try {
      const parsed = JSON.parse(data)
      setState(parsed)
      return true
    } catch (error) {
      console.error('Failed to import data:', error)
      return false
    }
  }

  return {
    ...state,
    updateSettings,
    addSession,
    updateWeaknessProfile,
    clearAllData,
    exportData,
    importData,
  }
}