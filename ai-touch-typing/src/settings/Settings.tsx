import NeonToggle from '../components/NeonToggle';

const Settings = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="glass-card p-6">
        <h2 className="text-2xl font-bold mb-6">Settings</h2>
        
        <div className="space-y-6">
          <div className="glass-card p-4">
            <h3 className="font-semibold mb-3">Layout</h3>
            <div className="flex items-center">
              <select className="p-2 bg-gray-800 border border-gray-700 rounded">
                <option>QWERTY</option>
              </select>
            </div>
          </div>
          
          <div className="glass-card p-4">
            <h3 className="font-semibold mb-3">Theme</h3>
            <div className="flex items-center justify-between">
              <span>Dark Theme</span>
              <NeonToggle id="theme-toggle" checked={true} />
            </div>
          </div>
          
          <div className="glass-card p-4">
            <h3 className="font-semibold mb-3">Sound</h3>
            <div className="flex items-center justify-between">
              <span>Enable Sound Effects</span>
              <NeonToggle id="sound-toggle" checked={true} />
            </div>
          </div>
          
          <div className="glass-card p-4">
            <h3 className="font-semibold mb-3">Accessibility</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Font Size</span>
                <select className="p-2 bg-gray-800 border border-gray-700 rounded">
                  <option>Small</option>
                  <option selected>Medium</option>
                  <option>Large</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between">
                <span>AA Contrast</span>
                <NeonToggle id="contrast-toggle" />
              </div>
              
              <div className="flex items-center justify-between">
                <span>Reduced Motion</span>
                <NeonToggle id="motion-toggle" />
              </div>
            </div>
          </div>
          
          <div className="glass-card p-4">
            <h3 className="font-semibold mb-3">Data Management</h3>
            <div className="flex space-x-3">
              <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded">
                Export Data
              </button>
              <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded">
                Import Data
              </button>
              <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded">
                Clear All Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;