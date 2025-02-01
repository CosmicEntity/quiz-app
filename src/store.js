import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useScoreStore = create(
  persist(
    (set) => ({
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      setScore: (val) => set((state) => ({ score: state.score + val })),
      setCorrectAnswers: () =>
        set((state) => ({ correctAnswers: state.correctAnswers + 1 })),
      setWrongAnswers: () =>
        set((state) => ({ wrongAnswers: state.wrongAnswers + 1 })),
      resetScore: () => set({ score: 0, correctAnswers: 0, wrongAnswers: 0 }),
    }),
    {
      name: "quiz-score-storage", // Name of the persisted storage key
    }
  )
);
