import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Settings from './pages/Settings';
import Play from './pages/Play';
import Drills from './pages/Drills';
import Analytics from './pages/Analytics';
import { AppProvider } from './context/AppContext';
import './App.css';

// Page components
const Home = () => <div className="text-3xl font-bold">Home</div>;

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/play" element={<Play />} />
            <Route path="/drills" element={<Drills />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;