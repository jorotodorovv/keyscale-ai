import React from 'react';
import TypingSurface from '../components/TypingSurface';

const Play: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-center">Practice</h1>
      <TypingSurface />
    </div>
  );
};

export default Play;