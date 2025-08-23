import { useState } from 'react';
import { useAppContext } from '../state/AppContext';
import KeycapBadge from '../components/KeycapBadge';
import { generateDrill } from '../utils/drillGenerator';

const Drills = () => {
  const { weaknessProfile, setSession } = useAppContext();
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [duration, setDuration] = useState<'short' | 'medium' | 'long'>('medium');
  const [drillText, setDrillText] = useState('');
  
  // Get top 5 weak characters
  const weakChars = Object.entries(weaknessProfile)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([char]) => char);
  
  const handleGenerate = () => {
    const newDrill = generateDrill(weaknessProfile, difficulty, duration);
    setDrillText(newDrill);
  };
  
  const handleStartDrill = () => {
    if (!drillText) return;
    
    setSession(prev => ({
      ...prev,
      id: Math.random().toString(36).substring(2, 9),
      timestamp: Date.now(),
      startTime: Date.now(),
      currentText: drillText,
      userInput: '',
      mode: 'quick-test',
      durationSec: duration === 'short' ? 30 : duration === 'medium' ? 60 : 120,
      difficulty
    }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="glass-card p-6">
        <h2 className="text-2xl font-bold mb-4">Adaptive Drills</h2>
        <p className="text-gray-300 mb-6">
          Generate personalized typing drills based on your weak keys and bigrams.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-4">
            <h3 className="font-semibold mb-2">Weakness Profile</h3>
            <p className="text-sm text-gray-300 mb-3">
              Based on your typing history, these are your areas for improvement.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {weakChars.length > 0 ? (
                weakChars.map((char, index) => (
                  <KeycapBadge 
                    key={index} 
                    keyChar={char} 
                    errorRate={Math.min(100, weaknessProfile[char] * 10)} 
                  />
                ))
              ) : (
                <p className="text-gray-500 text-sm">No data yet. Complete some typing sessions to identify weaknesses.</p>
              )}
            </div>
          </div>
          
          <div className="glass-card p-4">
            <h3 className="font-semibold mb-2">Generate Drill</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm mb-1">Difficulty</label>
                <select 
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as any)}
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm mb-1">Duration</label>
                <select 
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value as any)}
                >
                  <option value="short">30 seconds</option>
                  <option value="medium">1 minute</option>
                  <option value="long">2 minutes</option>
                </select>
              </div>
              
              <button 
                className="w-full py-2 bg-violet-500 hover:bg-violet-600 rounded font-semibold"
                onClick={handleGenerate}
              >
                Generate Drill
              </button>
            </div>
          </div>
        </div>
        
        <div className="glass-card p-4 mt-6">
          <h3 className="font-semibold mb-2">Preview</h3>
          <div className="p-4 bg-gray-800 rounded font-mono text-lg min-h-[100px]">
            {drillText || 'Click "Generate Drill" to create a personalized typing exercise.'}
          </div>
          <button 
            className="mt-4 px-4 py-2 bg-teal-500 hover:bg-teal-600 rounded font-semibold disabled:opacity-50"
            onClick={handleStartDrill}
            disabled={!drillText}
          >
            Start Drill
          </button>
        </div>
      </div>
    </div>
  );
};

export default Drills;