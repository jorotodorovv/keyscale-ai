import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '' }) => {
  return (
    <div className={`backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg ${className}`}>
      {children}
    </div>
  );
};

export default GlassCard;