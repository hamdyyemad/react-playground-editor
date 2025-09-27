import { useState } from "react";
import { Folder, FolderOpen, ChevronRight, ChevronDown } from "lucide-react";
import { ContextMenu } from "@/common/context-menu";
import { useContextMenu } from "@/hooks/use-context-menu";

interface FolderItemProps {
  folderName: string;
  children: React.ReactNode;
}

export function FolderItem({ folderName, children }: FolderItemProps) {
  const { menuState, openMenu, closeMenu, getContextMenuActions } =
    useContextMenu();

  const onRightClick = (event: React.MouseEvent, folderName: string) => {
    openMenu(event, folderName, "folder");
  };

  const [isExpanded, setIsExpanded] = useState<boolean>(
    folderName === "src" // Default src folder to be expanded
  );

  const toggleFolder = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleContextMenu = (event: React.MouseEvent) => {
    if (onRightClick) {
      onRightClick(event, folderName);
    }
  };

  return (
    <div>
      <div
        className="flex items-center gap-1 px-2 py-1.5 cursor-pointer hover:bg-gray-700 rounded text-xs text-gray-300"
        onClick={toggleFolder}
        onContextMenu={handleContextMenu}
      >
        {isExpanded ? (
          <ChevronDown className="w-3 h-3" />
        ) : (
          <ChevronRight className="w-3 h-3" />
        )}
        {isExpanded ? (
          <FolderOpen className="w-3.5 h-3.5 text-blue-400" />
        ) : (
          <Folder className="w-3.5 h-3.5 text-blue-400" />
        )}
        <span>{folderName}</span>
      </div>
      {isExpanded && <div className="ml-4">{children}</div>}

      <ContextMenu
        isOpen={menuState.isOpen}
        position={menuState.position}
        actions={getContextMenuActions()}
        onClose={closeMenu}
      />
    </div>
  );
}
