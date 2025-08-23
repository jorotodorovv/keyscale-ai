// src/settings/SettingsPage.tsx
import React, { useState } from 'react'
import { useStore } from '../state/store'
import GlassCard from '../components/GlassCard'
import NeonToggle from '../components/NeonToggle'

const SettingsPage: React.FC = () => {
  const { settings, updateSettings, exportData, importData, clearAllData } = useStore()
  const [importText, setImportText] = useState<string>('')
  const [importSuccess, setImportSuccess] = useState<boolean | null>(null)

  const handleExport = () => {
    const data = exportData()
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'ai-touch-typing-data.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleImport = () => {
    if (importText.trim()) {
      const success = importData(importText)
      setImportSuccess(success)
      if (success) {
        setImportText('')
      }
      setTimeout(() => setImportSuccess(null), 3000)
    }
  }

  const handleClearData = () => {
    if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      clearAllData()
    }
  }

  return (
    <div className="pt-20 pb-10 px-4">
      <div className="container mx-auto max-w-2xl">
        <h2 className="text-2xl font-heading font-bold mb-6">Settings</h2>
        
        <div className="space-y-6">
          <GlassCard>
            <h3 className="font-heading font-bold mb-4 text-teal-400">Layout & Theme</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Keyboard Layout</label>
                <select 
                  value={settings.layout}
                  onChange={(e) => updateSettings({ layout: e.target.value as any })}
                  className="glass w-full p-2 rounded-lg"
                >
                  <option value="qwerty">QWERTY</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-sm font-medium">Reduced Motion</label>
                  <p className="text-gray-400 text-sm">Disable animations for better performance</p>
                </div>
                <NeonToggle 
                  checked={settings.reducedMotion}
                  onChange={(checked) => updateSettings({ reducedMotion: checked })}
                />
              </div>
            </div>
          </GlassCard>
          
          <GlassCard>
            <h3 className="font-heading font-bold mb-4 text-violet-400">Sound</h3>
            
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium">Sound Effects</label>
                <p className="text-gray-400 text-sm">Enable typing sounds and feedback</p>
              </div>
              <NeonToggle 
                checked={settings.soundEnabled}
                onChange={(checked) => updateSettings({ soundEnabled: checked })}
              />
            </div>
          </GlassCard>
          
          <GlassCard>
            <h3 className="font-heading font-bold mb-4 text-coral-400">Accessibility</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Font Size Scale</label>
                <input 
                  type="range" 
                  min="0.8" 
                  max="1.5" 
                  step="0.1"
                  value={settings.fontScale}
                  onChange={(e) => updateSettings({ fontScale: parseFloat(e.target.value) })}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Smaller</span>
                  <span>Default</span>
                  <span>Larger</span>
                </div>
              </div>
            </div>
          </GlassCard>
          
          <GlassCard>
            <h3 className="font-heading font-bold mb-4">Data Management</h3>
            
            <div className="space-y-4">
              <div className="flex gap-3">
                <button 
                  onClick={handleExport}
                  className="flex-1 py-2 bg-teal-500/20 hover:bg-teal-500/30 rounded-lg transition-colors"
                >
                  Export Data
                </button>
                <button 
                  onClick={handleClearData}
                  className="flex-1 py-2 bg-coral-500/20 hover:bg-coral-500/30 rounded-lg transition-colors"
                >
                  Clear All Data
                </button>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Import Data</label>
                <textarea
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                  placeholder="Paste your exported data here"
                  className="glass w-full p-2 rounded-lg min-h-[100px] text-sm"
                />
                <div className="flex gap-3 mt-2">
                  <button 
                    onClick={handleImport}
                    disabled={!importText.trim()}
                    className="px-4 py-2 bg-violet-500/20 hover:bg-violet-500/30 disabled:bg-gray-700 rounded-lg transition-colors"
                  >
                    Import Data
                  </button>
                  
                  {importSuccess !== null && (
                    <div className={`self-center text-sm ${importSuccess ? 'text-teal-400' : 'text-coral-400'}`}>
                      {importSuccess ? 'Data imported successfully!' : 'Failed to import data'}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage