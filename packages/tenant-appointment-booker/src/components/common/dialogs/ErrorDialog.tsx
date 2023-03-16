import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import DialogActions from "./DialogActions";
import DialogSubtitle from "./DialogSubtitle";
import DialogTitle from "./DialogTitle";
import { ErrorDialogProps } from "./types";

const ErrorDialog: React.FC<ErrorDialogProps> = ({
  open,
  title,
  text,
  onClose,
  maxWidth,
}) => {
  return (
    <Dialog open={open} maxWidth={false} PaperProps={{ sx: { maxWidth } }}>
      <DialogTitle onClose={onClose} type="error" />
      <DialogContent>
        <DialogSubtitle title={title} text={text} />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={onClose}
          color="secondary"
          fullWidth
        >
          {"J'ai compris"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorDialog;
