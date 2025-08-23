interface TinySparklineProps {
  data: number[];
  className?: string;
}

const TinySparkline = ({ data, className = '' }: TinySparklineProps) => {
  if (data.length === 0) return null;
  
  // Find min and max values for scaling
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1; // Avoid division by zero
  
  // Create SVG path
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((value - min) / range) * 100;
    return `${x},${y}`;
  }).join(' ');
  
  return (
    <div className={`h-12 ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <polyline 
          points={points} 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
};

export default TinySparkline;