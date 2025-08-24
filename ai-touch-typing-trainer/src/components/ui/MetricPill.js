"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var MetricPill = function (_a) {
    var label = _a.label, value = _a.value, _b = _a.className, className = _b === void 0 ? '' : _b;
    return (<div className={"flex flex-col items-center justify-center bg-black/30 rounded-lg px-4 py-2 ".concat(className)}>
      <span className="text-xs text-cyan-400 font-semibold">{label}</span>
      <span className="text-lg font-bold">{value}</span>
    </div>);
};
exports.default = MetricPill;
