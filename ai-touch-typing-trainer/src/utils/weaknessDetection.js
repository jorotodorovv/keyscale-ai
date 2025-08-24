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
exports.getTopWeakBigrams = exports.getTopWeakKeys = exports.updateWeaknessProfile = exports.saveWeaknessProfile = exports.loadWeaknessProfile = void 0;
var localStorage_1 = require("./localStorage");
// Initialize empty weakness profile
var initializeWeaknessProfile = function () { return ({
    keys: {},
    bigrams: {}
}); };
// Load weakness profile from localStorage or initialize
var loadWeaknessProfile = function () {
    return (0, localStorage_1.loadFromLocalStorage)('weaknessProfile', initializeWeaknessProfile());
};
exports.loadWeaknessProfile = loadWeaknessProfile;
// Save weakness profile to localStorage
var saveWeaknessProfile = function (profile) {
    (0, localStorage_1.saveToLocalStorage)('weaknessProfile', profile);
};
exports.saveWeaknessProfile = saveWeaknessProfile;
// Update weakness profile with new typing data
var updateWeaknessProfile = function (profile, text, userInput) {
    var updatedProfile = __assign({}, profile);
    // Update key profiles
    for (var i = 0; i < userInput.length; i++) {
        var key = text[i] || '';
        if (!key)
            continue;
        if (!updatedProfile.keys[key]) {
            updatedProfile.keys[key] = {
                key: key,
                count: 0,
                errors: 0,
                accuracy: 100
            };
        }
        updatedProfile.keys[key].count += 1;
        if (text[i] !== userInput[i]) {
            updatedProfile.keys[key].errors += 1;
        }
        // Recalculate accuracy
        updatedProfile.keys[key].accuracy =
            ((updatedProfile.keys[key].count - updatedProfile.keys[key].errors) /
                updatedProfile.keys[key].count) * 100;
    }
    // Update bigram profiles
    for (var i = 0; i < userInput.length - 1; i++) {
        var bigram = text.slice(i, i + 2);
        if (bigram.length < 2)
            continue;
        if (!updatedProfile.bigrams[bigram]) {
            updatedProfile.bigrams[bigram] = {
                bigram: bigram,
                count: 0,
                errors: 0,
                accuracy: 100
            };
        }
        updatedProfile.bigrams[bigram].count += 1;
        if (text[i] !== userInput[i] || text[i + 1] !== userInput[i + 1]) {
            updatedProfile.bigrams[bigram].errors += 1;
        }
        // Recalculate accuracy
        updatedProfile.bigrams[bigram].accuracy =
            ((updatedProfile.bigrams[bigram].count - updatedProfile.bigrams[bigram].errors) /
                updatedProfile.bigrams[bigram].count) * 100;
    }
    return updatedProfile;
};
exports.updateWeaknessProfile = updateWeaknessProfile;
// Get top weak keys (with threshold)
var getTopWeakKeys = function (profile, threshold, limit) {
    if (threshold === void 0) { threshold = 95; }
    if (limit === void 0) { limit = 5; }
    return Object.values(profile.keys)
        .filter(function (key) { return key.accuracy < threshold && key.count > 2; }) // Only consider keys typed more than 2 times
        .sort(function (a, b) { return a.accuracy - b.accuracy; })
        .slice(0, limit);
};
exports.getTopWeakKeys = getTopWeakKeys;
// Get top weak bigrams (with threshold)
var getTopWeakBigrams = function (profile, threshold, limit) {
    if (threshold === void 0) { threshold = 95; }
    if (limit === void 0) { limit = 5; }
    return Object.values(profile.bigrams)
        .filter(function (bigram) { return bigram.accuracy < threshold && bigram.count > 2; }) // Only consider bigrams typed more than 2 times
        .sort(function (a, b) { return a.accuracy - b.accuracy; })
        .slice(0, limit);
};
exports.getTopWeakBigrams = getTopWeakBigrams;
