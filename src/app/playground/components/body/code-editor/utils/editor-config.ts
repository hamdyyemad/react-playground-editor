import { EditorConfig } from "../types/editor.types";

export const getEditorConfig = (): EditorConfig => ({
  fontSize: 13,
  lineHeight: 18,
  fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
  minimap: { enabled: false },
  scrollBeyondLastLine: false,
  automaticLayout: true,
  tabSize: 2,
  insertSpaces: true,
  wordWrap: "on" as const,
  lineNumbers: "on" as const,
  glyphMargin: false,
  folding: true,
  lineDecorationsWidth: 0,
  lineNumbersMinChars: 3,
  renderLineHighlight: "line" as const,
  cursorBlinking: "smooth" as const,
  cursorSmoothCaretAnimation: "on" as const,
  smoothScrolling: true,
  scrollbar: {
    vertical: "auto" as const,
    horizontal: "auto" as const,
    verticalScrollbarSize: 6,
    horizontalScrollbarSize: 6,
    useShadows: false,
    verticalHasArrows: false,
    horizontalHasArrows: false,
  },
  padding: { top: 8, bottom: 8 },
  bracketPairColorization: { enabled: true },
  guides: {
    bracketPairs: true,
    indentation: true,
  },
});

export const getEditorOptions = () => ({
  selectOnLineNumbers: true,
  roundedSelection: false,
  readOnly: false,
  cursorStyle: "line" as const,
  ...getEditorConfig(),
});
