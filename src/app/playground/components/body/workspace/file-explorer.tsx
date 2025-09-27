import { FileExplorerHeader, FileExplorerContent } from "./file-explorer/";

export function FileExplorer() {
  return (
    <div className="h-full flex flex-col bg-[#11151c]">
      <FileExplorerHeader />
      <FileExplorerContent />
    </div>
  );
}
