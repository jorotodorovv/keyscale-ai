// src/drills/DrillsPage.jsx
import React, { useState } from 'react'
import { useStore } from '../state/store'
import GlassCard from '../components/GlassCard'
import KeycapBadge from '../components/KeycapBadge'
import { getTopWeakKeys, getTopWeakBigrams } from '../utils/weaknessUtils'
import { generateRandomText } from '../utils/textUtils'

const DIFFICULTIES = [
  { id: 'easy', label: 'Easy' },
  { id: 'medium', label: 'Medium' },
  { id: 'hard', label: 'Hard' },
]

const DURATIONS = [
  { id: 30, label: '30s' },
  { id: 60, label: '60s' },
  { id: 120, label: '120s' },
]

const DrillsPage: React.FC = () => {
  const { weaknessProfile } = useStore()
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium')
  const [duration, setDuration] = useState<number>(60)
  const [drillText, setDrillText] = useState<string>('')
  const [showPreview, setShowPreview] = useState<boolean>(false)

  const weakKeys = getTopWeakKeys(weaknessProfile, 5)
  const weakBigrams = getTopWeakBigrams(weaknessProfile, 3)

  const generateAdaptiveDrill = () => {
    // For this prototype, we'll generate text that over-represents weak keys/bigrams
    // In a full implementation, this would be more sophisticated
    
    let text = ''
    const targetLength = 300
    
    // Add weak bigrams multiple times
    weakBigrams.forEach(bigram => {
      const repetitions = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 5 : 8
      for (let i = 0; i < repetitions; i++) {
        text += bigram + ' '
      }
    })
    
    // Add weak keys multiple times
    weakKeys.forEach(key => {
      const repetitions = difficulty === 'easy' ? 5 : difficulty === 'medium' ? 10 : 15
      for (let i = 0; i < repetitions; i++) {
        text += key + ' '
      }
    })
    
    // Fill the rest with random text
    const remainingLength = targetLength - text.length
    if (remainingLength > 0) {
      text += generateRandomText(remainingLength)
    }
    
    setDrillText(text)
    setShowPreview(true)
  }

  return (
    <div className="pt-20 pb-10 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-2xl font-heading font-bold mb-6">Adaptive Drills</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <GlassCard>
            <h3 className="font-heading font-bold mb-4 text-teal-400">Your Weaknesses</h3>
            
            <div className="mb-6">
              <h4 className="font-medium mb-2">Weak Keys</h4>
              <div className="flex flex-wrap gap-2">
                {weakKeys.length > 0 ? (
                  weakKeys.map((key, i) => (
                    <KeycapBadge key={i} char={key} />
                  ))
                ) : (
                  <span className="text-gray-500 text-sm">No weak keys detected yet. Complete some practice sessions first.</span>
                )}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Weak Bigrams</h4>
              <div className="flex flex-wrap gap-2">
                {weakBigrams.length > 0 ? (
                  weakBigrams.map((bigram, i) => (
                    <div key={i} className="flex gap-1">
                      <KeycapBadge char={bigram[0]} />
                      <KeycapBadge char={bigram[1]} />
                    </div>
                  ))
                ) : (
                  <span className="text-gray-500 text-sm">No weak bigrams detected yet. Complete some practice sessions first.</span>
                )}
              </div>
            </div>
          </GlassCard>
          
          <GlassCard>
            <h3 className="font-heading font-bold mb-4 text-violet-400">Drill Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Difficulty</label>
                <select 
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as any)}
                  className="glass w-full p-2 rounded-lg"
                >
                  {DIFFICULTIES.map(d => (
                    <option key={d.id} value={d.id}>{d.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Duration</label>
                <select 
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="glass w-full p-2 rounded-lg"
                >
                  {DURATIONS.map(d => (
                    <option key={d.id} value={d.id}>{d.label}</option>
                  ))}
                </select>
              </div>
              
              <div className="pt-2">
                <button 
                  onClick={generateAdaptiveDrill}
                  disabled={weakKeys.length === 0 && weakBigrams.length === 0}
                  className="w-full py-3 bg-violet-500 hover:bg-violet-600 disabled:bg-gray-700 rounded-lg font-medium transition-colors"
                >
                  Generate Drill
                </button>
                
                <p className="text-gray-400 text-sm mt-2 text-center">
                  {weakKeys.length === 0 && weakBigrams.length === 0 
                    ? 'Complete practice sessions to identify weaknesses' 
                    : 'Over-represents your weak keys and bigrams'}
                </p>
              </div>
            </div>
          </GlassCard>
        </div>
        
        {showPreview && (
          <GlassCard className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-heading font-bold">Drill Preview</h3>
              <button 
                onClick={generateAdaptiveDrill}
                className="text-sm px-3 py-1 glass rounded-lg hover:bg-white/10 transition-colors"
              >
                ↻ Regenerate
              </button>
            </div>
            
            <div className="font-mono text-lg leading-relaxed mb-6 p-4 glass rounded-lg max-h-60 overflow-y-auto">
              {drillText}
            </div>
            
            <div className="flex justify-center">
              <button 
                onClick={() => {}}
                className="px-6 py-3 bg-teal-500 hover:bg-teal-600 rounded-lg font-medium transition-colors"
              >
                Start Drill
              </button>
            </div>
          </GlassCard>
        )}
        
        <GlassCard>
          <h3 className="font-heading font-bold mb-4">Custom Drill Builder</h3>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Focus Keys</label>
              <input 
                type="text" 
                placeholder="e.g. asdf jkl;"
                className="glass w-full p-2 rounded-lg"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Focus Bigrams</label>
              <input 
                type="text" 
                placeholder="e.g. th er in"
                className="glass w-full p-2 rounded-lg"
              />
            </div>
          </div>
          
          <div className="flex justify-center">
            <button 
              onClick={() => {}}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              Create Custom Drill
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

export default DrillsPage