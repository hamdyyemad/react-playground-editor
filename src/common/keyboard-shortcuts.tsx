import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcut";
import { useFileExplorerStore } from "@/stores/explorer/file-explorer-store";
import { useTerminalStore } from "@/stores/terminal/terminal-store";
import { useWebViewStore } from "@/stores/webview/web-view-store";

export function KeyboardShortcuts() {
  const { toggleFileExplorer } = useFileExplorerStore();
  const { toggleTerminal } = useTerminalStore();
  const { toggleWebView } = useWebViewStore();

  useKeyboardShortcuts([
    {
      key: "1",
      ctrlKey: true,
      callback: toggleFileExplorer,
    },
    {
      key: "1",
      metaKey: true,
      callback: toggleFileExplorer,
    },
    {
      key: "2",
      ctrlKey: true,
      callback: toggleTerminal,
    },
    {
      key: "2",
      metaKey: true,
      callback: toggleTerminal,
    },
    {
      key: "3",
      ctrlKey: true,
      callback: toggleWebView,
    },
    {
      key: "3",
      metaKey: true,
      callback: toggleWebView,
    },
    {
      key: ",",
      ctrlKey: true,
      callback: () => {
        // TODO: Open settings
        console.log("Settings shortcut pressed");
      },
    },
    {
      key: ",",
      metaKey: true,
      callback: () => {
        // TODO: Open settings
        console.log("Settings shortcut pressed");
      },
    },
  ]);

  return null; // This component doesn't render anything
}
