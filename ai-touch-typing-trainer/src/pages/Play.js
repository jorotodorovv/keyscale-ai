"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var TypingSurface_1 = __importDefault(require("../components/TypingSurface"));
var Play = function () {
    return (<div className="space-y-8">
      <h1 className="text-3xl font-bold text-center">Practice</h1>
      <TypingSurface_1.default />
    </div>);
};
exports.default = Play;
