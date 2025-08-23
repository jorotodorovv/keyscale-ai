// src/components/KeycapBadge.tsx
import React from 'react'

interface KeycapBadgeProps {
  char: string
  className?: string
}

const KeycapBadge: React.FC<KeycapBadgeProps> = ({ char, className = '' }) => {
  return (
    <span className={`keycap-badge ${className}`}>
      {char === ' ' ? '␣' : char}
    </span>
  )
}

export default KeycapBadge