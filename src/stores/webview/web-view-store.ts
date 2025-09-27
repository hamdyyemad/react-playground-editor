import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WebViewState {
  // Web View Toggle State
  showWebView: boolean;

  // Actions
  toggleWebView: () => void;
  setShowWebView: (show: boolean) => void;
}

export const useWebViewStore = create<WebViewState>()(
  persist(
    (set) => ({
      // Initial State
      showWebView: true,

      // Actions
      toggleWebView: () =>
        set((state) => ({
          showWebView: !state.showWebView,
        })),

      setShowWebView: (show: boolean) =>
        set({
          showWebView: show,
        }),
    }),
    {
      name: "playground-webview-storage", // unique name for localStorage key
      partialize: (state) => ({
        showWebView: state.showWebView,
      }), // only persist this field
    }
  )
);
