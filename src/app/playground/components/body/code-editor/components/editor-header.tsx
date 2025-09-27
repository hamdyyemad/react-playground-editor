import { getFileIconDot } from "../../../../../../utils/fileIcons";
import { useFileStore } from "../../../../../../stores/explorer/file-store";

interface EditorHeaderProps {
  filePath: string;
}

export function EditorHeader({ filePath }: EditorHeaderProps) {
  const { closeFile, openFiles } = useFileStore();
  const fileName = filePath.split("/").pop();

  const handleCloseFile = () => {
    closeFile(filePath);
  };

  // Don't show close button if this is the only open file
  const canClose = openFiles.length > 1;

  return (
    <div className="flex bg-[#171b22] border-b border-gray-700">
      <div className="flex items-center gap-2 px-3 py-2 bg-gray-900 border-r border-gray-600">
        {getFileIconDot(filePath)}
        <span className="text-xs font-medium text-gray-300">{fileName}</span>
        {canClose && (
          <button
            onClick={handleCloseFile}
            className="ml-1 hover:bg-gray-700 rounded p-0.5"
            title="Close file"
          >
            <svg
              className="w-3 h-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
