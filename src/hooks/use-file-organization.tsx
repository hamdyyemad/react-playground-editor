import { useFileStore } from "@/stores/explorer/file-store";

export function useFileOrganization() {
  const { files } = useFileStore();

  const organizeFiles = () => {
    const folders: Record<string, string[]> = {};
    const rootFiles: string[] = [];

    Object.keys(files).forEach((filePath) => {
      const parts = filePath.split("/");
      if (parts.length === 1) {
        rootFiles.push(filePath);
      } else {
        const folder = parts[0];
        if (!folders[folder]) {
          folders[folder] = [];
        }
        folders[folder].push(filePath);
      }
    });

    return { folders, rootFiles };
  };

  return organizeFiles();
}
