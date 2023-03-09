import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import DialogActions from "./DialogActions";
import DialogTitle from "./DialogTitle";
interface SuccessDialogProps {
  open: boolean;
  onClose?: () => void;
  title?: string;
  text?: string;
}

const SuccessDialog: React.FC<SuccessDialogProps> = ({
  open,
  title,
  text,
  onClose,
}) => {
  return (
    <Dialog open={open} maxWidth="md">
      <DialogTitle onClose={onClose} type="success" />
      <DialogContent>
        {title && (
          <DialogContentText
            variant="body1"
            fontWeight="500"
            color="text.primary"
          >
            {title}
          </DialogContentText>
        )}
        {text && <DialogContentText variant="body2">{text}</DialogContentText>}
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

export default SuccessDialog;
