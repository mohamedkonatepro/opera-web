import { DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export interface DialogTitleProps {
  children?: React.ReactNode;
  onClose?: () => void;
}

export function CustomDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2.5, pb: 0 }} {...other}>
      {children}
      {onClose && (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 12,
            top: 10,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon sx={{ p: 0.3, color: "#666666" }} />
        </IconButton>
      )}
    </DialogTitle>
  );
}
