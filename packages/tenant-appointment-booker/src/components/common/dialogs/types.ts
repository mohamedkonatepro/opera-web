import { PropsWithChildren } from "react";

export interface DialogTitleProps {
  onClose?: () => void;
  type?: "success" | "error" | "info" | "help" | "edit" | "default";
}

interface CommonDialogProps extends PropsWithChildren {
  open: boolean;
  onClose?: () => void;
  title?: string;
  text?: React.ReactNode;
  maxWidth?: number;
}

export interface EditDialogProps extends CommonDialogProps {
  formId: string;
  submitButtonLabel?: string;
  cancelButtonLabel?: string;
}

export interface ErrorDialogProps extends CommonDialogProps {}

export interface HelpDialogProps extends CommonDialogProps {
  variant?: "help" | "form";
  actions?: React.ReactNode;
}

export interface SuccessDialogProps extends CommonDialogProps {}

export interface DialogSubtitleProps {
  title?: string;
  text?: React.ReactNode;
}
