import { PropsWithChildren } from "react";

export interface DialogTitleProps {
  onClose?: () => void;
  type?: "success" | "error" | "info" | "help" | "edit" | "default";
}

export interface EditDialogProps extends PropsWithChildren {
  open: boolean;
  onClose: () => void;
  formId: string;
  submitButtonLabel?: string;
  cancelButtonLabel?: string;
  title?: string;
  text?: string;
}

export interface ErrorDialogProps {
  open: boolean;
  onClose?: () => void;
  title?: string;
  text?: React.ReactNode;
  maxWidth?: number;
}

export interface HelpDialogProps extends PropsWithChildren {
  open: boolean;
  onClose?: () => void;
  title?: string;
  text?: string;
  variant?: "help" | "form";
  actions?: React.ReactNode;
  maxWidth?: number;
}

export interface SuccessDialogProps {
  open: boolean;
  onClose?: () => void;
  title?: string;
  text?: string;
  maxWidth?: number;
}
