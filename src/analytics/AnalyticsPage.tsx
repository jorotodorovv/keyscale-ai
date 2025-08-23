// src/analytics/AnalyticsPage.tsx
import React, { useState } from 'react'
import { useStore } from '../state/store'
import GlassCard from '../components/GlassCard'
import MetricPill from '../components/MetricPill'
import { Session } from '../state/types'

const AnalyticsPage: React.FC = () => {
  const { sessions } = useStore()
  const [selectedSession, setSelectedSession] = useState<Session | null>(null)

  // Calculate streak
  const calculateStreak = (): number => {
    if (sessions.length === 0) return 0
    
    const sortedSessions = [...sessions].sort((a, b) => b.timestamp - a.timestamp)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    let streak = 0
    let currentDate = today
    
    for (const session of sortedSessions) {
      const sessionDate = new Date(session.timestamp)
      sessionDate.setHours(0, 0, 0, 0)
      
      // If we've found a session for the current date
      if (sessionDate.getTime() === currentDate.getTime()) {
        streak++
        currentDate.setDate(currentDate.getDate() - 1)
      } 
      // If we've found a session for a previous date (break in streak)
      else if (sessionDate.getTime() < currentDate.getTime()) {
        break
      }
    }
    
    return streak
  }

  // Generate sparkline data (last 10 sessions)
  const generateSparklineData = (): number[] => {
    const recentSessions = [...sessions].sort((a, b) => a.timestamp - b.timestamp).slice(-10)
    return recentSessions.map(session => session.wpm)
  }

  const streak = calculateStreak()
  const sparklineData = generateSparklineData()

  // Format date for display
  const formatDate = (timestamp: number): string => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="pt-20 pb-10 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-2xl font-heading font-bold mb-6">Analytics</h2>
        
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <GlassCard>
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-teal-400">{sessions.length}</div>
              <div className="text-gray-400">Total Sessions</div>
            </div>
          </GlassCard>
          
          <GlassCard>
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-violet-400">{streak}</div>
              <div className="text-gray-400">Day Streak</div>
            </div>
          </GlassCard>
          
          <GlassCard>
            <div className="text-center p-4">
              <div className="text-3xl font-bold text-coral-400">
                {sessions.length > 0 
                  ? Math.max(...sessions.map(s => s.wpm)) 
                  : 0}
              </div>
              <div className="text-gray-400">Best WPM</div>
            </div>
          </GlassCard>
        </div>
        
        <GlassCard className="mb-8">
          <h3 className="font-heading font-bold mb-4">WPM Trend</h3>
          <div className="h-32 flex items-end justify-between px-2">
            {sparklineData.length > 0 ? (
              sparklineData.map((wpm, i) => (
                <div 
                  key={i} 
                  className="flex-1 mx-0.5 bg-gradient-to-t from-teal-500 to-violet-500 rounded-t"
                  style={{ height: `${(wpm / Math.max(...sparklineData)) * 100}%` }}
                />
              ))
            ) : (
              <div className="text-gray-500 text-center w-full py-8">
                Complete sessions to see your progress
              </div>
            )}
          </div>
        </GlassCard>
        
        <GlassCard>
          <h3 className="font-heading font-bold mb-4">Session History</h3>
          
          {sessions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-400 text-sm">
                    <th className="pb-2 font-normal">Date</th>
                    <th className="pb-2 font-normal">Mode</th>
                    <th className="pb-2 font-normal">WPM</th>
                    <th className="pb-2 font-normal">Accuracy</th>
                  </tr>
                </thead>
                <tbody>
                  {[...sessions].sort((a, b) => b.timestamp - a.timestamp).map(session => (
                    <tr 
                      key={session.id} 
                      className="border-t border-white/10 hover:bg-white/5 cursor-pointer"
                      onClick={() => setSelectedSession(session)}
                    >
                      <td className="py-3">{formatDate(session.timestamp)}</td>
                      <td className="py-3 capitalize">{session.mode.replace('-', ' ')}</td>
                      <td className="py-3 font-mono">{session.wpm}</td>
                      <td className="py-3 font-mono">{session.accuracy}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No sessions yet. Complete a practice session to see your history.
            </div>
          )}
        </GlassCard>
        
        {/* Session Detail Modal */}
        {selectedSession && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <GlassCard className="w-full max-w-md">
              <h3 className="text-xl font-heading font-bold mb-4">Session Details</h3>
              
              <div className="space-y-3 mb-6">
                <MetricPill label="Date" value={formatDate(selectedSession.timestamp)} />
                <MetricPill label="Mode" value={selectedSession.mode.replace('-', ' ')} />
                <MetricPill label="Duration" value={`${selectedSession.durationSec}s`} />
                <MetricPill label="Difficulty" value={selectedSession.difficulty} />
                <MetricPill label="WPM" value={selectedSession.wpm} />
                <MetricPill label="Accuracy" value={`${selectedSession.accuracy}%`} />
                <MetricPill label="Errors" value={selectedSession.errors} />
              </div>
              
              <div className="flex justify-end">
                <button 
                  onClick={() => setSelectedSession(null)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </GlassCard>
          </div>
        )}
      </div>
    </div>
  )
}

export default AnalyticsPage