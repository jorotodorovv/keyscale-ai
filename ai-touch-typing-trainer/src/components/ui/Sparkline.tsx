import React from 'react';

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
}

const Sparkline: React.FC<SparklineProps> = ({ 
  data, 
  width = 100, 
  height = 70, 
  color = 'cyan' 
}: SparklineProps) => {
  if (data.length === 0) {
    return <div className="text-gray-500">No data</div>;
  }

  // Normalize data to fit within SVG viewBox
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1; // Avoid division by zero

  // Create SVG path
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <polyline
        fill="none"
        stroke={color === 'cyan' ? '#00FFFF' : color}
        strokeWidth="2"
        points={points}
      />
      <circle
        cx={width}
        cy={height - ((data[data.length - 1] - min) / range) * height}
        r="2"
        fill={color === 'cyan' ? '#00FFFF' : color}
      />
    </svg>
  );
};

export default Sparkline;