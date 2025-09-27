import { Dialog, DialogActions, DialogButton } from "./dialog";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "primary" | "secondary" | "danger" | "warning" | "info";
}

export function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
}: ConfirmationDialogProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="space-y-3">
        <p className="text-xs text-gray-300">{message}</p>

        <DialogActions>
          <DialogButton onClick={onClose}>{cancelText}</DialogButton>
          <DialogButton onClick={handleConfirm} variant={variant}>
            {confirmText}
          </DialogButton>
        </DialogActions>
      </div>
    </Dialog>
  );
}
