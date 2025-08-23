import React from 'react';

interface MetricPillProps {
  label: string;
  value: string | number;
  className?: string;
}

const MetricPill: React.FC<MetricPillProps> = ({ label, value, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center bg-black/30 rounded-lg px-4 py-2 ${className}`}>
      <span className="text-xs text-cyan-400 font-semibold">{label}</span>
      <span className="text-lg font-bold">{value}</span>
    </div>
  );
};

export default MetricPill;