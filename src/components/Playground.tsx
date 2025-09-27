import React from "react";
import { PlaygroundBody } from "./body";
import { PlaygroundHeader } from "./header";

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
    <div className={`playground-container ${theme} ${className}`} style={style}>
      <PlaygroundHeader />
      <PlaygroundBody
        initialFiles={initialFiles}
        defaultActiveFile={defaultActiveFile}
        showFileExplorer={showFileExplorer}
        showTerminal={showTerminal}
        showWebView={showWebView}
        showDependencies={showDependencies}
        onFileChange={onFileChange}
        onActiveFileChange={onActiveFileChange}
      />
    </div>
  );
};
