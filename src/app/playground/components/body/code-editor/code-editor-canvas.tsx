import { useFileStore } from "../../../../../stores/explorer/file-store";
import { EditorHeader } from "./components/editor-header";
import { MonacoEditor } from "./components/monaco-editor";

export function CodeEditorCanvas() {
  const { activeFile, files, updateFile } = useFileStore();
  const filePath = activeFile;
  const content = files[activeFile] || "";

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      updateFile(activeFile, value);
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-900">
      <EditorHeader filePath={filePath} />
      <MonacoEditor
        filePath={filePath}
        content={content}
        onChange={handleEditorChange}
      />
    </div>
  );
}
