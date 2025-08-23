import React, { useState, useEffect } from 'react';
import GlassCard from '../components/ui/GlassCard';
import Chip from '../components/ui/Chip';
import Tooltip from '../components/ui/Tooltip';
import { loadWeaknessProfile, getTopWeakKeys, getTopWeakBigrams } from '../utils/weaknessDetection';
import { generateDrill } from '../utils/drillGenerator';

const Drills: React.FC = () => {
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [duration, setDuration] = useState<'short' | 'medium' | 'long'>('medium');
  const [drillText, setDrillText] = useState<string>('');
  const [weakKeys, setWeakKeys] = useState<string[]>([]);
  const [weakBigrams, setWeakBigrams] = useState<string[]>([]);
  
  // Load weakness profile on component mount
  useEffect(() => {
    const profile = loadWeaknessProfile();
    const topKeys = getTopWeakKeys(profile);
    const topBigrams = getTopWeakBigrams(profile);
    
    setWeakKeys(topKeys.map(k => k.key));
    setWeakBigrams(topBigrams.map(b => b.bigram));
    
    // Generate initial drill
    regenerateDrill();
  }, []);
  
  const regenerateDrill = () => {
    const profile = loadWeaknessProfile();
    const topKeys = getTopWeakKeys(profile);
    const topBigrams = getTopWeakBigrams(profile);
    
    const newDrill = generateDrill(topKeys, topBigrams, difficulty, duration);
    setDrillText(newDrill);
  };
  
  const startDrill = () => {
    // In a full implementation, this would navigate to the typing test with the drill text
    alert('In a full implementation, this would start the typing drill with the generated text.');
  };
  
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-center">Adaptive Drills</h1>
      
      <GlassCard>
        <h2 className="text-xl font-bold mb-4">Generate Targeted Practice</h2>
        <p className="mb-6">
          Drills are generated based on your weak keys and bigrams: 
          <span className="text-cyan-400 ml-2">
            {weakKeys.join(', ') || 'No weak keys detected'}
          </span>
          <span className="text-purple-400 ml-2">
            {weakBigrams.join(', ') || 'No weak bigrams detected'}
          </span>
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-semibold mb-2">Difficulty</h3>
            <div className="flex space-x-4">
              {(['easy', 'medium', 'hard'] as const).map(level => (
                <Chip
                  key={level}
                  label={level.charAt(0).toUpperCase() + level.slice(1)}
                  selected={difficulty === level}
                  onClick={() => setDifficulty(level)}
                />
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Duration</h3>
            <div className="flex space-x-4">
              {(['short', 'medium', 'long'] as const).map(length => (
                <Chip
                  key={length}
                  label={length.charAt(0).toUpperCase() + length.slice(1)}
                  selected={duration === length}
                  onClick={() => setDuration(length)}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex space-x-4">
          <button 
            onClick={regenerateDrill}
            className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Regenerate
          </button>
          <Tooltip content="This will start a typing test with the generated drill text">
            <button 
              onClick={startDrill}
              className="px-4 py-2 bg-cyan-500 text-gray-900 font-bold rounded-lg hover:bg-cyan-400 transition-colors"
            >
              Start Drill
            </button>
          </Tooltip>
        </div>
      </GlassCard>
      
      <GlassCard>
        <h2 className="text-xl font-bold mb-4">Drill Preview</h2>
        <div className="p-4 bg-black/30 rounded-lg min-h-[100px]">
          {drillText || 'Generate a drill to see preview...'}
        </div>
      </GlassCard>
    </div>
  );
};

export default Drills;