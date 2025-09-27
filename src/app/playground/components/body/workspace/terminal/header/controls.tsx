import { Plus, X, Trash2 } from "lucide-react";
import { useTerminalStore } from "../../../../../../../stores/terminal/terminal-store";
import { useTerminalTabsStore } from "../../../../../../../stores/terminal/terminal-tabs-store";
import { useTerminalCommandsStore } from "../../../../../../../stores/terminal/terminal-commands-store";
import { useConsoleStore } from "../../../../../../../stores/terminal/console-store";
import { useNetworkStore } from "../../../../../../../stores/terminal/network-store";

export function Controls() {
  const { toggleTerminal } = useTerminalStore();
  const { activeTab } = useTerminalTabsStore();
  const { clearCommands } = useTerminalCommandsStore();
  const { clearConsole } = useConsoleStore();
  const { clearRequests } = useNetworkStore();

  const handleClear = () => {
    switch (activeTab) {
      case "Terminal":
        clearCommands();
        break;
      case "Console":
        clearConsole();
        break;
      case "Network":
        clearRequests();
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex items-center gap-1">
      <button className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white">
        <Plus className="w-3 h-3" />
      </button>
      <button
        onClick={handleClear}
        className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white"
        title={`Clear ${activeTab} content`}
      >
        <Trash2 className="w-3 h-3" />
      </button>
      <button
        onClick={toggleTerminal}
        className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
}
