import {
  FileExplorerToggler,
  SettingsDrawer,
  TerminalToggler,
  WebviewToggler,
} from "./right";

export function PlaygroundHeaderRight() {
  return (
    <div className="flex items-center gap-2">
      {/* File Explorer Toggle */}
      <FileExplorerToggler />

      {/* Terminal Toggle */}
      <TerminalToggler />

      {/* Web View Toggle */}
      <WebviewToggler />

      {/* Settings */}
      <SettingsDrawer />
    </div>
  );
}
