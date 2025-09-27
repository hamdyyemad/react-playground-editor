import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ConsoleState {
  // Console
  consoleOutput: string[];

  // Actions
  addConsoleOutput: (output: string) => void;
  clearConsole: () => void;
  addMultipleOutputs: (outputs: string[]) => void;
}

export const useConsoleStore = create<ConsoleState>()(
  persist(
    (set) => ({
      // Initial Console State
      consoleOutput: [],

      // Actions
      addConsoleOutput: (output: string) =>
        set((state) => ({
          consoleOutput: [...state.consoleOutput, output],
        })),

      clearConsole: () =>
        set({
          consoleOutput: [],
        }),

      addMultipleOutputs: (outputs: string[]) =>
        set((state) => ({
          consoleOutput: [...state.consoleOutput, ...outputs],
        })),
    }),
    {
      name: "playground-console-storage", // unique name for localStorage key
      partialize: (state) => ({
        consoleOutput: state.consoleOutput,
      }), // persist console output
    }
  )
);
