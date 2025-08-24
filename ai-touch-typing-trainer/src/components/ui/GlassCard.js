"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var GlassCard = function (_a) {
    var children = _a.children, _b = _a.className, className = _b === void 0 ? '' : _b;
    return (<div className={"backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg ".concat(className)}>
      {children}
    </div>);
};
exports.default = GlassCard;
