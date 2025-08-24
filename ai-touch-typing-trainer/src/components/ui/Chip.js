"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Chip = function (_a) {
    var label = _a.label, onClick = _a.onClick, _b = _a.selected, selected = _b === void 0 ? false : _b, _c = _a.className, className = _c === void 0 ? '' : _c;
    return (<button onClick={onClick} className={"px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ".concat(selected
            ? 'bg-cyan-500 text-gray-900 font-bold'
            : 'bg-black/30 hover:bg-black/50', " ").concat(className)}>
      {label}
    </button>);
};
exports.default = Chip;
