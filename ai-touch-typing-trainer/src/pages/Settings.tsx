import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import GlassCard from '../ui/GlassCard';
import NeonToggle from '../ui/NeonToggle';
import Chip from '../ui/Chip';
import Toast from '../ui/Toast';

const Settings: React.FC = () => {
  const { theme, setTheme, soundEnabled, setSoundEnabled, fontSize, setFontSize } = useAppContext();
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error' | 'info' | 'warning'} | null>(null);
  
  const themes = ['light', 'dark'];
  const fontSizes = [14, 16, 18, 20, 22];

  const exportData = () => {
    try {
      const data = {
        theme,
        soundEnabled,
        fontSize,
        weaknessProfile: localStorage.getItem('weaknessProfile'),
        typingSessions: localStorage.getItem('typingSessions')
      };
      
      const dataStr = JSON.stringify(data, null, 2);
      const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
      
      const exportFileDefaultName = `typing-trainer-data-${new Date().toISOString().slice(0, 10)}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      setToast({ message: 'Data exported successfully!', type: 'success' });
    } catch (error) {
      setToast({ message: 'Failed to export data', type: 'error' });
    }
  };

  const importData = () => {
    setToast({ message: 'Import functionality would be implemented in a full version', type: 'info' });
  };

  const clearData = () => {
    if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      try {
        localStorage.removeItem('weaknessProfile');
        localStorage.removeItem('typingSessions');
        setToast({ message: 'Data cleared successfully!', type: 'success' });
      } catch (error) {
        setToast({ message: 'Failed to clear data', type: 'error' });
      }
    }
  };

  const handleToastClose = () => {
    setToast(null);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">Settings</h1>
      
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={handleToastClose}
        />
      )}
      
      <GlassCard>
        <h2 className="text-xl font-bold mb-4">Appearance</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Theme</h3>
            <div className="flex space-x-4">
              {themes.map((t) => (
                <Chip
                  key={t}
                  label={t.charAt(0).toUpperCase() + t.slice(1)}
                  selected={theme === t}
                  onClick={() => setTheme(t as 'light' | 'dark')}
                />
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Font Size</h3>
            <div className="flex space-x-4">
              {fontSizes.map((size) => (
                <Chip
                  key={size}
                  label={`${size}px`}
                  selected={fontSize === size}
                  onClick={() => setFontSize(size)}
                />
              ))}
            </div>
          </div>
        </div>
      </GlassCard>
      
      <GlassCard>
        <h2 className="text-xl font-bold mb-4">Preferences</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Sound Effects</span>
            <NeonToggle
              isToggled={soundEnabled}
              onToggle={() => setSoundEnabled(!soundEnabled)}
            />
          </div>
        </div>
      </GlassCard>
      
      <GlassCard>
        <h2 className="text-xl font-bold mb-4">Data Management</h2>
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={exportData}
            className="px-4 py-2 bg-cyan-500 text-gray-900 rounded-lg font-bold hover:bg-cyan-400 transition-colors"
          >
            Export Data
          </button>
          <button 
            onClick={importData}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg font-bold hover:bg-purple-400 transition-colors"
          >
            Import Data
          </button>
          <button 
            onClick={clearData}
            className="px-4 py-2 bg-red-500 text-white rounded-lg font-bold hover:bg-red-400 transition-colors"
          >
            Clear Data
          </button>
        </div>
      </GlassCard>
    </div>
  );
};

export default Settings;