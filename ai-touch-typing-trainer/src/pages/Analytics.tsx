import React, { useState, useEffect } from 'react';
import GlassCard from '../components/ui/GlassCard';
import MetricPill from '../components/ui/MetricPill';
import Sparkline from '../components/ui/Sparkline';
import { loadSessions, calculateStreak, calculateAverageWpm, calculateAverageAccuracy, TypingSession } from '../utils/analytics';

const Analytics: React.FC = () => {
  const [sessions, setSessions] = useState<TypingSession[]>([]);
  const [streak, setStreak] = useState<number>(0);
  const [avgWpm, setAvgWpm] = useState<number>(0);
  const [avgAccuracy, setAvgAccuracy] = useState<number>(0);
  const [wpmData, setWpmData] = useState<number[]>([]);
  
  useEffect(() => {
    // Load data
    const loadedSessions = loadSessions();
    setSessions(loadedSessions);
    
    // Calculate metrics
    setStreak(calculateStreak());
    setAvgWpm(calculateAverageWpm());
    setAvgAccuracy(calculateAverageAccuracy());
    
    // Prepare WPM data for sparkline (last 10 sessions)
    const recentWpmData = loadedSessions
      .slice(-10)
      .map(session => session.wpm);
    setWpmData(recentWpmData);
  }, []);
  
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-center">Analytics</h1>
      
      {/* Summary metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricPill label="AVG WPM" value={avgWpm} />
        <MetricPill label="AVG ACCURACY" value={`${avgAccuracy}%`} />
        <MetricPill label="STREAK" value={streak} />
        <MetricPill label="TOTAL SESSIONS" value={sessions.length} />
      </div>
      
      {/* WPM Trend */}
      <GlassCard>
        <h2 className="text-xl font-bold mb-4">WPM Trend</h2>
        <div className="flex items-end space-x-4">
          <div className="flex-grow">
            <Sparkline data={wpmData} color="cyan" />
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{wpmData[wpmData.length - 1] || 0}</p>
            <p className="text-sm text-gray-400">Latest WPM</p>
          </div>
        </div>
      </GlassCard>
      
      {/* Recent Sessions */}
      <GlassCard>
        <h2 className="text-xl font-bold mb-4">Recent Sessions</h2>
        {sessions.length === 0 ? (
          <p className="text-gray-400 text-center py-4">No sessions yet. Complete a typing test to see analytics.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400">
                  <th className="pb-2">Date</th>
                  <th className="pb-2">WPM</th>
                  <th className="pb-2">Accuracy</th>
                  <th className="pb-2">Duration</th>
                </tr>
              </thead>
              <tbody>
                {[...sessions].reverse().slice(0, 5).map(session => (
                  <tr key={session.id} className="border-t border-white/10">
                    <td className="py-2">
                      {new Date(session.date).toLocaleDateString()}
                    </td>
                    <td className="py-2">{session.wpm}</td>
                    <td className="py-2">{session.accuracy}%</td>
                    <td className="py-2">{session.duration}s</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </GlassCard>
    </div>
  );
};

export default Analytics;