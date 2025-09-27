import { ContextMenu } from "@/common/context-menu";
import { useContextMenu } from "@/hooks/use-context-menu";

export function EmptySpace() {
  const { menuState, openMenu, closeMenu, getContextMenuActions } =
    useContextMenu();

  const handleEmptyAreaRightClick = (event: React.MouseEvent) => {
    openMenu(event, null, "empty");
  };
  return (
    <div className="w-full h-full" onContextMenu={handleEmptyAreaRightClick}>
      <ContextMenu
        isOpen={menuState.isOpen}
        position={menuState.position}
        actions={getContextMenuActions()}
        onClose={closeMenu}
      />
    </div>
  );
}
