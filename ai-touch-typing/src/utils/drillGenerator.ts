// Generate adaptive drill based on weakness profile
export const generateDrill = (
  weaknessProfile: Record<string, number>,
  difficulty: 'easy' | 'medium' | 'hard' = 'medium',
  duration: 'short' | 'medium' | 'long' = 'medium'
): string => {
  // Base character set
  const baseChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ';
  
  // Get weak characters sorted by error count
  const weakChars = Object.entries(weaknessProfile)
    .filter(([char]) => baseChars.includes(char))
    .sort((a, b) => b[1] - a[1])
    .map(([char]) => char);
  
  // Determine drill parameters based on difficulty and duration
  let drillLength: number;
  switch (duration) {
    case 'short': drillLength = 50; break;
    case 'medium': drillLength = 100; break;
    case 'long': drillLength = 200; break;
    default: drillLength = 100;
  }
  
  // Adjust repetition based on difficulty
  let repeatFactor: number;
  switch (difficulty) {
    case 'easy': repeatFactor = 0.3; break;
    case 'medium': repeatFactor = 0.5; break;
    case 'hard': repeatFactor = 0.7; break;
    default: repeatFactor = 0.5;
  }
  
  // Generate drill text
  let drillText = '';
  for (let i = 0; i < drillLength; i++) {
    // With probability based on repeatFactor, use a weak character
    if (weakChars.length > 0 && Math.random() < repeatFactor) {
      const randomWeakChar = weakChars[Math.floor(Math.random() * Math.min(weakChars.length, 5))];
      drillText += randomWeakChar;
    } else {
      // Otherwise, use a random character from base set
      const randomChar = baseChars[Math.floor(Math.random() * baseChars.length)];
      drillText += randomChar;
    }
  }
  
  // Add some common bigrams to make it more natural
  const commonBigrams = ['th', 'he', 'in', 'er', 'an', 're', 'on', 'at', 'en', 'nd'];
  for (let i = 0; i < 5; i++) {
    const bigram = commonBigrams[Math.floor(Math.random() * commonBigrams.length)];
    const position = Math.floor(Math.random() * (drillText.length - 2));
    drillText = drillText.substring(0, position) + bigram + drillText.substring(position + 2);
  }
  
  return drillText;
};