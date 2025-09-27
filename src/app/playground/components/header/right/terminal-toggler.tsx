import { useTerminalStore } from "@/stores/terminal/terminal-store";
import { Terminal } from "lucide-react";
import { ToggleButton } from "../../../../../designs/toggle-button";

export function TerminalToggler() {
  const { showTerminal, toggleTerminal } = useTerminalStore();

  return (
    <ToggleButton
      isActive={showTerminal}
      onToggle={toggleTerminal}
      icon={<Terminal className="w-4 h-4" />}
      tooltip={showTerminal ? "Hide Terminal" : "Show Terminal"}
      keyboardShortcut="Ctrl/⌘ + 2"
    />
  );
}
