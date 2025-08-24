import React, { useState, useEffect, useRef } from 'react';
import GlassCard from './ui/GlassCard';
import MetricPill from './ui/MetricPill';
import ProgressRibbon from './ui/ProgressRibbon';
import { loadWeaknessProfile, saveWeaknessProfile, updateWeaknessProfile, getTopWeakKeys, getTopWeakBigrams } from '../utils/weaknessDetection';
import { addSession } from '../utils/analytics';

// Sample text for typing practice
const SAMPLE_TEXT = "The quick brown fox jumps over the lazy dog. This is a sample text for typing practice. Try to type as accurately and quickly as possible.";

const TypingSurface: React.FC = () => {
  const [text] = useState<string>(SAMPLE_TEXT);
  const [userInput, setUserInput] = useState<string>('');
  const [wpm, setWpm] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(100);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [testCompleted, setTestCompleted] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Focus the textarea on initial render
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);
  
  // Timer effect
  useEffect(() => {
    let interval: number | null = null;
    
    if (isTimerRunning) {
      interval = window.setInterval(() => {
        setTimeElapsed((prev: number) => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning]);
  
  // Calculate metrics
  useEffect(() => {
    // Calculate WPM (words per minute)
    // A word is typically 5 characters including spaces
    const words = userInput.length / 5;
    const minutes = timeElapsed / 60;
    const calculatedWpm = minutes > 0 ? Math.round(words / minutes) : 0;
    setWpm(calculatedWpm);
    
    // Calculate accuracy
    if (userInput.length > 0) {
      let correctChars = 0;
      for (let i = 0; i < userInput.length; i++) {
        if (userInput[i] === text[i]) {
          correctChars++;
        }
      }
      const calculatedAccuracy = Math.round((correctChars / userInput.length) * 100);
      setAccuracy(calculatedAccuracy);
    } else {
      setAccuracy(100);
    }
    
    // Start timer on first keystroke
    if (userInput.length > 0 && !isTimerRunning) {
      setIsTimerRunning(true);
    }
    
    // Check if test is completed
    if (userInput.length === text.length && userInput.length > 0) {
      setIsTimerRunning(false);
      setTestCompleted(true);
      
      // Update weakness profile
      const profile = loadWeaknessProfile();
      const updatedProfile = updateWeaknessProfile(profile, text, userInput);
      saveWeaknessProfile(updatedProfile);
      
      // Save session to analytics
      const mistakes = userInput.split('').reduce((count: number, char: string, index: number) => {
        return char !== text[index] ? count + 1 : count;
      }, 0);
      
      addSession({
        date: new Date(),
        wpm: wpm,
        accuracy: accuracy,
        duration: timeElapsed,
        textLength: text.length,
        mistakes: mistakes
      });
      
      // Log weak keys and bigrams for debugging
      console.log('Top weak keys:', getTopWeakKeys(updatedProfile));
      console.log('Top weak bigrams:', getTopWeakBigrams(updatedProfile));
    }
  }, [userInput, text, timeElapsed, isTimerRunning, wpm, accuracy]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Prevent typing more characters than the text length
    if (e.target.value.length <= text.length) {
      setUserInput(e.target.value);
    }
  };
  
  const resetTest = () => {
    setUserInput('');
    setTimeElapsed(0);
    setWpm(0);
    setAccuracy(100);
    setIsTimerRunning(false);
    setTestCompleted(false);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };
  
  // Calculate progress percentage
  const progress = (userInput.length / text.length) * 100;
  
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-center">Typing Test</h1>
      
      {/* Metrics HUD */}
      <div className="flex justify-center space-x-4">
        <MetricPill label="WPM" value={wpm} />
        <MetricPill label="ACCURACY" value={`${accuracy}%`} />
        <MetricPill label="TIME" value={`${timeElapsed}s`} />
      </div>
      
      {/* Progress ribbon */}
      <ProgressRibbon progress={progress} />
      
      {/* Typing surface */}
      <GlassCard className="p-8">
        <div className="mb-6 min-h-[100px]">
          {text.split('').map((char: string, index: number) => {
            let charClass = 'text-white';
            if (index < userInput.length) {
              charClass = userInput[index] === char 
                ? 'text-green-400' 
                : 'text-red-400 bg-red-900/50';
            } else if (index === userInput.length && !testCompleted) {
              charClass = 'text-cyan-400 animate-pulse';
            }
            
            return (
              <span 
                key={index} 
                className={`${charClass} ${index === userInput.length && !testCompleted ? 'underline' : ''}`}
              >
                {char}
              </span>
            );
          })}
        </div>
        
        <textarea
          ref={textareaRef}
          value={userInput}
          onChange={handleInputChange}
          className="w-full bg-black/30 text-white rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          rows={4}
          placeholder="Start typing here..."
          disabled={testCompleted}
        />
      </GlassCard>
      
      {/* Completion summary */}
      {testCompleted && (
        <GlassCard className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">Test Completed!</h2>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <MetricPill label="WPM" value={wpm} />
            <MetricPill label="ACCURACY" value={`${accuracy}%`} />
            <MetricPill label="TIME" value={`${timeElapsed}s`} />
          </div>
          <p className="text-center text-cyan-400">Your results have been saved to analytics.</p>
        </GlassCard>
      )}
      
      {/* Controls */}
      <div className="flex justify-center">
        <button 
          onClick={resetTest}
          className="px-6 py-3 bg-cyan-500 text-gray-900 font-bold rounded-lg hover:bg-cyan-400 transition-colors"
        >
          {testCompleted ? 'Try Again' : 'Reset Test'}
        </button>
      </div>
    </div>
  );
};

export default TypingSurface;