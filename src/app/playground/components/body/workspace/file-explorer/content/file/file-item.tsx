import { ContextMenu } from "../../../../../../../../common/context-menu";
import { useContextMenu } from "../../../../../../../../hooks/use-context-menu";
import { useFileStore } from "../../../../../../../../stores/explorer/file-store";
import { getFileIcon } from "../../../../../../../../utils/fileIcons";

interface FileItemProps {
  fileName: string;
  filePath: string;
}

export function FileItem({ fileName, filePath }: FileItemProps) {
  const { menuState, openMenu, closeMenu, getContextMenuActions } =
    useContextMenu();

  const onRightClick = (event: React.MouseEvent, filePath: string) => {
    openMenu(event, filePath, "file");
  };

  const { activeFile, setActiveFile } = useFileStore();

  const isActive = activeFile === filePath;

  const onClick = () => setActiveFile(filePath);

  const handleContextMenu = (event: React.MouseEvent) => {
    if (onRightClick) {
      onRightClick(event, filePath);
    }
  };

  return (
    <div
      className={`flex items-center gap-2 px-2 py-1.5 cursor-pointer hover:bg-gray-700 rounded text-xs ${
        isActive ? "bg-gray-700 text-white" : "text-gray-300"
      }`}
      onClick={onClick}
      onContextMenu={handleContextMenu}
    >
      {getFileIcon(fileName)}
      <span className="truncate">{fileName}</span>

      <ContextMenu
        isOpen={menuState.isOpen}
        position={menuState.position}
        actions={getContextMenuActions()}
        onClose={closeMenu}
      />
    </div>
  );
}
