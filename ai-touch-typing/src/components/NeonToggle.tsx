import { ReactNode } from 'react';

interface NeonToggleProps {
  id: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  children?: ReactNode;
}

const NeonToggle = ({ id, checked, onChange, className = '', children }: NeonToggleProps) => {
  return (
    <div className={`neon-toggle ${className}`}>
      <input 
        type="checkbox" 
        id={id} 
        className="neon-toggle-input" 
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <label htmlFor={id} className="neon-toggle-label">
        {children}
      </label>
    </div>
  );
};

export default NeonToggle;