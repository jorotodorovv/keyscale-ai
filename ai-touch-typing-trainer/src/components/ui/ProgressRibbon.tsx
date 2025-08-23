import React from 'react';

interface ProgressRibbonProps {
  progress: number; // 0-100
  className?: string;
}

const ProgressRibbon: React.FC<ProgressRibbonProps> = ({ progress, className = '' }) => {
  return (
    <div className={`h-2 w-full bg-gray-700 rounded-full overflow-hidden ${className}`}>
      <div 
        className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressRibbon;