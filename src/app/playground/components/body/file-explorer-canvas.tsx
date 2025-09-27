import { ResizableBox } from "react-resizable";
import { useFileExplorerStore } from "@/stores/explorer/file-explorer-store";
import { usePanelSizesStore } from "@/stores";
import { FileExplorer } from "./workspace";

export function FileExplorerCanvas() {
  const { showFileExplorer } = useFileExplorerStore();
  const { fileExplorerWidth, setFileExplorerWidth } = usePanelSizesStore();
  return (
    <>
      {showFileExplorer && (
        <ResizableBox
          width={fileExplorerWidth}
          height={Infinity}
          minConstraints={[150, Infinity]}
          maxConstraints={[500, Infinity]}
          onResize={(e, { size }) => setFileExplorerWidth(size.width)}
          resizeHandles={["e", "se"]}
          className="bg-gray-800 border-r border-gray-700"
        >
          <div className="h-full">
            <FileExplorer />
          </div>
        </ResizableBox>
      )}
    </>
  );
}
