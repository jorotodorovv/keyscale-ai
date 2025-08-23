import { Outlet, Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-violet-500">
            AI Touch Typing Trainer
          </h1>
        </header>
        
        <nav className="mb-8 flex justify-center space-x-4">
          <Link 
            to="/" 
            className="px-4 py-2 rounded-lg bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 hover:bg-gray-700 transition-colors"
          >
            Play
          </Link>
          <Link 
            to="/drills" 
            className="px-4 py-2 rounded-lg bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 hover:bg-gray-700 transition-colors"
          >
            Drills
          </Link>
          <Link 
            to="/analytics" 
            className="px-4 py-2 rounded-lg bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 hover:bg-gray-700 transition-colors"
          >
            Analytics
          </Link>
          <Link 
            to="/settings" 
            className="px-4 py-2 rounded-lg bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 hover:bg-gray-700 transition-colors"
          >
            Settings
          </Link>
        </nav>
        
        <main>
          <Outlet />
        </main>
        
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>AI Touch Typing Trainer &copy; {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
}

export default App;