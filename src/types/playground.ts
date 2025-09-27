export interface ProjectTemplate {
  name: string;
  description: string;
  files: Record<string, string>;
  dependencies?: Record<string, string>;
}

export interface FileNode {
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
  content?: string;
}

export interface ConsoleMessage {
  type: "log" | "error" | "warn" | "info";
  message: string;
  timestamp: Date;
}

export interface EditorTheme {
  name: string;
  background: string;
  foreground: string;
  selection: string;
  cursor: string;
}
