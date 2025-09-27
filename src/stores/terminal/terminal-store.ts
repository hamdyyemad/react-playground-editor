import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TerminalState {
  // Terminal Toggle State
  showTerminal: boolean;

  // Actions
  toggleTerminal: () => void;
  setShowTerminal: (show: boolean) => void;
}

export const useTerminalStore = create<TerminalState>()(
  persist(
    (set) => ({
      // Initial State
      showTerminal: true,

      // Actions
      toggleTerminal: () =>
        set((state) => ({
          showTerminal: !state.showTerminal,
        })),

      setShowTerminal: (show: boolean) =>
        set({
          showTerminal: show,
        }),
    }),
    {
      name: "playground-terminal-storage", // unique name for localStorage key
      partialize: (state) => ({
        showTerminal: state.showTerminal,
      }), // only persist this field
    }
  )
);
