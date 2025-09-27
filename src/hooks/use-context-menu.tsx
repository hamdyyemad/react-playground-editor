import React, { useState, useCallback } from "react";
import { File, Folder, Edit, Trash2 } from "lucide-react";
import { useFileStore } from "@/stores/explorer/file-store";
import { ContextMenuAction } from "../common/context-menu";

interface ContextMenuState {
  isOpen: boolean;
  position: { x: number; y: number };
  target: string | null; // file or folder path
  type: "file" | "folder" | "empty" | null;
}

export function useContextMenu() {
  const [menuState, setMenuState] = useState<ContextMenuState>({
    isOpen: false,
    position: { x: 0, y: 0 },
    target: null,
    type: null,
  });

  const { addFile, deleteFile, renameFile } = useFileStore();

  const openMenu = useCallback(
    (
      event: React.MouseEvent,
      target: string | null,
      type: "file" | "folder" | "empty"
    ) => {
      event.preventDefault();
      event.stopPropagation();

      setMenuState({
        isOpen: true,
        position: { x: event.clientX, y: event.clientY },
        target,
        type,
      });
    },
    []
  );

  const closeMenu = useCallback(() => {
    setMenuState({
      isOpen: false,
      position: { x: 0, y: 0 },
      target: null,
      type: null,
    });
  }, []);

  const createNewFile = useCallback(
    (folderPath?: string) => {
      const fileName = prompt("Enter file name:");
      if (!fileName) return;

      const filePath = folderPath ? `${folderPath}/${fileName}` : fileName;
      const content = ""; // Empty file

      addFile(filePath, content);
    },
    [addFile]
  );

  const createNewFolder = useCallback(
    (parentPath?: string) => {
      const folderName = prompt("Enter folder name:");
      if (!folderName) return;

      // For now, we'll create a placeholder file to represent the folder
      // In a real implementation, you'd have a separate folder structure
      const folderPath = parentPath
        ? `${parentPath}/${folderName}`
        : folderName;
      const placeholderFile = `${folderPath}/.gitkeep`;

      addFile(placeholderFile, "# This file keeps the folder in git");
    },
    [addFile]
  );

  const renameItem = useCallback(
    (oldPath: string) => {
      const newName = prompt("Enter new name:", oldPath.split("/").pop() || "");
      if (!newName || newName === oldPath.split("/").pop()) return;

      const pathParts = oldPath.split("/");
      pathParts[pathParts.length - 1] = newName;
      const newPath = pathParts.join("/");

      renameFile(oldPath, newPath);
    },
    [renameFile]
  );

  const deleteItem = useCallback(
    (filePath: string) => {
      const confirmDelete = confirm(
        `Are you sure you want to delete "${filePath}"?`
      );
      if (confirmDelete) {
        deleteFile(filePath);
      }
    },
    [deleteFile]
  );

  const getContextMenuActions = useCallback((): ContextMenuAction[] => {
    const { target, type } = menuState;

    switch (type) {
      case "file":
        return [
          {
            id: "rename-file",
            label: "Rename",
            icon: React.createElement(Edit, { className: "w-3 h-3" }),
            onClick: () => target && renameItem(target),
          },
          {
            id: "delete-file",
            label: "Delete",
            icon: React.createElement(Trash2, { className: "w-3 h-3" }),
            onClick: () => target && deleteItem(target),
          },
        ];

      case "folder":
        return [
          {
            id: "new-file-in-folder",
            label: "New File",
            icon: React.createElement(File, { className: "w-3 h-3" }),
            onClick: () => createNewFile(target || undefined),
          },
          {
            id: "new-folder-in-folder",
            label: "New Folder",
            icon: React.createElement(Folder, { className: "w-3 h-3" }),
            onClick: () => createNewFolder(target || undefined),
          },
          {
            id: "rename-folder",
            label: "Rename",
            icon: React.createElement(Edit, { className: "w-3 h-3" }),
            onClick: () => target && renameItem(target),
          },
          {
            id: "delete-folder",
            label: "Delete",
            icon: React.createElement(Trash2, { className: "w-3 h-3" }),
            onClick: () => target && deleteItem(target),
          },
        ];

      case "empty":
        return [
          {
            id: "new-file-root",
            label: "New File",
            icon: React.createElement(File, { className: "w-3 h-3" }),
            onClick: () => createNewFile(),
          },
          {
            id: "new-folder-root",
            label: "New Folder",
            icon: React.createElement(Folder, { className: "w-3 h-3" }),
            onClick: () => createNewFolder(),
          },
        ];

      default:
        return [];
    }
  }, [menuState, createNewFile, createNewFolder, renameItem, deleteItem]);

  return {
    menuState,
    openMenu,
    closeMenu,
    getContextMenuActions,
  };
}
