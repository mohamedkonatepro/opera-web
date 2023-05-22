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
  actions?: React.ReactNode;
}

export interface EditDialogProps extends CommonDialogProps {
  formId: string;
  submitButtonLabel?: string;
  cancelButtonLabel?: string;
  disabled?: boolean;
  disabledSubmitButton?: boolean;
}

export interface ErrorDialogProps extends CommonDialogProps {}

export interface InfoDialogProps extends CommonDialogProps {}

export interface HelpDialogProps extends CommonDialogProps {
  actions?: React.ReactNode;
}

export interface SuccessDialogProps extends CommonDialogProps {}

export interface DialogSubtitleProps {
  title?: string;
  text?: React.ReactNode;
}
