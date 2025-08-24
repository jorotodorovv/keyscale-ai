import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout: React.FC<React.PropsWithChildren<{}>> = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  const navItems = [
    { path: '/play', label: 'Play' },
    { path: '/drills', label: 'Drills' },
    { path: '/analytics', label: 'Analytics' },
    { path: '/settings', label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Progress bar at the top */}
      <div className="h-1 w-full bg-gray-700">
        <div className="h-full bg-cyan-400 w-0"></div>
      </div>
      
      {/* Navigation */}
      <nav className="flex justify-center py-4">
        <ul className="flex space-x-8">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  location.pathname === item.path
                    ? 'bg-cyan-500 text-gray-900 font-bold'
                    : 'hover:bg-gray-800'
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;