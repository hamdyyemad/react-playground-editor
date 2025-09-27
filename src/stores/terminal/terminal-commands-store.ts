import { create } from "zustand";

interface TerminalCommand {
  id: string;
  command: string;
  output: string;
  timestamp: Date;
  status: "success" | "error" | "running";
}

interface TerminalCommandsState {
  commands: TerminalCommand[];
  addCommand: (command: string) => void;
  updateCommandOutput: (
    id: string,
    output: string,
    status: "success" | "error"
  ) => void;
  clearCommands: () => void;
}

export const useTerminalCommandsStore = create<TerminalCommandsState>(
  (set) => ({
    commands: [],
    addCommand: (command) =>
      set((state) => ({
        commands: [
          ...state.commands,
          {
            id: Date.now().toString(),
            command,
            output: "",
            timestamp: new Date(),
            status: "running",
          },
        ],
      })),
    updateCommandOutput: (id, output, status) =>
      set((state) => ({
        commands: state.commands.map((cmd) =>
          cmd.id === id ? { ...cmd, output, status } : cmd
        ),
      })),
    clearCommands: () => set({ commands: [] }),
  })
);
