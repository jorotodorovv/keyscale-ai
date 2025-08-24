"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Sparkline = function (_a) {
    var data = _a.data, _b = _a.width, width = _b === void 0 ? 100 : _b, _c = _a.height, height = _c === void 0 ? 70 : _c, _d = _a.color, color = _d === void 0 ? 'cyan' : _d;
    if (data.length === 0) {
        return <div className="text-gray-500">No data</div>;
    }
    // Normalize data to fit within SVG viewBox
    var max = Math.max.apply(Math, data);
    var min = Math.min.apply(Math, data);
    var range = max - min || 1; // Avoid division by zero
    // Create SVG path
    var points = data.map(function (value, index) {
        var x = (index / (data.length - 1)) * width;
        var y = height - ((value - min) / range) * height;
        return "".concat(x, ",").concat(y);
    }).join(' ');
    return (<svg width={width} height={height} viewBox={"0 0 ".concat(width, " ").concat(height)} className="overflow-visible">
      <polyline fill="none" stroke={color === 'cyan' ? '#00FFFF' : color} strokeWidth="2" points={points}/>
      <circle cx={width} cy={height - ((data[data.length - 1] - min) / range) * height} r="2" fill={color === 'cyan' ? '#00FFFF' : color}/>
    </svg>);
};
exports.default = Sparkline;
