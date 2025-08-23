// src/utils/textUtils.js
export const generateRandomText = (length: number = 300): string => {
  const words = [
    'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'I',
    'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
    'this', 'but', 'his', 'by', 'from', 'they', 'she', 'or', 'an', 'will',
    'my', 'one', 'all', 'would', 'there', 'their', 'what', 'so', 'up', 'out',
    'if', 'about', 'who', 'get', 'which', 'go', 'me', 'when', 'make', 'can',
    'like', 'time', 'no', 'just', 'him', 'know', 'take', 'people', 'into', 'year',
    'your', 'good', 'some', 'could', 'them', 'see', 'other', 'than', 'then', 'now',
    'look', 'only', 'come', 'its', 'over', 'think', 'also', 'back', 'after', 'use',
    'two', 'how', 'our', 'work', 'first', 'well', 'way', 'even', 'new', 'want',
    'because', 'any', 'these', 'give', 'day', 'most', 'us', 'is', 'was', 'are'
  ]

  let result = ''
  while (result.length < length) {
    const randomWord = words[Math.floor(Math.random() * words.length)]
    result += randomWord + ' '
  }

  return result.trim().substring(0, length)
}

export const calculateWPM = (correctChars: number, timeInMinutes: number): number => {
  // Standard calculation: (characters / 5) / minutes
  return Math.round((correctChars / 5) / timeInMinutes)
}

export const calculateAccuracy = (correctChars: number, totalChars: number): number => {
  if (totalChars === 0) return 100
  return Math.round((correctChars / totalChars) * 100)
}

export const extractBigrams = (text: string): string[] => {
  const bigrams: string[] = []
  for (let i = 0; i < text.length - 1; i++) {
    bigrams.push(text.substring(i, i + 2))
  }
  return bigrams
}