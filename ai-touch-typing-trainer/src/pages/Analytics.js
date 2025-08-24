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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var GlassCard_1 = __importDefault(require("../components/ui/GlassCard"));
var MetricPill_1 = __importDefault(require("../components/ui/MetricPill"));
var Sparkline_1 = __importDefault(require("../components/ui/Sparkline"));
var analytics_1 = require("../utils/analytics");
var Analytics = function () {
    var _a = (0, react_1.useState)([]), sessions = _a[0], setSessions = _a[1];
    var _b = (0, react_1.useState)(0), streak = _b[0], setStreak = _b[1];
    var _c = (0, react_1.useState)(0), avgWpm = _c[0], setAvgWpm = _c[1];
    var _d = (0, react_1.useState)(0), avgAccuracy = _d[0], setAvgAccuracy = _d[1];
    var _e = (0, react_1.useState)([]), wpmData = _e[0], setWpmData = _e[1];
    (0, react_1.useEffect)(function () {
        // Load data
        var loadedSessions = (0, analytics_1.loadSessions)();
        setSessions(loadedSessions);
        // Calculate metrics
        setStreak((0, analytics_1.calculateStreak)());
        setAvgWpm((0, analytics_1.calculateAverageWpm)());
        setAvgAccuracy((0, analytics_1.calculateAverageAccuracy)());
        // Prepare WPM data for sparkline (last 10 sessions)
        var recentWpmData = loadedSessions
            .slice(-10)
            .map(function (session) { return session.wpm; });
        setWpmData(recentWpmData);
    }, []);
    return (<div className="space-y-8">
      <h1 className="text-3xl font-bold text-center">Analytics</h1>
      
      {/* Summary metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricPill_1.default label="AVG WPM" value={avgWpm}/>
        <MetricPill_1.default label="AVG ACCURACY" value={"".concat(avgAccuracy, "%")}/>
        <MetricPill_1.default label="STREAK" value={streak}/>
        <MetricPill_1.default label="TOTAL SESSIONS" value={sessions.length}/>
      </div>
      
      {/* WPM Trend */}
      <GlassCard_1.default>
        <h2 className="text-xl font-bold mb-4">WPM Trend</h2>
        <div className="flex items-end space-x-4">
          <div className="flex-grow">
            <Sparkline_1.default data={wpmData} color="cyan"/>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{wpmData[wpmData.length - 1] || 0}</p>
            <p className="text-sm text-gray-400">Latest WPM</p>
          </div>
        </div>
      </GlassCard_1.default>
      
      {/* Recent Sessions */}
      <GlassCard_1.default>
        <h2 className="text-xl font-bold mb-4">Recent Sessions</h2>
        {sessions.length === 0 ? (<p className="text-gray-400 text-center py-4">No sessions yet. Complete a typing test to see analytics.</p>) : (<div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400">
                  <th className="pb-2">Date</th>
                  <th className="pb-2">WPM</th>
                  <th className="pb-2">Accuracy</th>
                  <th className="pb-2">Duration</th>
                </tr>
              </thead>
              <tbody>
                {__spreadArray([], sessions, true).reverse().slice(0, 5).map(function (session) { return (<tr key={session.id} className="border-t border-white/10">
                    <td className="py-2">
                      {new Date(session.date).toLocaleDateString()}
                    </td>
                    <td className="py-2">{session.wpm}</td>
                    <td className="py-2">{session.accuracy}%</td>
                    <td className="py-2">{session.duration}s</td>
                  </tr>); })}
              </tbody>
            </table>
          </div>)}
      </GlassCard_1.default>
    </div>);
};
exports.default = Analytics;
