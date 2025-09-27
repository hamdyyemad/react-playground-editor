import { Trash2 } from "lucide-react";
import { useConsoleStore } from "@/stores/terminal/console-store";

export function ConsoleTab() {
  const { consoleOutput, clearConsole } = useConsoleStore();

  return (
    <div className="space-y-3">
      {/* Console Header with Clear Button */}
      {consoleOutput.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-400">
            {consoleOutput.length} console messages
          </div>
          <button
            onClick={clearConsole}
            className="flex items-center gap-1 px-2 py-1 text-xs text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
            title="Clear console"
          >
            <Trash2 className="w-3 h-3" />
            Clear
          </button>
        </div>
      )}

      {/* Console Output */}
      <div className="space-y-1">
        {consoleOutput.length === 0 ? (
          <div className="text-gray-500">
            Console output will appear here...
          </div>
        ) : (
          consoleOutput.map((line, index) => {
            // Determine log level and color
            let textColor = "text-green-400"; // default for log
            let icon = "📝";

            if (line.includes("[ERROR]")) {
              textColor = "text-red-400";
              icon = "❌";
            } else if (line.includes("[WARN]")) {
              textColor = "text-yellow-400";
              icon = "⚠️";
            } else if (line.includes("[LOG]")) {
              textColor = "text-green-400";
              icon = "📝";
            }

            // Check if it's an error with file location info
            const isErrorWithLocation =
              line.includes("Error in") && line.includes(":");
            const isReactError = line.includes("React Error in Component");

            return (
              <div
                key={index}
                className={`${textColor} font-mono text-xs leading-relaxed`}
              >
                <div className="flex items-start gap-2">
                  <span className="flex-shrink-0">{icon}</span>
                  <div className="flex-1">
                    {isErrorWithLocation || isReactError ? (
                      <div>
                        <div className="font-semibold">{line}</div>
                        {isErrorWithLocation && (
                          <div className="text-gray-400 text-xs mt-1">
                            Click to expand error details in the web view
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>{line}</div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
