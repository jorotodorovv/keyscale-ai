import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

const GlassCard = ({ children, className = '' }: GlassCardProps) => {
  return (
    <div className={`glass-card ${className}`}>
      {children}
    </div>
  );
};

export default GlassCard;