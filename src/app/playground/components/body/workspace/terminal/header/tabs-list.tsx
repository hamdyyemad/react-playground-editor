import { useTerminalTabsStore } from "../../../../../../../stores/terminal/terminal-tabs-store";

export function TabsList() {
  const { tabs, activeTab, setActiveTab } = useTerminalTabsStore();
  return (
    <div className="flex items-center gap-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-3 py-1 text-xs font-medium rounded-t transition-colors ${
            activeTab === tab.id
              ? "bg-gray-900 text-white border-b-2 border-blue-500"
              : "text-gray-400 hover:text-white hover:bg-gray-700"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
