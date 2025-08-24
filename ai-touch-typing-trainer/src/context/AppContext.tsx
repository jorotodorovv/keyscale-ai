import React, { createContext, useContext, useState } from 'react';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';

// Define types for our context
interface AppContextType {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
}

// Create the context with default values
const AppContext = createContext<AppContextType>({
  theme: 'dark',
  setTheme: () => {},
  soundEnabled: true,
  setSoundEnabled: () => {},
  fontSize: 16,
  setFontSize: () => {},
});

// Create a provider component
export const AppProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }: { children: React.ReactNode }) => {
  // Load initial values from localStorage or use defaults
  const [theme, setTheme] = useState<'light' | 'dark'>(
    loadFromLocalStorage('theme', 'dark')
  );
  
  const [soundEnabled, setSoundEnabled] = useState<boolean>(
    loadFromLocalStorage('soundEnabled', true)
  );
  
  const [fontSize, setFontSize] = useState<number>(
    loadFromLocalStorage('fontSize', 16)
  );

  // Save to localStorage whenever values change
  const updateTheme = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    saveToLocalStorage('theme', newTheme);
  };

  const updateSoundEnabled = (enabled: boolean) => {
    setSoundEnabled(enabled);
    saveToLocalStorage('soundEnabled', enabled);
  };

  const updateFontSize = (size: number) => {
    setFontSize(size);
    saveToLocalStorage('fontSize', size);
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme: updateTheme,
        soundEnabled,
        setSoundEnabled: updateSoundEnabled,
        fontSize,
        setFontSize: updateFontSize,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Create a custom hook for using the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};