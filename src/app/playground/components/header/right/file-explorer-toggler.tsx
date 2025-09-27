import { useFileExplorerStore } from "../../../../../stores/explorer/file-explorer-store";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { ToggleButton } from "../../../../../designs/toggle-button";

export function FileExplorerToggler() {
  const { showFileExplorer, toggleFileExplorer } = useFileExplorerStore();

  return (
    <ToggleButton
      isActive={showFileExplorer}
      onToggle={toggleFileExplorer}
      icon={
        showFileExplorer ? (
          <PanelLeftClose className="w-4 h-4" />
        ) : (
          <PanelLeftOpen className="w-4 h-4" />
        )
      }
      tooltip={showFileExplorer ? "Hide File Explorer" : "Show File Explorer"}
      keyboardShortcut="Ctrl/⌘ + 1"
    />
  );
}
