import React from 'react';

interface NeonToggleProps {
  isToggled: boolean;
  onToggle: () => void;
  label?: string;
  className?: string;
}

const NeonToggle: React.FC<NeonToggleProps> = ({ isToggled, onToggle, label, className = '' }: NeonToggleProps) => {
  return (
    <div className={`flex items-center ${className}`}>
      {label && <span className="mr-3 text-sm">{label}</span>}
      <button
        onClick={onToggle}
        className={`relative w-12 h-6 rounded-full transition-colors duration-300 ease-in-out ${
          isToggled ? 'bg-cyan-500' : 'bg-gray-700'
        }`}
      >
        <div
          className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ease-in-out ${
            isToggled ? 'transform translate-x-7' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
};

export default NeonToggle;