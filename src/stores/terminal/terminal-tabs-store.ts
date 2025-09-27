import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Tab {
  id: string;
  label: string;
}

interface TerminalTabsState {
  tabs: Tab[];
  activeTab: string;
  setActiveTab: (tabId: string) => void;
}

export const useTerminalTabsStore = create<TerminalTabsState>()(
  persist(
    (set) => ({
      tabs: [
        { id: "Terminal", label: "Terminal" },
        { id: "Console", label: "Console" },
        { id: "Network", label: "Network" },
      ],
      activeTab: "Terminal",
      setActiveTab: (tabId: string) => set({ activeTab: tabId }),
    }),
    {
      name: "playground-terminal-tabs-storage",
      partialize: (state) => ({ activeTab: state.activeTab }),
    }
  )
);
