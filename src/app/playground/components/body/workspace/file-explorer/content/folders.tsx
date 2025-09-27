import { useFileOrganization } from "@/hooks/use-file-organization";
import { FolderItem } from "./folder/folder-item";
import { FileItem } from "./file/file-item";

export function Folders() {
  const { folders } = useFileOrganization();

  return (
    <>
      {Object.entries(folders).map(([folderName, folderFiles]) => (
        <FolderItem key={folderName} folderName={folderName}>
          {folderFiles.map((filePath) => (
            <FileItem
              key={filePath}
              fileName={filePath.split("/").pop() || ""}
              filePath={filePath}
            />
          ))}
        </FolderItem>
      ))}
    </>
  );
}
