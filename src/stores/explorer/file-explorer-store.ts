import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FileExplorerState {
  // File Explorer Toggle State
  showFileExplorer: boolean;

  // Actions
  toggleFileExplorer: () => void;
  setShowFileExplorer: (show: boolean) => void;
}

export const useFileExplorerStore = create<FileExplorerState>()(
  persist(
    (set) => ({
      // Initial State
      showFileExplorer: true,

      // Actions
      toggleFileExplorer: () =>
        set((state) => ({
          showFileExplorer: !state.showFileExplorer,
        })),

      setShowFileExplorer: (show: boolean) =>
        set({
          showFileExplorer: show,
        }),
    }),
    {
      name: "playground-file-explorer-storage", // unique name for localStorage key
      partialize: (state) => ({
        showFileExplorer: state.showFileExplorer,
      }), // only persist this field
    }
  )
);
