// src/utils/weaknessUtils.ts
import { WeaknessProfile } from '../state/types'

export const updateWeaknessProfile = (
  profile: WeaknessProfile,
  userInput: string,
  targetText: string
): WeaknessProfile => {
  const newProfile = JSON.parse(JSON.stringify(profile)) // Deep copy

  // Update key accuracy
  for (let i = 0; i < userInput.length; i++) {
    const key = targetText[i] || ' ' // Handle extra characters
    if (!newProfile.keys[key]) {
      newProfile.keys[key] = { accuracy: 0, errors: 0, count: 0 }
    }

    newProfile.keys[key].count += 1
    if (userInput[i] !== targetText[i]) {
      newProfile.keys[key].errors += 1
    }
    newProfile.keys[key].accuracy = 
      ((newProfile.keys[key].count - newProfile.keys[key].errors) / newProfile.keys[key].count) * 100
  }

  // Update bigram accuracy
  for (let i = 0; i < userInput.length - 1; i++) {
    const bigram = targetText.substring(i, i + 2)
    if (!newProfile.bigrams[bigram]) {
      newProfile.bigrams[bigram] = { accuracy: 0, errors: 0, count: 0 }
    }

    newProfile.bigrams[bigram].count += 1
    if (userInput.substring(i, i + 2) !== bigram) {
      newProfile.bigrams[bigram].errors += 1
    }
    newProfile.bigrams[bigram].accuracy = 
      ((newProfile.bigrams[bigram].count - newProfile.bigrams[bigram].errors) / newProfile.bigrams[bigram].count) * 100
  }

  return newProfile
}

export const getTopWeakKeys = (profile: WeaknessProfile, limit: number = 5): string[] => {
  return Object.entries(profile.keys)
    .filter(([_, data]) => data.count > 2) // Only consider keys typed more than 2 times
    .sort((a, b) => a[1].accuracy - b[1].accuracy)
    .slice(0, limit)
    .map(([key]) => key)
}

export const getTopWeakBigrams = (profile: WeaknessProfile, limit: number = 3): string[] => {
  return Object.entries(profile.bigrams)
    .filter(([_, data]) => data.count > 2) // Only consider bigrams typed more than 2 times
    .sort((a, b) => a[1].accuracy - b[1].accuracy)
    .slice(0, limit)
    .map(([bigram]) => bigram)
}