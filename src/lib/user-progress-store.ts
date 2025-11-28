import { create } from 'zustand';

export interface UserProgress {
  userId: string;
  wordsLearned: string[];
  exercisesCompleted: number;
  correctAnswers: number;
  totalAttempts: number;
  currentLevel: 'beginner' | 'intermediate' | 'advanced';
  lastActivityDate: Date;
  favoriteWords: string[];
  learningStreak: number;
}

interface UserProgressState {
  progress: UserProgress | null;
  setProgress: (progress: UserProgress) => void;
  addWordLearned: (wordId: string) => void;
  recordExerciseAttempt: (correct: boolean) => void;
  updateLevel: (level: 'beginner' | 'intermediate' | 'advanced') => void;
  incrementStreak: () => void;
  resetStreak: () => void;
}

export const useUserProgressStore = create<UserProgressState>((set, get) => ({
  progress: null,

  setProgress: (progress) => set({ progress }),

  addWordLearned: (wordId) =>
    set((state) => {
      if (!state.progress) return state;
      return {
        progress: {
          ...state.progress,
          wordsLearned: [
            ...new Set([...state.progress.wordsLearned, wordId]),
          ],
          lastActivityDate: new Date(),
        },
      };
    }),

  recordExerciseAttempt: (correct) =>
    set((state) => {
      if (!state.progress) return state;
      return {
        progress: {
          ...state.progress,
          exercisesCompleted: state.progress.exercisesCompleted + 1,
          correctAnswers: correct
            ? state.progress.correctAnswers + 1
            : state.progress.correctAnswers,
          totalAttempts: state.progress.totalAttempts + 1,
          lastActivityDate: new Date(),
        },
      };
    }),

  updateLevel: (level) =>
    set((state) => {
      if (!state.progress) return state;
      return {
        progress: {
          ...state.progress,
          currentLevel: level,
        },
      };
    }),

  incrementStreak: () =>
    set((state) => {
      if (!state.progress) return state;
      return {
        progress: {
          ...state.progress,
          learningStreak: state.progress.learningStreak + 1,
          lastActivityDate: new Date(),
        },
      };
    }),

  resetStreak: () =>
    set((state) => {
      if (!state.progress) return state;
      return {
        progress: {
          ...state.progress,
          learningStreak: 0,
        },
      };
    }),
}));
