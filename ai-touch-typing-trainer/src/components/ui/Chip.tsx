import React from 'react';

interface ChipProps {
  label: string;
  onClick?: () => void;
  selected?: boolean;
  className?: string;
}

const Chip: React.FC<ChipProps> = ({ label, onClick, selected = false, className = '' }: ChipProps) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
        selected
          ? 'bg-cyan-500 text-gray-900 font-bold'
          : 'bg-black/30 hover:bg-black/50'
      } ${className}`}
    >
      {label}
    </button>
  );
};

export default Chip;