// Import styles
import "./styles/index.css";

// Main component
export { Playground } from "./components/Playground";
export type { PlaygroundProps } from "./components/Playground";

// Stores (for advanced usage)
export { useFileStore } from "./stores/explorer/file-store";
export { usePackageManagerStore } from "./stores/package-manager/package-manager-store";
export { useTerminalStore } from "./stores/terminal/terminal-store";
export { useWebViewStore } from "./stores/webview/web-view-store";

// Hooks
export { useKeyboardShortcuts } from "./hooks/use-keyboard-shortcut";
export { useContextMenu } from "./hooks/use-context-menu";
export { useFileOrganization } from "./hooks/use-file-organization";

// Common components
export { Dialog, DialogActions, DialogButton } from "./common/dialog";
export { ConfirmationDialog } from "./common/confirmation-dialog";

// Utils
export { DependencyAnalyzer } from "./utils/dependency-analyzer";
