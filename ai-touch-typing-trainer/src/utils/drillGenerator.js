"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDrill = void 0;
// Generate a drill based on weak keys and bigrams
var generateDrill = function (weakKeys, weakBigrams, difficulty, duration) {
    var _a;
    if (difficulty === void 0) { difficulty = 'medium'; }
    if (duration === void 0) { duration = 'medium'; }
    // Determine drill parameters based on difficulty and duration
    var keyCount = 3;
    var bigramCount = 2;
    var repetitionCount = 3;
    switch (difficulty) {
        case 'easy':
            keyCount = 2;
            bigramCount = 1;
            repetitionCount = 2;
            break;
        case 'hard':
            keyCount = 5;
            bigramCount = 4;
            repetitionCount = 5;
            break;
    }
    switch (duration) {
        case 'short':
            keyCount = Math.max(1, Math.floor(keyCount * 0.7));
            bigramCount = Math.max(1, Math.floor(bigramCount * 0.7));
            repetitionCount = Math.max(2, Math.floor(repetitionCount * 0.7));
            break;
        case 'long':
            keyCount = Math.ceil(keyCount * 1.5);
            bigramCount = Math.ceil(bigramCount * 1.5);
            repetitionCount = Math.ceil(repetitionCount * 1.5);
            break;
    }
    // Limit to available weak items
    keyCount = Math.min(keyCount, weakKeys.length);
    bigramCount = Math.min(bigramCount, weakBigrams.length);
    // Select weak keys and bigrams
    var selectedKeys = weakKeys.slice(0, keyCount);
    var selectedBigrams = weakBigrams.slice(0, bigramCount);
    // Generate drill content
    var drillParts = [];
    // Add key-focused drills
    selectedKeys.forEach(function (keyProfile) {
        var key = keyProfile.key;
        for (var i = 0; i < repetitionCount; i++) {
            // Create random sequences focusing on the weak key
            var sequenceLength = 5 + Math.floor(Math.random() * 5); // 5-9 characters
            var sequence = '';
            for (var j = 0; j < sequenceLength; j++) {
                // Higher chance of the weak key appearing
                if (Math.random() < 0.4) {
                    sequence += key;
                }
                else {
                    // Add random common characters
                    var commonChars = 'etaoinshrdlcumwfgypbvkjxqz ETAOINSHRDLCUMWFGYPBVKJXQZ';
                    sequence += commonChars[Math.floor(Math.random() * commonChars.length)];
                }
            }
            drillParts.push(sequence);
        }
    });
    // Add bigram-focused drills
    selectedBigrams.forEach(function (bigramProfile) {
        var bigram = bigramProfile.bigram;
        for (var i = 0; i < repetitionCount; i++) {
            // Create sentences focusing on the weak bigram
            var words = ['the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had', 'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how', 'its', 'may', 'new', 'now', 'old', 'see', 'two', 'who', 'boy', 'did', 'man', 'men', 'put', 'too', 'use'];
            var sentence = '';
            // Add 3-5 words with the bigram inserted
            var wordCount = 3 + Math.floor(Math.random() * 3);
            for (var j = 0; j < wordCount; j++) {
                sentence += words[Math.floor(Math.random() * words.length)] + ' ';
            }
            // Insert the bigram at a random position
            var insertPos = Math.floor(Math.random() * sentence.length);
            sentence = sentence.slice(0, insertPos) + bigram + sentence.slice(insertPos);
            drillParts.push(sentence.trim());
        }
    });
    // Shuffle the drill parts
    for (var i = drillParts.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [drillParts[j], drillParts[i]], drillParts[i] = _a[0], drillParts[j] = _a[1];
    }
    // Join parts with spaces and add punctuation
    return drillParts.join(' ') + '.';
};
exports.generateDrill = generateDrill;
