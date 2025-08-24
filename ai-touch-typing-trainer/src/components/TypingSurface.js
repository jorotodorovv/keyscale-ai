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
var GlassCard_1 = __importDefault(require("./ui/GlassCard"));
var MetricPill_1 = __importDefault(require("./ui/MetricPill"));
var ProgressRibbon_1 = __importDefault(require("./ui/ProgressRibbon"));
var weaknessDetection_1 = require("../utils/weaknessDetection");
var analytics_1 = require("../utils/analytics");
// Sample text for typing practice
var SAMPLE_TEXT = "The quick brown fox jumps over the lazy dog. This is a sample text for typing practice. Try to type as accurately and quickly as possible.";
var TypingSurface = function () {
    var text = (0, react_1.useState)(SAMPLE_TEXT)[0];
    var _a = (0, react_1.useState)(''), userInput = _a[0], setUserInput = _a[1];
    var _b = (0, react_1.useState)(0), wpm = _b[0], setWpm = _b[1];
    var _c = (0, react_1.useState)(100), accuracy = _c[0], setAccuracy = _c[1];
    var _d = (0, react_1.useState)(0), timeElapsed = _d[0], setTimeElapsed = _d[1];
    var _e = (0, react_1.useState)(false), isTimerRunning = _e[0], setIsTimerRunning = _e[1];
    var _f = (0, react_1.useState)(false), testCompleted = _f[0], setTestCompleted = _f[1];
    var textareaRef = (0, react_1.useRef)(null);
    // Focus the textarea on initial render
    (0, react_1.useEffect)(function () {
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    }, []);
    // Timer effect
    (0, react_1.useEffect)(function () {
        var interval = null;
        if (isTimerRunning) {
            interval = window.setInterval(function () {
                setTimeElapsed(function (prev) { return prev + 1; });
            }, 1000);
        }
        return function () {
            if (interval)
                clearInterval(interval);
        };
    }, [isTimerRunning]);
    // Calculate metrics
    (0, react_1.useEffect)(function () {
        // Calculate WPM (words per minute)
        // A word is typically 5 characters including spaces
        var words = userInput.length / 5;
        var minutes = timeElapsed / 60;
        var calculatedWpm = minutes > 0 ? Math.round(words / minutes) : 0;
        setWpm(calculatedWpm);
        // Calculate accuracy
        if (userInput.length > 0) {
            var correctChars = 0;
            for (var i = 0; i < userInput.length; i++) {
                if (userInput[i] === text[i]) {
                    correctChars++;
                }
            }
            var calculatedAccuracy = Math.round((correctChars / userInput.length) * 100);
            setAccuracy(calculatedAccuracy);
        }
        else {
            setAccuracy(100);
        }
        // Start timer on first keystroke
        if (userInput.length > 0 && !isTimerRunning) {
            setIsTimerRunning(true);
        }
        // Check if test is completed
        if (userInput.length === text.length && userInput.length > 0) {
            setIsTimerRunning(false);
            setTestCompleted(true);
            // Update weakness profile
            var profile = (0, weaknessDetection_1.loadWeaknessProfile)();
            var updatedProfile = (0, weaknessDetection_1.updateWeaknessProfile)(profile, text, userInput);
            (0, weaknessDetection_1.saveWeaknessProfile)(updatedProfile);
            // Save session to analytics
            var mistakes = userInput.split('').reduce(function (count, char, index) {
                return char !== text[index] ? count + 1 : count;
            }, 0);
            (0, analytics_1.addSession)({
                date: new Date(),
                wpm: wpm,
                accuracy: accuracy,
                duration: timeElapsed,
                textLength: text.length,
                mistakes: mistakes
            });
            // Log weak keys and bigrams for debugging
            console.log('Top weak keys:', (0, weaknessDetection_1.getTopWeakKeys)(updatedProfile));
            console.log('Top weak bigrams:', (0, weaknessDetection_1.getTopWeakBigrams)(updatedProfile));
        }
    }, [userInput, text, timeElapsed, isTimerRunning, wpm, accuracy]);
    var handleInputChange = function (e) {
        // Prevent typing more characters than the text length
        if (e.target.value.length <= text.length) {
            setUserInput(e.target.value);
        }
    };
    var resetTest = function () {
        setUserInput('');
        setTimeElapsed(0);
        setWpm(0);
        setAccuracy(100);
        setIsTimerRunning(false);
        setTestCompleted(false);
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    };
    // Calculate progress percentage
    var progress = (userInput.length / text.length) * 100;
    return (<div className="space-y-8">
      <h1 className="text-3xl font-bold text-center">Typing Test</h1>
      
      {/* Metrics HUD */}
      <div className="flex justify-center space-x-4">
        <MetricPill_1.default label="WPM" value={wpm}/>
        <MetricPill_1.default label="ACCURACY" value={"".concat(accuracy, "%")}/>
        <MetricPill_1.default label="TIME" value={"".concat(timeElapsed, "s")}/>
      </div>
      
      {/* Progress ribbon */}
      <ProgressRibbon_1.default progress={progress}/>
      
      {/* Typing surface */}
      <GlassCard_1.default className="p-8">
        <div className="mb-6 min-h-[100px]">
          {text.split('').map(function (char, index) {
            var charClass = 'text-white';
            if (index < userInput.length) {
                charClass = userInput[index] === char
                    ? 'text-green-400'
                    : 'text-red-400 bg-red-900/50';
            }
            else if (index === userInput.length && !testCompleted) {
                charClass = 'text-cyan-400 animate-pulse';
            }
            return (<span key={index} className={"".concat(charClass, " ").concat(index === userInput.length && !testCompleted ? 'underline' : '')}>
                {char}
              </span>);
        })}
        </div>
        
        <textarea ref={textareaRef} value={userInput} onChange={handleInputChange} className="w-full bg-black/30 text-white rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-cyan-400" rows={4} placeholder="Start typing here..." disabled={testCompleted}/>
      </GlassCard_1.default>
      
      {/* Completion summary */}
      {testCompleted && (<GlassCard_1.default className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">Test Completed!</h2>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <MetricPill_1.default label="WPM" value={wpm}/>
            <MetricPill_1.default label="ACCURACY" value={"".concat(accuracy, "%")}/>
            <MetricPill_1.default label="TIME" value={"".concat(timeElapsed, "s")}/>
          </div>
          <p className="text-center text-cyan-400">Your results have been saved to analytics.</p>
        </GlassCard_1.default>)}
      
      {/* Controls */}
      <div className="flex justify-center">
        <button onClick={resetTest} className="px-6 py-3 bg-cyan-500 text-gray-900 font-bold rounded-lg hover:bg-cyan-400 transition-colors">
          {testCompleted ? 'Try Again' : 'Reset Test'}
        </button>
      </div>
    </div>);
};
exports.default = TypingSurface;
