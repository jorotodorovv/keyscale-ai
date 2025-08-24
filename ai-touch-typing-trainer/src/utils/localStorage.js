"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFromLocalStorage = exports.loadFromLocalStorage = exports.saveToLocalStorage = void 0;
// Utility functions for localStorage with proper serialization
var saveToLocalStorage = function (key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    }
    catch (error) {
        console.error("Error saving to localStorage (key: ".concat(key, "):"), error);
    }
};
exports.saveToLocalStorage = saveToLocalStorage;
var loadFromLocalStorage = function (key, defaultValue) {
    try {
        var item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    }
    catch (error) {
        console.error("Error loading from localStorage (key: ".concat(key, "):"), error);
        return defaultValue;
    }
};
exports.loadFromLocalStorage = loadFromLocalStorage;
var removeFromLocalStorage = function (key) {
    try {
        localStorage.removeItem(key);
    }
    catch (error) {
        console.error("Error removing from localStorage (key: ".concat(key, "):"), error);
    }
};
exports.removeFromLocalStorage = removeFromLocalStorage;
