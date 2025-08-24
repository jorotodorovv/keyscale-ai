"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
var Layout = function (_a) {
    var children = _a.children;
    var location = (0, react_router_dom_1.useLocation)();
    var navItems = [
        { path: '/play', label: 'Play' },
        { path: '/drills', label: 'Drills' },
        { path: '/analytics', label: 'Analytics' },
        { path: '/settings', label: 'Settings' },
    ];
    return (<div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Progress bar at the top */}
      <div className="h-1 w-full bg-gray-700">
        <div className="h-full bg-cyan-400 w-0"></div>
      </div>
      
      {/* Navigation */}
      <nav className="flex justify-center py-4">
        <ul className="flex space-x-8">
          {navItems.map(function (item) { return (<li key={item.path}>
              <react_router_dom_1.Link to={item.path} className={"px-4 py-2 rounded-lg transition-all duration-300 ".concat(location.pathname === item.path
                ? 'bg-cyan-500 text-gray-900 font-bold'
                : 'hover:bg-gray-800')}>
                {item.label}
              </react_router_dom_1.Link>
            </li>); })}
        </ul>
      </nav>
      
      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>);
};
exports.default = Layout;
