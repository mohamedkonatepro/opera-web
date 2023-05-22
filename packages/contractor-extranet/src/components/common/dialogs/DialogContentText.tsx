import {
  DialogContentText as MuiDialogContentText,
  DialogContentTextProps as MuiDialogContentTextProps,
} from "@mui/material";

interface DialogContentTextProps extends MuiDialogContentTextProps {
  type?: "title" | "text";
}

const DialogContentText: React.FC<DialogContentTextProps> = ({
  type = "text",
  ...rest
}) => {
  return (
    <MuiDialogContentText
      {...rest}
      variant={type === "title" ? "subtitle1" : "body2"}
      color={type === "title" ? "text.primary" : "text.secondary"}
    />
  );
};

export default DialogContentText;
