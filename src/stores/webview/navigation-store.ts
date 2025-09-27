import { create } from "zustand";
import { persist } from "zustand/middleware";

interface NavigationState {
  // Current URL
  currentUrl: string;

  // Navigation history
  history: string[];
  historyIndex: number;

  // Navigation actions
  setCurrentUrl: (url: string) => void;
  navigateTo: (url: string) => void;
  goBack: () => void;
  goForward: () => void;
  canGoBack: () => boolean;
  canGoForward: () => boolean;

  // Reset navigation
  resetNavigation: () => void;
}

export const useWebViewNavigationStore = create<NavigationState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentUrl: "blob://",
      history: ["blob://"],
      historyIndex: 0,

      // Set current URL without adding to history
      setCurrentUrl: (url: string) => {
        set({ currentUrl: url });
      },

      // Navigate to a new URL and add to history
      navigateTo: (url: string) => {
        const { history, historyIndex } = get();

        console.log("Navigation store: navigating to", url);
        console.log("Current history:", history);
        console.log("Current index:", historyIndex);

        // Remove any history after current index (when navigating from middle of history)
        const newHistory = history.slice(0, historyIndex + 1);

        // Add new URL to history
        newHistory.push(url);

        set({
          currentUrl: url,
          history: newHistory,
          historyIndex: newHistory.length - 1,
        });

        console.log("New history:", newHistory);
        console.log("New index:", newHistory.length - 1);
      },

      // Go back in history
      goBack: () => {
        const { history, historyIndex } = get();

        if (historyIndex > 0) {
          const newIndex = historyIndex - 1;
          set({
            currentUrl: history[newIndex],
            historyIndex: newIndex,
          });
        }
      },

      // Go forward in history
      goForward: () => {
        const { history, historyIndex } = get();

        if (historyIndex < history.length - 1) {
          const newIndex = historyIndex + 1;
          set({
            currentUrl: history[newIndex],
            historyIndex: newIndex,
          });
        }
      },

      // Check if can go back
      canGoBack: () => {
        const { historyIndex } = get();
        return historyIndex > 0;
      },

      // Check if can go forward
      canGoForward: () => {
        const { history, historyIndex } = get();
        return historyIndex < history.length - 1;
      },

      // Reset navigation state
      resetNavigation: () => {
        set({
          currentUrl: "blob://",
          history: ["blob://"],
          historyIndex: 0,
        });
      },
    }),
    {
      name: "webview-navigation-storage",
      partialize: (state) => ({
        currentUrl: state.currentUrl,
        history: state.history,
        historyIndex: state.historyIndex,
      }),
    }
  )
);
