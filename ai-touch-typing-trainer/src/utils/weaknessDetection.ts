import type { KeyProfile, BigramProfile, WeaknessProfile } from '../types/weakness';
import { loadFromLocalStorage, saveToLocalStorage } from './localStorage';

// Initialize empty weakness profile
const initializeWeaknessProfile = (): WeaknessProfile => ({
  keys: {},
  bigrams: {}
});

// Load weakness profile from localStorage or initialize
export const loadWeaknessProfile = (): WeaknessProfile => {
  return loadFromLocalStorage<WeaknessProfile>('weaknessProfile', initializeWeaknessProfile());
};

// Save weakness profile to localStorage
export const saveWeaknessProfile = (profile: WeaknessProfile): void => {
  saveToLocalStorage('weaknessProfile', profile);
};

// Update weakness profile with new typing data
export const updateWeaknessProfile = (
  profile: WeaknessProfile,
  text: string,
  userInput: string
): WeaknessProfile => {
  const updatedProfile = { ...profile };
  
  // Update key profiles
  for (let i = 0; i < userInput.length; i++) {
    const key = text[i] || '';
    if (!key) continue;
    
    if (!updatedProfile.keys[key]) {
      updatedProfile.keys[key] = {
        key,
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
  for (let i = 0; i < userInput.length - 1; i++) {
    const bigram = text.slice(i, i + 2);
    if (bigram.length < 2) continue;
    
    if (!updatedProfile.bigrams[bigram]) {
      updatedProfile.bigrams[bigram] = {
        bigram,
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

// Get top weak keys (with threshold)
export const getTopWeakKeys = (
  profile: WeaknessProfile,
  threshold: number = 95,
  limit: number = 5
): KeyProfile[] => {
  return Object.values(profile.keys)
    .filter(key => key.accuracy < threshold && key.count > 2) // Only consider keys typed more than 2 times
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, limit);
};

// Get top weak bigrams (with threshold)
export const getTopWeakBigrams = (
  profile: WeaknessProfile,
  threshold: number = 95,
  limit: number = 5
): BigramProfile[] => {
  return Object.values(profile.bigrams)
    .filter(bigram => bigram.accuracy < threshold && bigram.count > 2) // Only consider bigrams typed more than 2 times
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, limit);
};