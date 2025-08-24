import type { KeyProfile, BigramProfile } from '../types/weakness';

// Generate a drill based on weak keys and bigrams
export const generateDrill = (
  weakKeys: KeyProfile[],
  weakBigrams: BigramProfile[],
  difficulty: 'easy' | 'medium' | 'hard' = 'medium',
  duration: 'short' | 'medium' | 'long' = 'medium'
): string => {
  // Determine drill parameters based on difficulty and duration
  let keyCount = 3;
  let bigramCount = 2;
  let repetitionCount = 3;
  
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
  const selectedKeys = weakKeys.slice(0, keyCount);
  const selectedBigrams = weakBigrams.slice(0, bigramCount);
  
  // Generate drill content
  const drillParts: string[] = [];
  
  // Add key-focused drills
  selectedKeys.forEach(keyProfile => {
    const key = keyProfile.key;
    for (let i = 0; i < repetitionCount; i++) {
      // Create random sequences focusing on the weak key
      const sequenceLength = 5 + Math.floor(Math.random() * 5); // 5-9 characters
      let sequence = '';
      for (let j = 0; j < sequenceLength; j++) {
        // Higher chance of the weak key appearing
        if (Math.random() < 0.4) {
          sequence += key;
        } else {
          // Add random common characters
          const commonChars = 'etaoinshrdlcumwfgypbvkjxqz ETAOINSHRDLCUMWFGYPBVKJXQZ';
          sequence += commonChars[Math.floor(Math.random() * commonChars.length)];
        }
      }
      drillParts.push(sequence);
    }
  });
  
  // Add bigram-focused drills
  selectedBigrams.forEach(bigramProfile => {
    const bigram = bigramProfile.bigram;
    for (let i = 0; i < repetitionCount; i++) {
      // Create sentences focusing on the weak bigram
      const words = ['the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had', 'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how', 'its', 'may', 'new', 'now', 'old', 'see', 'two', 'who', 'boy', 'did', 'man', 'men', 'put', 'too', 'use'];
      let sentence = '';
      
      // Add 3-5 words with the bigram inserted
      const wordCount = 3 + Math.floor(Math.random() * 3);
      for (let j = 0; j < wordCount; j++) {
        sentence += words[Math.floor(Math.random() * words.length)] + ' ';
      }
      
      // Insert the bigram at a random position
      const insertPos = Math.floor(Math.random() * sentence.length);
      sentence = sentence.slice(0, insertPos) + bigram + sentence.slice(insertPos);
      
      drillParts.push(sentence.trim());
    }
  });
  
  // Shuffle the drill parts
  for (let i = drillParts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [drillParts[i], drillParts[j]] = [drillParts[j], drillParts[i]];
  }
  
  // Join parts with spaces and add punctuation
  return drillParts.join(' ') + '.';
};