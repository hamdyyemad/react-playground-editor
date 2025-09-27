import { FileItem } from "./file/file-item";
import { useFileOrganization } from "@/hooks/use-file-organization";

export function RootFiles() {
  const { rootFiles } = useFileOrganization();

  return (
    <>
      {rootFiles.map((filePath) => (
        <FileItem key={filePath} fileName={filePath} filePath={filePath} />
      ))}
    </>
  );
}
