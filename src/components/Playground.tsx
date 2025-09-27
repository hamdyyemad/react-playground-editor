import React from "react";
import { PlaygroundHeader, PlaygroundBody } from "../app/playground/components";
import { KeyboardShortcuts } from "../common/keyboard-shortcuts";

export interface PlaygroundProps {
  initialFiles?: Record<string, string>;
  defaultActiveFile?: string;
  showFileExplorer?: boolean;
  showTerminal?: boolean;
  showWebView?: boolean;
  showDependencies?: boolean;
  theme?: "dark" | "light";
  onFileChange?: (files: Record<string, string>) => void;
  onActiveFileChange?: (filePath: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const Playground: React.FC<PlaygroundProps> = ({
  initialFiles,
  defaultActiveFile,
  showFileExplorer = true,
  showTerminal = true,
  showWebView = true,
  showDependencies = true,
  theme = "dark",
  onFileChange,
  onActiveFileChange,
  className = "",
  style,
}) => {
  return (
    <div
      className={`h-screen bg-gray-900 text-white flex flex-col ${className}`}
      style={style}
    >
      <KeyboardShortcuts />
      <PlaygroundHeader />
      <PlaygroundBody />
    </div>
  );
};

