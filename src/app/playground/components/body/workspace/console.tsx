import { Trash2 } from "lucide-react";

interface ConsoleProps {
  output: string[];
  onClear: () => void;
}

export function Console({ output, onClear }: ConsoleProps) {
  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* Console Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-gray-300">Console</h3>
          <button className="p-1 hover:bg-gray-700 rounded">
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <button
          onClick={onClear}
          className="p-1 hover:bg-gray-700 rounded"
          title="Clear console"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Console Output */}
      <div className="flex-1 overflow-y-auto p-3 font-mono text-sm">
        {output.length === 0 ? (
          <div className="text-gray-500 italic">
            Console output will appear here...
          </div>
        ) : (
          <div className="space-y-1">
            {output.map((line, index) => (
              <div key={index} className="text-green-400">
                {line}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
