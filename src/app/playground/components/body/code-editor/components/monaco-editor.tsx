import { useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { getLanguageFromPath } from "../../../../../../utils/fileIcons";
import { getEditorConfig, getEditorOptions } from "../utils/editor-config";
import { isInsideJSX } from "../utils/jsx-detector";
import { toggleSmartComments } from "../utils/smart-comment";

interface MonacoEditorProps {
  filePath: string;
  content: string;
  onChange: (value: string | undefined) => void;
}

export function MonacoEditor({
  filePath,
  content,
  onChange,
}: MonacoEditorProps) {
  const editorRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;

    // Apply editor configuration
    const config = getEditorConfig();
    editor.updateOptions(config);

    // Add smart comment toggle command
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Slash, () => {
      const selection = editor.getSelection();
      const model = editor.getModel();

      if (!selection || !model) return;

      const startLine = selection.startLineNumber;
      const endLine = selection.endLineNumber;
      const startColumn = selection.startColumn;
      const endColumn = selection.endColumn;

      // Check if we're in JSX context
      const isInJSXContext = isInsideJSX(model, startLine, startColumn);

      // Toggle smart comments
      toggleSmartComments({
        isInJSX: isInJSXContext,
        startLine,
        endLine,
        model,
        editor,
      });
    });

    // Set dark theme
    monaco.editor.setTheme("vs-dark");
  };

  return (
    <div className="flex-1 overflow-auto">
      <Editor
        height="100%"
        language={getLanguageFromPath(filePath)}
        value={content}
        onMount={handleEditorDidMount}
        onChange={onChange}
        theme="vs-dark"
        options={getEditorOptions() as any}
      />
    </div>
  );
}
