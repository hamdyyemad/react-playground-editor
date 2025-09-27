import { TabsList } from "./header/tabs-list";
import { Controls } from "./header/controls";

export function TerminalHeader() {
  return (
    <div className="flex items-center justify-between px-3 py-2 bg-[#1e2128] border-b border-gray-700">
      {/* Tabs */}
      <TabsList />
      {/* Controls */}
      <Controls />
    </div>
  );
}
