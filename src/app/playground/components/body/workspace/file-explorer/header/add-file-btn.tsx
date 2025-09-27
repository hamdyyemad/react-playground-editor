import { Plus } from "lucide-react";
import { useState } from "react";
import { NewFileDialog } from "../components/new-file-dialog";

export function AddFileBtn() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <button
        onClick={handleOpenDialog}
        className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white transition-colors"
        title="Add New File"
      >
        <Plus className="w-3 h-3" />
      </button>

      <NewFileDialog isOpen={isDialogOpen} onClose={handleCloseDialog} />
    </>
  );
}
