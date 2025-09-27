import { AddFileBtn } from "./header/add-file-btn";

export function FileExplorerHeader() {
  return (
    <div className="px-3 py-2 border-b border-gray-700">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-semibold text-gray-300 uppercase tracking-wide">
          Files
        </h2>
        <AddFileBtn />
      </div>
    </div>
  );
}
