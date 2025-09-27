import {
  useFileExplorerStore,
  usePanelSizesStore,
  useTerminalStore,
  useWebViewStore,
} from "@/stores";
import { ResizableBox } from "react-resizable";
import { DependenciesList, Terminal } from "./workspace";

export function TerminalCanvas({ children }: { children?: React.ReactNode }) {
  const { showFileExplorer } = useFileExplorerStore();
  const { showTerminal } = useTerminalStore();

  const {
    fileExplorerWidth,
    terminalHeight,
    setWebViewWidth,
    setTerminalHeight,
  } = usePanelSizesStore();

  return (
    <>
      {showTerminal && (
        <ResizableBox
          width={Infinity}
          height={terminalHeight}
          minConstraints={[Infinity, 100]}
          maxConstraints={[Infinity, 500]}
          onResize={(e, { size }) => setTerminalHeight(size.height)}
          resizeHandles={["n", "ne", "nw"]}
          className="border-t border-gray-700"
        >
          <div className="flex h-full">
            {/* Spacer for file explorer width */}
            {showFileExplorer && (
              <div
                className="flex-shrink-0"
                style={{ width: `${fileExplorerWidth}px` }}
              >
                {children}
              </div>
            )}

            {/* Terminal spans the main content width */}
            <div className="flex-1 bg-[#171b22]">
              <Terminal />
            </div>
          </div>
        </ResizableBox>
      )}
    </>
  );
}
