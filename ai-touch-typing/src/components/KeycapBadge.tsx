interface KeycapBadgeProps {
  keyChar: string;
  errorRate?: number; // 0-100
  className?: string;
}

const KeycapBadge = ({ keyChar, errorRate, className = '' }: KeycapBadgeProps) => {
  // Determine color based on error rate
  let bgColor = 'bg-gray-700';
  if (errorRate !== undefined) {
    if (errorRate > 50) {
      bgColor = 'bg-red-500';
    } else if (errorRate > 25) {
      bgColor = 'bg-orange-500';
    } else if (errorRate > 10) {
      bgColor = 'bg-yellow-500';
    } else {
      bgColor = 'bg-green-500';
    }
  }
  
  return (
    <div className={`inline-flex items-center justify-center w-8 h-8 rounded font-mono font-bold ${bgColor} ${className}`}>
      {keyChar}
    </div>
  );
};

export default KeycapBadge;