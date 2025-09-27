import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PanelSizesState {
  fileExplorerWidth: number;
  webViewWidth: number;
  terminalHeight: number;
  setFileExplorerWidth: (width: number) => void;
  setWebViewWidth: (width: number) => void;
  setTerminalHeight: (height: number) => void;
  resetSizes: () => void;
}

const defaultSizes = {
  fileExplorerWidth: 256, // 16rem (w-64)
  webViewWidth: 400, // 25rem
  terminalHeight: 200, // 12.5rem
};

export const usePanelSizesStore = create<PanelSizesState>()(
  persist(
    (set) => ({
      ...defaultSizes,

      setFileExplorerWidth: (width: number) =>
        set({ fileExplorerWidth: Math.max(100, Math.min(600, width)) }),

      setWebViewWidth: (width: number) =>
        set({ webViewWidth: Math.max(200, Math.min(800, width)) }),

      setTerminalHeight: (height: number) =>
        set({ terminalHeight: Math.max(100, Math.min(500, height)) }),

      resetSizes: () => set(defaultSizes),
    }),
    {
      name: "playground-panel-sizes-storage",
      version: 1,
    }
  )
);
