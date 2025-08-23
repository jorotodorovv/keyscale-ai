// src/components/NeonToggle.tsx
import React from 'react'

interface NeonToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  className?: string
}

const NeonToggle: React.FC<NeonToggleProps> = ({ checked, onChange, className = '' }) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`neon-toggle ${className}`}
    >
      <span 
        className="neon-toggle-bg" 
        data-checked={checked ? '' : undefined}
      >
        <span 
          className="neon-toggle-thumb" 
          data-checked={checked ? '' : undefined}
        />
      </span>
    </button>
  )
}

export default NeonToggle