"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var NeonToggle = function (_a) {
    var isToggled = _a.isToggled, onToggle = _a.onToggle, label = _a.label, _b = _a.className, className = _b === void 0 ? '' : _b;
    return (<div className={"flex items-center ".concat(className)}>
      {label && <span className="mr-3 text-sm">{label}</span>}
      <button onClick={onToggle} className={"relative w-12 h-6 rounded-full transition-colors duration-300 ease-in-out ".concat(isToggled ? 'bg-cyan-500' : 'bg-gray-700')}>
        <div className={"absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ease-in-out ".concat(isToggled ? 'transform translate-x-7' : 'translate-x-1')}/>
      </button>
    </div>);
};
exports.default = NeonToggle;
