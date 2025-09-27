import { RootFiles } from "./content/root-files";
import { Folders } from "./content/folders";
import { EmptySpace } from "./content/empty-space";

export function FileExplorerContent() {
  return (
    <div className="flex-1 overflow-y-auto p-2">
      {/* Folders */}
      <Folders />

      {/* Root Files */}
      <RootFiles />

      {/* Context Menu */}
      <div className="flex-1 h-full">
        <EmptySpace />
      </div>
    </div>
  );
}
