import { ReactNode } from 'react';

interface MetricPillProps {
  label: string;
  value: ReactNode;
  className?: string;
}

const MetricPill = ({ label, value, className = '' }: MetricPillProps) => {
  return (
    <div className={`metric-pill ${className}`}>
      <span className="text-gray-400 text-sm">{label}</span>
      <span className="text-xl font-mono font-semibold">{value}</span>
    </div>
  );
};

export default MetricPill;