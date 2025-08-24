"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateAverageAccuracy = exports.calculateAverageWpm = exports.calculateStreak = exports.getRecentSessions = exports.addSession = exports.saveSessions = exports.loadSessions = void 0;
var localStorage_1 = require("./localStorage");
// Load sessions from localStorage
var loadSessions = function () {
    return (0, localStorage_1.loadFromLocalStorage)('typingSessions', []);
};
exports.loadSessions = loadSessions;
// Save sessions to localStorage
var saveSessions = function (sessions) {
    // Keep only the last 50 sessions
    var limitedSessions = sessions.slice(-50);
    (0, localStorage_1.saveToLocalStorage)('typingSessions', limitedSessions);
};
exports.saveSessions = saveSessions;
// Add a new session
var addSession = function (session) {
    var sessions = (0, exports.loadSessions)();
    var newSession = __assign(__assign({}, session), { id: Date.now().toString(), date: session.date.toISOString() // Convert Date to ISO string for storage
     });
    sessions.push(newSession);
    (0, exports.saveSessions)(sessions);
};
exports.addSession = addSession;
// Get recent sessions
var getRecentSessions = function (count) {
    if (count === void 0) { count = 10; }
    var sessions = (0, exports.loadSessions)();
    return sessions.slice(-count).reverse();
};
exports.getRecentSessions = getRecentSessions;
// Calculate streak (consecutive days with practice)
var calculateStreak = function () {
    var sessions = (0, exports.loadSessions)();
    if (sessions.length === 0)
        return 0;
    // Sort sessions by date
    sessions.sort(function (a, b) { return new Date(b.date).getTime() - new Date(a.date).getTime(); });
    var streak = 1;
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    // Check if last session was today
    var lastSessionDate = new Date(sessions[0].date);
    lastSessionDate.setHours(0, 0, 0, 0);
    if (lastSessionDate.getTime() !== today.getTime()) {
        // If last session wasn't today, check if it was yesterday
        var yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        if (lastSessionDate.getTime() !== yesterday.getTime()) {
            return 0; // No streak
        }
        // If it was yesterday, streak starts at 1 (already set)
    }
    // Count consecutive days
    for (var i = 0; i < sessions.length - 1; i++) {
        var currentDate = new Date(sessions[i].date);
        currentDate.setHours(0, 0, 0, 0);
        var nextDate = new Date(sessions[i + 1].date);
        nextDate.setHours(0, 0, 0, 0);
        // Calculate difference in days
        var diffTime = currentDate.getTime() - nextDate.getTime();
        var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
            streak++;
        }
        else if (diffDays > 1) {
            break; // Break the streak
        }
    }
    return streak;
};
exports.calculateStreak = calculateStreak;
// Calculate average WPM
var calculateAverageWpm = function () {
    var sessions = (0, exports.loadSessions)();
    if (sessions.length === 0)
        return 0;
    var totalWpm = sessions.reduce(function (sum, session) { return sum + session.wpm; }, 0);
    return Math.round(totalWpm / sessions.length);
};
exports.calculateAverageWpm = calculateAverageWpm;
// Calculate average accuracy
var calculateAverageAccuracy = function () {
    var sessions = (0, exports.loadSessions)();
    if (sessions.length === 0)
        return 0;
    var totalAccuracy = sessions.reduce(function (sum, session) { return sum + session.accuracy; }, 0);
    return Math.round(totalAccuracy / sessions.length);
};
exports.calculateAverageAccuracy = calculateAverageAccuracy;
