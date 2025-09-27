import { useRef, useEffect } from "react";
import { useConsoleStore } from "@/stores/terminal/console-store";
import { useTerminalTabsStore } from "@/stores/terminal/terminal-tabs-store";
import { TerminalTab, ConsoleTab, NetworkTab } from "./content";

export function TerminalContent() {
  const { consoleOutput } = useConsoleStore();
  const { activeTab } = useTerminalTabsStore();
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [consoleOutput]);

  const renderTabContent = () => {
    switch (activeTab) {
      case "Terminal":
        return <TerminalTab />;
      case "Console":
        return <ConsoleTab />;
      case "Network":
        return <NetworkTab />;
      default:
        return <TerminalTab />;
    }
  };

  return (
    <div
      ref={terminalRef}
      className="flex-1 p-3 font-mono text-xs text-green-400 bg-[#171b22] overflow-y-auto"
    >
      <div className="space-y-1">{renderTabContent()}</div>
    </div>
  );
}
