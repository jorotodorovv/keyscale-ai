"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var ProgressRibbon = function (_a) {
    var progress = _a.progress, _b = _a.className, className = _b === void 0 ? '' : _b;
    return (<div className={"h-2 w-full bg-gray-700 rounded-full overflow-hidden ".concat(className)}>
      <div className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full transition-all duration-300" style={{ width: "".concat(progress, "%") }}/>
    </div>);
};
exports.default = ProgressRibbon;
