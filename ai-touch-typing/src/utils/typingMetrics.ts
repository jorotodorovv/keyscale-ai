// Calculate WPM (Words Per Minute)
// Standard: 5 characters = 1 word
export const calculateWPM = (input: string, startTime: number | null, currentTime: number): number => {
  if (!startTime || input.length === 0) return 0;
  
  const timeInMinutes = (currentTime - startTime) / 60000; // Convert ms to minutes
  const words = input.length / 5;
  return Math.round(words / timeInMinutes);
};

// Calculate accuracy percentage
export const calculateAccuracy = (input: string, reference: string): number => {
  if (input.length === 0) return 100;
  
  let correct = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === reference[i]) {
      correct++;
    }
  }
  
  return Math.round((correct / input.length) * 100);
};

// Count errors
export const countErrors = (input: string, reference: string): number => {
  let errors = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] !== reference[i]) {
      errors++;
    }
  }
  return errors;
};

// Get bigrams from text
export const getBigrams = (text: string): string[] => {
  const bigrams: string[] = [];
  for (let i = 0; i < text.length - 1; i++) {
    bigrams.push(text[i] + text[i + 1]);
  }
  return bigrams;
};

// Update weakness profile
export const updateWeaknessProfile = (
  input: string, 
  reference: string, 
  weaknessProfile: Record<string, number>
): Record<string, number> => {
  const newProfile = { ...weaknessProfile };
  
  // Track character errors
  for (let i = 0; i < input.length; i++) {
    if (input[i] !== reference[i]) {
      const char = reference[i];
      newProfile[char] = (newProfile[char] || 0) + 1;
    }
  }
  
  return newProfile;
};