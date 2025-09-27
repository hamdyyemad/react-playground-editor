import React from "react";

interface PlaygroundBodyProps {
  initialFiles?: Record<string, string>;
  defaultActiveFile?: string;
  showFileExplorer?: boolean;
  showTerminal?: boolean;
  showWebView?: boolean;
  showDependencies?: boolean;
  onFileChange?: (files: Record<string, string>) => void;
  onActiveFileChange?: (filePath: string) => void;
}

export const PlaygroundBody: React.FC<PlaygroundBodyProps> = ({
  initialFiles,
  defaultActiveFile,
  showFileExplorer = true,
  showTerminal = true,
  showWebView = true,
  showDependencies = true,
  onFileChange,
  onActiveFileChange,
}) => {
  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 flex">
        {/* File Explorer */}
        {showFileExplorer && (
          <div className="w-64 bg-gray-800 border-r border-gray-700">
            <div className="p-3 border-b border-gray-700">
              <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wide">
                FILES
              </h3>
            </div>
            <div className="p-2">
              <p className="text-xs text-gray-500">
                File explorer will be here
              </p>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Code Editor */}
          <div className="flex-1 bg-gray-900">
            <div className="h-full p-4">
              <p className="text-xs text-gray-500">Code editor will be here</p>
            </div>
          </div>

          {/* Bottom Panels */}
          <div className="h-64 border-t border-gray-700">
            <div className="flex h-full">
              {/* Dependencies */}
              {showDependencies && (
                <div className="w-80 bg-gray-800 border-r border-gray-700">
                  <div className="p-3 border-b border-gray-700">
                    <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wide">
                      DEPENDENCIES
                    </h3>
                  </div>
                  <div className="p-2">
                    <p className="text-xs text-gray-500">
                      Dependencies will be here
                    </p>
                  </div>
                </div>
              )}

              {/* Terminal */}
              {showTerminal && (
                <div className="flex-1 bg-black">
                  <div className="p-3 border-b border-gray-700 bg-gray-800">
                    <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wide">
                      TERMINAL
                    </h3>
                  </div>
                  <div className="p-2">
                    <p className="text-xs text-green-400 font-mono">
                      Terminal will be here
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Web View */}
        {showWebView && (
          <div className="w-96 bg-white border-l border-gray-300">
            <div className="p-3 border-b border-gray-300 bg-gray-100">
              <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                WEB VIEW
              </h3>
            </div>
            <div className="p-2">
              <p className="text-xs text-gray-500">Web view will be here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
