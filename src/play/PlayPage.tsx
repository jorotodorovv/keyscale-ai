// src/play/PlayPage.tsx
import React, { useState, useEffect, useRef } from 'react'
import { useStore } from '../state/store'
import { generateRandomText, calculateWPM, calculateAccuracy } from '../utils/textUtils'
import { updateWeaknessProfile, getTopWeakKeys, getTopWeakBigrams } from '../utils/weaknessUtils'
import GlassCard from '../components/GlassCard'
import MetricPill from '../components/MetricPill'
import KeycapBadge from '../components/KeycapBadge'
import { Session } from '../state/types'

const MODES = [
  { id: 'quick-test', label: 'Quick Test' },
  { id: 'paragraph', label: 'Paragraph' },
  { id: 'free-type', label: 'Free Type' },
]

const DURATIONS = [
  { id: 30, label: '30s' },
  { id: 60, label: '60s' },
  { id: 120, label: '120s' },
]

const DIFFICULTIES = [
  { id: 'easy', label: 'Easy' },
  { id: 'medium', label: 'Medium' },
  { id: 'hard', label: 'Hard' },
]

const PlayPage: React.FC = () => {
  const { settings, addSession, weaknessProfile, updateWeaknessProfile: updateStoreWeaknessProfile } = useStore()
  const [mode, setMode] = useState<'quick-test' | 'paragraph' | 'free-type'>('quick-test')
  const [duration, setDuration] = useState<number>(30)
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium')
  const [text, setText] = useState<string>('')
  const [userInput, setUserInput] = useState<string>('')
  const [startTime, setStartTime] = useState<number | null>(null)
  const [elapsedTime, setElapsedTime] = useState<number>(0)
  const [isFinished, setIsFinished] = useState<boolean>(false)
  const [showResults, setShowResults] = useState<boolean>(false)
  const [sessionStats, setSessionStats] = useState<Omit<Session, 'id' | 'timestamp'> | null>(null)
  
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize text based on mode
  useEffect(() => {
    if (mode === 'quick-test' || mode === 'paragraph') {
      setText(generateRandomText(mode === 'quick-test' ? 300 : 1000))
    } else {
      setText('')
    }
    resetTest()
  }, [mode])

  // Handle timer
  useEffect(() => {
    if (startTime && !isFinished) {
      timerRef.current = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000
        setElapsedTime(elapsed)
        
        if (mode === 'quick-test' && elapsed >= duration) {
          finishTest()
        }
      }, 100)
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [startTime, isFinished, mode, duration])

  const resetTest = () => {
    setUserInput('')
    setStartTime(null)
    setElapsedTime(0)
    setIsFinished(false)
    setShowResults(false)
    setSessionStats(null)
    
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }

  const startTest = () => {
    if (!startTime) {
      setStartTime(Date.now())
    }
  }

  const finishTest = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    
    setIsFinished(true)
    
    // Calculate stats
    const correctChars = userInput.split('').filter((char, i) => char === text[i]).length
    const timeInMinutes = elapsedTime / 60
    const wpm = calculateWPM(correctChars, timeInMinutes)
    const accuracy = calculateAccuracy(correctChars, userInput.length)
    const errors = userInput.length - correctChars
    
    // Update weakness profile
    const newProfile = updateWeaknessProfile(weaknessProfile, userInput, text)
    updateStoreWeaknessProfile(newProfile)
    
    // Get weak keys and bigrams
    const weakKeys = getTopWeakKeys(newProfile)
    const weakBigrams = getTopWeakBigrams(newProfile)
    
    const stats = {
      mode,
      durationSec: Math.round(elapsedTime),
      difficulty,
      wpm,
      accuracy,
      errors,
      weakKeys,
      weakBigrams,
    }
    
    setSessionStats(stats)
    
    // Save session
    const session: Session = {
      id: Math.random().toString(36).substring(2, 15),
      timestamp: Date.now(),
      ...stats,
    }
    
    addSession(session)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    
    if (!startTime && value.length > 0) {
      startTest()
    }
    
    setUserInput(value)
    
    // For paragraph mode, finish when user types all characters
    if (mode === 'paragraph' && value.length >= text.length) {
      finishTest()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Prevent backspace from navigating back in browser
    if (e.key === 'Backspace' && userInput.length === 0) {
      e.preventDefault()
    }
  }

  const regenerateText = () => {
    setText(generateRandomText(mode === 'quick-test' ? 300 : 1000))
    resetTest()
  }

  const toggleSound = () => {
    // TODO: Implement sound toggle
  }

  // Calculate progress percentage
  const progress = mode === 'quick-test' 
    ? Math.min(100, (elapsedTime / duration) * 100)
    : Math.min(100, (userInput.length / text.length) * 100)

  // Calculate WPM and accuracy in real-time
  const correctChars = userInput.split('').filter((char, i) => char === text[i]).length
  const currentTimeInMinutes = elapsedTime / 60
  const currentWpm = calculateWPM(correctChars, currentTimeInMinutes || 1)
  const currentAccuracy = calculateAccuracy(correctChars, userInput.length || 1)

  return (
    <div className="pt-20 pb-10 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-heading font-bold">Practice Session</h2>
          
          <div className="flex flex-wrap gap-2">
            <select 
              value={mode}
              onChange={(e) => setMode(e.target.value as any)}
              className="glass p-2 rounded-lg text-sm"
            >
              {MODES.map(m => (
                <option key={m.id} value={m.id}>{m.label}</option>
              ))}
            </select>
            
            {mode === 'quick-test' && (
              <select 
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="glass p-2 rounded-lg text-sm"
              >
                {DURATIONS.map(d => (
                  <option key={d.id} value={d.id}>{d.label}</option>
                ))}
              </select>
            )}
            
            <select 
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as any)}
              className="glass p-2 rounded-lg text-sm"
            >
              {DIFFICULTIES.map(d => (
                <option key={d.id} value={d.id}>{d.label}</option>
              ))}
            </select>
            
            <button 
              onClick={regenerateText}
              className="glass p-2 rounded-lg text-sm hover:bg-white/10 transition-colors"
            >
              ↻ Regenerate
            </button>
            
            <button 
              onClick={toggleSound}
              className="glass p-2 rounded-lg text-sm hover:bg-white/10 transition-colors"
            >
              🔊 Sound
            </button>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="glass h-1.5 rounded-full mb-6 overflow-hidden">
          <div 
            className="h-full bg-teal-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Metrics HUD */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          <MetricPill label="WPM" value={currentWpm} />
          <MetricPill label="Accuracy" value={`${currentAccuracy}%`} />
          <MetricPill label="Time" value={Math.floor(elapsedTime)} />
          <MetricPill label="Errors" value={userInput.length - correctChars} />
          <div className="glass rounded-full p-1">
            <div className="h-2 bg-gradient-to-r from-teal-500 to-violet-500 rounded-full" 
              style={{ width: `${progress}%` }} />
          </div>
        </div>
        
        {/* Typing area */}
        <GlassCard className="relative mb-6">
          <div 
            className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-violet-500/5 rounded-xl pointer-events-none"
            style={{ mask: 'url(#noise-mask)' }}
          />
          
          <div className="relative z-10 p-6 font-mono text-lg leading-relaxed min-h-[200px]">
            {text.split('').map((char, index) => {
              let charClass = 'text-white/50'
              
              if (index < userInput.length) {
                charClass = userInput[index] === char 
                  ? 'text-teal-400' 
                  : 'text-coral-400 animate-micro-shake'
              } else if (index === userInput.length && startTime) {
                charClass = 'bg-teal-500/30'
              }
              
              return (
                <span 
                  key={index} 
                  className={charClass}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              )
            })}
            
            {mode === 'free-type' && (
              <span className="text-white/30">
                {userInput.substring(text.length)}
              </span>
            )}
          </div>
          
          <textarea
            ref={textareaRef}
            value={userInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={isFinished}
            autoFocus
            className="absolute inset-0 w-full h-full opacity-0 cursor-default z-20"
            spellCheck={false}
          />
        </GlassCard>
        
        {/* Results modal */}
        {showResults && sessionStats && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <GlassCard className="w-full max-w-2xl">
              <h3 className="text-xl font-heading font-bold mb-4">Session Complete</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 glass rounded-lg">
                  <div className="text-3xl font-bold text-teal-400">{sessionStats.wpm}</div>
                  <div className="text-gray-400 text-sm">WPM</div>
                </div>
                <div className="text-center p-4 glass rounded-lg">
                  <div className="text-3xl font-bold text-violet-400">{sessionStats.accuracy}%</div>
                  <div className="text-gray-400 text-sm">Accuracy</div>
                </div>
                <div className="text-center p-4 glass rounded-lg">
                  <div className="text-3xl font-bold text-coral-400">{sessionStats.errors}</div>
                  <div className="text-gray-400 text-sm">Errors</div>
                </div>
                <div className="text-center p-4 glass rounded-lg">
                  <div className="text-3xl font-bold">{sessionStats.durationSec}s</div>
                  <div className="text-gray-400 text-sm">Duration</div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-medium mb-2 text-teal-400">Weak Keys</h4>
                  <div className="flex flex-wrap gap-2">
                    {sessionStats.weakKeys.length > 0 ? (
                      sessionStats.weakKeys.map((key, i) => (
                        <KeycapBadge key={i} char={key} />
                      ))
                    ) : (
                      <span className="text-gray-500 text-sm">No weak keys detected</span>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2 text-violet-400">Weak Bigrams</h4>
                  <div className="flex flex-wrap gap-2">
                    {sessionStats.weakBigrams.length > 0 ? (
                      sessionStats.weakBigrams.map((bigram, i) => (
                        <div key={i} className="flex gap-1">
                          <KeycapBadge char={bigram[0]} />
                          <KeycapBadge char={bigram[1]} />
                        </div>
                      ))
                    ) : (
                      <span className="text-gray-500 text-sm">No weak bigrams detected</span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <button 
                  onClick={resetTest}
                  className="px-4 py-2 bg-teal-500/20 hover:bg-teal-500/30 rounded-lg transition-colors"
                >
                  Replay
                </button>
                <button 
                  onClick={() => {}}
                  className="px-4 py-2 bg-violet-500/20 hover:bg-violet-500/30 rounded-lg transition-colors"
                >
                  Run Adaptive Drill
                </button>
                <button 
                  onClick={() => setShowResults(false)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors ml-auto"
                >
                  Close
                </button>
              </div>
            </GlassCard>
          </div>
        )}
        
        {/* Action buttons */}
        <div className="flex justify-center gap-4">
          {!startTime && (
            <button 
              onClick={startTest}
              className="px-6 py-3 bg-teal-500 hover:bg-teal-600 rounded-lg font-medium transition-colors"
            >
              Start Test
            </button>
          )}
          
          {isFinished && (
            <button 
              onClick={() => setShowResults(true)}
              className="px-6 py-3 bg-violet-500 hover:bg-violet-600 rounded-lg font-medium transition-colors"
            >
              View Results
            </button>
          )}
          
          {startTime && !isFinished && (
            <button 
              onClick={finishTest}
              className="px-6 py-3 bg-coral-500 hover:bg-coral-600 rounded-lg font-medium transition-colors"
            >
              Finish Early
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default PlayPage