import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
export interface SessionState {
  id: string;
  timestamp: number;
  mode: 'quick-test' | 'paragraph' | 'free-type';
  durationSec: number;
  difficulty: 'easy' | 'medium' | 'hard';
  currentText: string;
  userInput: string;
  startTime: number | null;
  endTime: number | null;
  wpm: number;
  accuracy: number;
  errors: number;
  weakKeys: string[];
  weakBigrams: string[];
}

export interface SettingsState {
  layout: 'qwerty';
  theme: 'dark';
  reducedMotion: boolean;
  soundEnabled: boolean;
  fontScale: number;
  aaContrast: boolean;
}

export interface AnalyticsState {
  sessions: SessionState[];
  streak: number;
  lastSessionDate: string | null;
}

// Initial states
const initialSessionState: SessionState = {
  id: '',
  timestamp: Date.now(),
  mode: 'quick-test',
  durationSec: 30,
  difficulty: 'medium',
  currentText: '',
  userInput: '',
  startTime: null,
  endTime: null,
  wpm: 0,
  accuracy: 100,
  errors: 0,
  weakKeys: [],
  weakBigrams: [],
};

const initialSettingsState: SettingsState = {
  layout: 'qwerty',
  theme: 'dark',
  reducedMotion: false,
  soundEnabled: true,
  fontScale: 1,
  aaContrast: false,
};

const initialAnalyticsState: AnalyticsState = {
  sessions: [],
  streak: 0,
  lastSessionDate: null,
};

// Context
interface AppContextType {
  session: SessionState;
  setSession: React.Dispatch<React.SetStateAction<SessionState>>;
  settings: SettingsState;
  setSettings: React.Dispatch<React.SetStateAction<SettingsState>>;
  analytics: AnalyticsState;
  setAnalytics: React.Dispatch<React.SetStateAction<AnalyticsState>>;
  weaknessProfile: Record<string, number>;
  setWeaknessProfile: React.Dispatch<React.SetStateAction<Record<string, number>>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<SessionState>(initialSessionState);
  const [settings, setSettings] = useState<SettingsState>(initialSettingsState);
  const [analytics, setAnalytics] = useState<AnalyticsState>(initialAnalyticsState);
  const [weaknessProfile, setWeaknessProfile] = useState<Record<string, number>>({});

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedSettings = localStorage.getItem('typingSettings');
    const savedAnalytics = localStorage.getItem('typingAnalytics');
    const savedWeaknessProfile = localStorage.getItem('weaknessProfile');

    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (e) {
        console.error('Failed to parse settings', e);
      }
    }

    if (savedAnalytics) {
      try {
        setAnalytics(JSON.parse(savedAnalytics));
      } catch (e) {
        console.error('Failed to parse analytics', e);
      }
    }

    if (savedWeaknessProfile) {
      try {
        setWeaknessProfile(JSON.parse(savedWeaknessProfile));
      } catch (e) {
        console.error('Failed to parse weakness profile', e);
      }
    }
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('typingSettings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('typingAnalytics', JSON.stringify(analytics));
  }, [analytics]);

  useEffect(() => {
    localStorage.setItem('weaknessProfile', JSON.stringify(weaknessProfile));
  }, [weaknessProfile]);

  return (
    <AppContext.Provider
      value={{
        session,
        setSession,
        settings,
        setSettings,
        analytics,
        setAnalytics,
        weaknessProfile,
        setWeaknessProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Hook
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};