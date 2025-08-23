// src/components/MetricPill.tsx
import React from 'react'

interface MetricPillProps {
  label: string
  value: string | number
  className?: string
}

const MetricPill: React.FC<MetricPillProps> = ({ label, value, className = '' }) => {
  return (
    <div className={`metric-pill ${className}`}>
      <span className="text-gray-400 mr-1">{label}:</span>
      <span className="font-bold">{value}</span>
    </div>
  )
}

export default MetricPill