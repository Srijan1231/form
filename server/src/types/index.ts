import { Severity } from '../config/constants';

export interface PostureIssue {
  name: string;
  severity: Severity;
  fixDays: string;
}

export interface AssessmentInput {
  sittingHours: number;
  painAreas: string[];
}

export interface AssessmentResult {
  score: number;
  issues: PostureIssue[];
}

export interface Exercise {
  id: string;
  name: string;
  instruction: string;
  reps: string;
  durationSeconds: number;
  scorePoints: number;
  targets: string[];
  gifUrl: string;
  difficulty?: number;
}

export interface Routine {
  id: string;
  userId: string;
  exercises: Exercise[];
  generatedAt: string;
}

export interface Session {
  id: string;
  userId: string;
  routineId: string;
  exercisesDone: number;
  scoreDelta: number;
  completedAt: string;
}

export interface DailyCheckResult {
  score: number;
  microTip: string;
  checkedAt: string;
}

export interface Streak {
  userId: string;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
}

export interface ProgressSnapshot {
  userId: string;
  weekNumber: number;
  score: number;
  consistencyPct: number;
  createdAt: string;
}
