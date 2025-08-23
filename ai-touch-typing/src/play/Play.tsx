import { useAppContext } from '../state/AppContext';
import MetricPill from '../components/MetricPill';
import ProgressRibbon from '../components/ProgressRibbon';
import { calculateWPM, calculateAccuracy, countErrors, updateWeaknessProfile } from '../utils/typingMetrics';
import { useEffect } from 'react';

const Play = () => {
  const { session, setSession, weaknessProfile, setWeaknessProfile } = useAppContext();
  
  const startSession = () => {
    setSession(prev => ({
      ...prev,
      id: Math.random().toString(36).substring(2, 9),
      timestamp: Date.now(),
      startTime: Date.now(),
      currentText: 'The quick brown fox jumps over the lazy dog',
      userInput: '',
    }));
  };
  
  // Update metrics as user types
  useEffect(() => {
    if (session.startTime) {
      const currentTime = Date.now();
      const wpm = calculateWPM(session.userInput, session.startTime, currentTime);
      const accuracy = calculateAccuracy(session.userInput, session.currentText);
      const errors = countErrors(session.userInput, session.currentText);
      
      setSession(prev => ({
        ...prev,
        wpm,
        accuracy,
        errors
      }));
      
      // Update weakness profile
      const updatedProfile = updateWeaknessProfile(
        session.userInput, 
        session.currentText, 
        weaknessProfile
      );
      setWeaknessProfile(updatedProfile);
    }
  }, [session.userInput, session.startTime, session.currentText, weaknessProfile, setSession, setWeaknessProfile]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="glass-card p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Typing Practice</h2>
        
        {!session.startTime ? (
          <div className="text-center">
            <button 
              onClick={startSession}
              className="px-6 py-3 bg-teal-500 hover:bg-teal-600 rounded-lg font-semibold transition-colors"
            >
              Start Typing Session
            </button>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="glass-card p-4">
                <h3 className="font-semibold mb-2">Quick Test</h3>
                <p className="text-sm text-gray-300 mb-3">Test your speed with a timed session</p>
                <div className="flex space-x-2">
                  {[30, 60, 120].map((sec) => (
                    <button 
                      key={sec}
                      className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm"
                      onClick={() => setSession(prev => ({...prev, durationSec: sec, mode: 'quick-test'}))}
                    >
                      {sec}s
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="glass-card p-4">
                <h3 className="font-semibold mb-2">Paragraph</h3>
                <p className="text-sm text-gray-300 mb-3">Practice with a longer text passage</p>
                <button 
                  className="px-4 py-2 bg-violet-500 hover:bg-violet-600 rounded"
                  onClick={() => setSession(prev => ({...prev, mode: 'paragraph'}))}
                >
                  Start
                </button>
              </div>
              
              <div className="glass-card p-4">
                <h3 className="font-semibold mb-2">Free Type</h3>
                <p className="text-sm text-gray-300 mb-3">Type freely without time constraints</p>
                <button 
                  className="px-4 py-2 bg-coral-500 hover:bg-coral-600 rounded"
                  onClick={() => setSession(prev => ({...prev, mode: 'free-type'}))}
                >
                  Start
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-4 flex justify-between items-center">
              <div className="flex space-x-4">
                <MetricPill label="WPM" value={session.wpm} />
                <MetricPill label="Accuracy" value={`${session.accuracy}%`} />
                <MetricPill label="Errors" value={session.errors} />
              </div>
              
              <div className="text-right">
                <div className="text-2xl font-mono">
                  {Math.floor((Date.now() - session.startTime) / 1000)}s
                </div>
                <ProgressRibbon 
                  progress={Math.min(100, ((Date.now() - session.startTime) / 1000) / session.durationSec * 100)} 
                  className="w-32 mt-1"
                />
              </div>
            </div>
            
            <div className="glass-card p-6 mb-6">
              <div className="text-2xl font-mono leading-relaxed">
                {session.currentText.split('').map((char, index) => {
                  let className = 'text-gray-500';
                  if (index < session.userInput.length) {
                    className = session.userInput[index] === char ? 'text-green-400' : 'text-red-400';
                  } else if (index === session.userInput.length) {
                    className = 'text-white relative after:content-["|"] after:absolute after:animate-pulse';
                  }
                  
                  return (
                    <span key={index} className={className}>
                      {char}
                    </span>
                  );
                })}
              </div>
            </div>
            
            <textarea
              autoFocus
              value={session.userInput}
              onChange={(e) => setSession(prev => ({...prev, userInput: e.target.value}))}
              className="w-full p-4 bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 rounded-lg font-mono text-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Start typing here..."
              rows={4}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Play;