// Types for weakness detection system

export interface KeyProfile {
  key: string;
  count: number;
  errors: number;
  accuracy: number;
}

export interface BigramProfile {
  bigram: string;
  count: number;
  errors: number;
  accuracy: number;
}

export interface WeaknessProfile {
  keys: Record<string, KeyProfile>;
  bigrams: Record<string, BigramProfile>;
}