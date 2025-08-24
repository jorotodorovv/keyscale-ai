"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var AppContext_1 = require("../context/AppContext");
var GlassCard_1 = __importDefault(require("../components/ui/GlassCard"));
var NeonToggle_1 = __importDefault(require("../components/ui/NeonToggle"));
var Chip_1 = __importDefault(require("../components/ui/Chip"));
var Toast_1 = __importDefault(require("../components/ui/Toast"));
var Settings = function () {
    var _a = (0, AppContext_1.useAppContext)(), theme = _a.theme, setTheme = _a.setTheme, soundEnabled = _a.soundEnabled, setSoundEnabled = _a.setSoundEnabled, fontSize = _a.fontSize, setFontSize = _a.setFontSize;
    var _b = (0, react_1.useState)(null), toast = _b[0], setToast = _b[1];
    var themes = ['light', 'dark'];
    var fontSizes = [14, 16, 18, 20, 22];
    var exportData = function () {
        try {
            var data = {
                theme: theme,
                soundEnabled: soundEnabled,
                fontSize: fontSize,
                weaknessProfile: localStorage.getItem('weaknessProfile'),
                typingSessions: localStorage.getItem('typingSessions')
            };
            var dataStr = JSON.stringify(data, null, 2);
            var dataUri = "data:application/json;charset=utf-8,".concat(encodeURIComponent(dataStr));
            var exportFileDefaultName = "typing-trainer-data-".concat(new Date().toISOString().slice(0, 10), ".json");
            var linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            linkElement.click();
            setToast({ message: 'Data exported successfully!', type: 'success' });
        }
        catch (error) {
            setToast({ message: 'Failed to export data', type: 'error' });
        }
    };
    var importData = function () {
        setToast({ message: 'Import functionality would be implemented in a full version', type: 'info' });
    };
    var clearData = function () {
        if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
            try {
                localStorage.removeItem('weaknessProfile');
                localStorage.removeItem('typingSessions');
                setToast({ message: 'Data cleared successfully!', type: 'success' });
            }
            catch (error) {
                setToast({ message: 'Failed to clear data', type: 'error' });
            }
        }
    };
    var handleToastClose = function () {
        setToast(null);
    };
    return (<div className="space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">Settings</h1>
      
      {toast && (<Toast_1.default message={toast.message} type={toast.type} onClose={handleToastClose}/>)}
      
      <GlassCard_1.default>
        <h2 className="text-xl font-bold mb-4">Appearance</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Theme</h3>
            <div className="flex space-x-4">
              {themes.map(function (t) { return (<Chip_1.default key={t} label={t.charAt(0).toUpperCase() + t.slice(1)} selected={theme === t} onClick={function () { return setTheme(t); }}/>); })}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Font Size</h3>
            <div className="flex space-x-4">
              {fontSizes.map(function (size) { return (<Chip_1.default key={size} label={"".concat(size, "px")} selected={fontSize === size} onClick={function () { return setFontSize(size); }}/>); })}
            </div>
          </div>
        </div>
      </GlassCard_1.default>
      
      <GlassCard_1.default>
        <h2 className="text-xl font-bold mb-4">Preferences</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Sound Effects</span>
            <NeonToggle_1.default isToggled={soundEnabled} onToggle={function () { return setSoundEnabled(!soundEnabled); }}/>
          </div>
        </div>
      </GlassCard_1.default>
      
      <GlassCard_1.default>
        <h2 className="text-xl font-bold mb-4">Data Management</h2>
        <div className="flex flex-wrap gap-4">
          <button onClick={exportData} className="px-4 py-2 bg-cyan-500 text-gray-900 rounded-lg font-bold hover:bg-cyan-400 transition-colors">
            Export Data
          </button>
          <button onClick={importData} className="px-4 py-2 bg-purple-500 text-white rounded-lg font-bold hover:bg-purple-400 transition-colors">
            Import Data
          </button>
          <button onClick={clearData} className="px-4 py-2 bg-red-500 text-white rounded-lg font-bold hover:bg-red-400 transition-colors">
            Clear Data
          </button>
        </div>
      </GlassCard_1.default>
    </div>);
};
exports.default = Settings;
