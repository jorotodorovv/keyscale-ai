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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAppContext = exports.AppProvider = void 0;
var react_1 = __importStar(require("react"));
var localStorage_1 = require("../utils/localStorage");
// Create the context with default values
var AppContext = (0, react_1.createContext)({
    theme: 'dark',
    setTheme: function () { },
    soundEnabled: true,
    setSoundEnabled: function () { },
    fontSize: 16,
    setFontSize: function () { },
});
// Create a provider component
var AppProvider = function (_a) {
    var children = _a.children;
    // Load initial values from localStorage or use defaults
    var _b = (0, react_1.useState)((0, localStorage_1.loadFromLocalStorage)('theme', 'dark')), theme = _b[0], setTheme = _b[1];
    var _c = (0, react_1.useState)((0, localStorage_1.loadFromLocalStorage)('soundEnabled', true)), soundEnabled = _c[0], setSoundEnabled = _c[1];
    var _d = (0, react_1.useState)((0, localStorage_1.loadFromLocalStorage)('fontSize', 16)), fontSize = _d[0], setFontSize = _d[1];
    // Save to localStorage whenever values change
    var updateTheme = function (newTheme) {
        setTheme(newTheme);
        (0, localStorage_1.saveToLocalStorage)('theme', newTheme);
    };
    var updateSoundEnabled = function (enabled) {
        setSoundEnabled(enabled);
        (0, localStorage_1.saveToLocalStorage)('soundEnabled', enabled);
    };
    var updateFontSize = function (size) {
        setFontSize(size);
        (0, localStorage_1.saveToLocalStorage)('fontSize', size);
    };
    return (<AppContext.Provider value={{
            theme: theme,
            setTheme: updateTheme,
            soundEnabled: soundEnabled,
            setSoundEnabled: updateSoundEnabled,
            fontSize: fontSize,
            setFontSize: updateFontSize,
        }}>
      {children}
    </AppContext.Provider>);
};
exports.AppProvider = AppProvider;
// Create a custom hook for using the context
var useAppContext = function () {
    var context = (0, react_1.useContext)(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
exports.useAppContext = useAppContext;
