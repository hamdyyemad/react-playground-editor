import {
  CodeEditorCanvas,
  FileExplorerCanvas,
  TerminalCanvas,
  WebViewCanvas,
} from "./body";
import { DependenciesList } from "./body/workspace";

export function PlaygroundBody() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Top Row: File Explorer + Code Editor + Web View */}
      <div className="flex-1 flex overflow-hidden">
        {/* File Explorer */}
        <FileExplorerCanvas />

        {/* Code Editor and Web View Row */}
        <div className="flex-1 flex min-w-0">
          <div className="flex-1 min-w-0">
            <CodeEditorCanvas />
          </div>

          {/* Web View */}
          <WebViewCanvas />
        </div>
      </div>

      {/* Terminal Row - spans full width below */}
      <TerminalCanvas>
        <DependenciesList />
      </TerminalCanvas>
    </div>
  );
}
