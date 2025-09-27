import React from "react";

export const PlaygroundHeader: React.FC = () => {
  return (
    <div className="h-12 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-4">
      <div className="flex items-center space-x-4">
        <h1 className="text-sm font-semibold text-white">Playground</h1>
        <div className="flex items-center space-x-2">
          <button className="text-xs text-gray-400 hover:text-white px-2 py-1 rounded hover:bg-gray-700">
            File
          </button>
          <button className="text-xs text-gray-400 hover:text-white px-2 py-1 rounded hover:bg-gray-700">
            Edit
          </button>
          <button className="text-xs text-gray-400 hover:text-white px-2 py-1 rounded hover:bg-gray-700">
            View
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button className="text-xs text-gray-400 hover:text-white px-2 py-1 rounded hover:bg-gray-700">
          Settings
        </button>
        <button className="text-xs text-gray-400 hover:text-white px-2 py-1 rounded hover:bg-gray-700">
          Help
        </button>
      </div>
    </div>
  );
};
