import { TerminalHeader } from "./terminal/terminal-header";
import { TerminalContent } from "./terminal/terminal-content";

export function Terminal() {
  return (
    <div className="h-100 border-t border-gray-700 flex flex-col">
      <TerminalHeader />
      <TerminalContent />
    </div>
  );
}
