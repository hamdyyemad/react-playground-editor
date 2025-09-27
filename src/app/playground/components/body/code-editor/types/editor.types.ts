export interface EditorConfig {
  fontSize: number;
  lineHeight: number;
  fontFamily: string;
  minimap: { enabled: boolean };
  scrollBeyondLastLine: boolean;
  automaticLayout: boolean;
  tabSize: number;
  insertSpaces: boolean;
  wordWrap: string;
  lineNumbers: string;
  glyphMargin: boolean;
  folding: boolean;
  lineDecorationsWidth: number;
  lineNumbersMinChars: number;
  renderLineHighlight: string;
  cursorBlinking: string;
  cursorSmoothCaretAnimation: string;
  smoothScrolling: boolean;
  scrollbar: {
    vertical: string;
    horizontal: string;
    verticalScrollbarSize: number;
    horizontalScrollbarSize: number;
    useShadows: boolean;
    verticalHasArrows: boolean;
    horizontalHasArrows: boolean;
  };
  padding: { top: number; bottom: number };
  bracketPairColorization: { enabled: boolean };
  guides: {
    bracketPairs: boolean;
    indentation: boolean;
  };
}

export interface SmartCommentOptions {
  isInJSX: boolean;
  startLine: number;
  endLine: number;
  model: any;
  editor: any;
}
