export const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

export const SEVERITY = {
  SEVERE: 'SEVERE',
  MODERATE: 'MODERATE',
  MILD: 'MILD',
} as const;

export const SCORE = {
  BASE: 100,
  SEVERE_PENALTY: 20,
  MODERATE_PENALTY: 12,
  MILD_PENALTY: 6,
} as const;

export const PAIN_AREAS = [
  'NECK',
  'UPPER BACK',
  'LOWER BACK',
  'SHOULDERS',
  'HIPS',
  'NONE',
] as const;

export type PainArea = (typeof PAIN_AREAS)[number];
export type Severity = (typeof SEVERITY)[keyof typeof SEVERITY];
