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
var GlassCard_1 = __importDefault(require("../components/ui/GlassCard"));
var Chip_1 = __importDefault(require("../components/ui/Chip"));
var Tooltip_1 = __importDefault(require("../components/ui/Tooltip"));
var weaknessDetection_1 = require("../utils/weaknessDetection");
var drillGenerator_1 = require("../utils/drillGenerator");
var Drills = function () {
    var _a = (0, react_1.useState)('medium'), difficulty = _a[0], setDifficulty = _a[1];
    var _b = (0, react_1.useState)('medium'), duration = _b[0], setDuration = _b[1];
    var _c = (0, react_1.useState)(''), drillText = _c[0], setDrillText = _c[1];
    var _d = (0, react_1.useState)([]), weakKeys = _d[0], setWeakKeys = _d[1];
    var _e = (0, react_1.useState)([]), weakBigrams = _e[0], setWeakBigrams = _e[1];
    // Load weakness profile on component mount
    (0, react_1.useEffect)(function () {
        var profile = (0, weaknessDetection_1.loadWeaknessProfile)();
        var topKeys = (0, weaknessDetection_1.getTopWeakKeys)(profile);
        var topBigrams = (0, weaknessDetection_1.getTopWeakBigrams)(profile);
        setWeakKeys(topKeys.map(function (k) { return k.key; }));
        setWeakBigrams(topBigrams.map(function (b) { return b.bigram; }));
        // Generate initial drill
        regenerateDrill();
    }, []);
    var regenerateDrill = function () {
        var profile = (0, weaknessDetection_1.loadWeaknessProfile)();
        var topKeys = (0, weaknessDetection_1.getTopWeakKeys)(profile);
        var topBigrams = (0, weaknessDetection_1.getTopWeakBigrams)(profile);
        var newDrill = (0, drillGenerator_1.generateDrill)(topKeys, topBigrams, difficulty, duration);
        setDrillText(newDrill);
    };
    var startDrill = function () {
        // In a full implementation, this would navigate to the typing test with the drill text
        alert('In a full implementation, this would start the typing drill with the generated text.');
    };
    return (<div className="space-y-8">
      <h1 className="text-3xl font-bold text-center">Adaptive Drills</h1>
      
      <GlassCard_1.default>
        <h2 className="text-xl font-bold mb-4">Generate Targeted Practice</h2>
        <p className="mb-6">
          Drills are generated based on your weak keys and bigrams: 
          <span className="text-cyan-400 ml-2">
            {weakKeys.join(', ') || 'No weak keys detected'}
          </span>
          <span className="text-purple-400 ml-2">
            {weakBigrams.join(', ') || 'No weak bigrams detected'}
          </span>
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-semibold mb-2">Difficulty</h3>
            <div className="flex space-x-4">
              {['easy', 'medium', 'hard'].map(function (level) { return (<Chip_1.default key={level} label={level.charAt(0).toUpperCase() + level.slice(1)} selected={difficulty === level} onClick={function () { return setDifficulty(level); }}/>); })}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Duration</h3>
            <div className="flex space-x-4">
              {['short', 'medium', 'long'].map(function (length) { return (<Chip_1.default key={length} label={length.charAt(0).toUpperCase() + length.slice(1)} selected={duration === length} onClick={function () { return setDuration(length); }}/>); })}
            </div>
          </div>
        </div>
        
        <div className="flex space-x-4">
          <button onClick={regenerateDrill} className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
            Regenerate
          </button>
          <Tooltip_1.default content="This will start a typing test with the generated drill text">
            <button onClick={startDrill} className="px-4 py-2 bg-cyan-500 text-gray-900 font-bold rounded-lg hover:bg-cyan-400 transition-colors">
              Start Drill
            </button>
          </Tooltip_1.default>
        </div>
      </GlassCard_1.default>
      
      <GlassCard_1.default>
        <h2 className="text-xl font-bold mb-4">Drill Preview</h2>
        <div className="p-4 bg-black/30 rounded-lg min-h-[100px]">
          {drillText || 'Generate a drill to see preview...'}
        </div>
      </GlassCard_1.default>
    </div>);
};
exports.default = Drills;
