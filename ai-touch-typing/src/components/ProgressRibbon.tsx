interface ProgressRibbonProps {
  progress: number; // 0-100
  className?: string;
}

const ProgressRibbon = ({ progress, className = '' }: ProgressRibbonProps) => {
  return (
    <div className={`progress-ribbon ${className}`}>
      <div 
        className="progress-ribbon-fill" 
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressRibbon;