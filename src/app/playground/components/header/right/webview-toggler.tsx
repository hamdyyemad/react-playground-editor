import { useWebViewStore } from "@/stores/webview/web-view-store";
import { Monitor } from "lucide-react";
import { ToggleButton } from "../../../../../designs/toggle-button";

export function WebviewToggler() {
  const { showWebView, toggleWebView } = useWebViewStore();

  return (
    <ToggleButton
      isActive={showWebView}
      onToggle={toggleWebView}
      icon={<Monitor className="w-4 h-4" />}
      tooltip={showWebView ? "Hide Web View" : "Show Web View"}
      keyboardShortcut="Ctrl/⌘ + 3"
    />
  );
}
