import { create } from 'zustand';

interface PostureIssue {
  name: string;
  severity: string;
  fixDays: string;
}

interface AppState {
  sittingHours: number;
  painAreas: string[];
  postureScore: number | null;
  issues: PostureIssue[];
  baselineScore: number | null;
  currentStreak: number;
  exercisesDone: number[];
  sessionTimer: number;
  isTimerRunning: boolean;

  setSittingHours: (hours: number) => void;
  togglePainArea: (area: string) => void;
  setAssessmentResult: (score: number, issues: PostureIssue[]) => void;
  toggleExerciseDone: (index: number) => void;
  resetSession: () => void;
  incrementStreak: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  sittingHours: 6,
  painAreas: [],
  postureScore: null,
  issues: [],
  baselineScore: null,
  currentStreak: 0,
  exercisesDone: [],
  sessionTimer: 0,
  isTimerRunning: false,

  setSittingHours: (hours) => set({ sittingHours: hours }),

  togglePainArea: (area) =>
    set((state) => ({
      painAreas: state.painAreas.includes(area)
        ? state.painAreas.filter((a) => a !== area)
        : [...state.painAreas, area],
    })),

  setAssessmentResult: (score, issues) =>
    set((state) => ({
      postureScore: score,
      issues,
      baselineScore: state.baselineScore ?? score,
    })),

  toggleExerciseDone: (index) =>
    set((state) => ({
      exercisesDone: state.exercisesDone.includes(index)
        ? state.exercisesDone.filter((i) => i !== index)
        : [...state.exercisesDone, index],
    })),

  resetSession: () => set({ exercisesDone: [], sessionTimer: 0, isTimerRunning: false }),

  incrementStreak: () =>
    set((state) => ({ currentStreak: state.currentStreak + 1 })),
}));
