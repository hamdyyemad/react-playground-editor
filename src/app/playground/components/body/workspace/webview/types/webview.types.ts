export interface ProcessedFile {
  filePath: string;
  content: string;
  processedContent: string;
}

export interface WebViewError {
  message: string;
  filename: string;
  lineno: number | string;
  colno: number | string;
  stack: string;
}

export interface ConsoleMessage {
  level: "log" | "error" | "warn";
  message: string;
  timestamp: string;
}
