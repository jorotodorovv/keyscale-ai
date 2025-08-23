import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PlayPage from './play/PlayPage'
import DrillsPage from './drills/DrillsPage'
import AnalyticsPage from './analytics/AnalyticsPage'
import SettingsPage from './settings/SettingsPage'
import Navigation from './components/Navigation'

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <Navigation />
      <Routes>
        <Route path="/" element={<PlayPage />} />
        <Route path="/play" element={<PlayPage />} />
        <Route path="/drills" element={<DrillsPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </div>
  )
}

export default App