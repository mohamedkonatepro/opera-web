import { Button, Dialog, DialogContent } from "@mui/material";
import DialogActions from "./DialogActions";
import DialogSubtitle from "./DialogSubtitle";
import DialogTitle from "./DialogTitle";
import { InfoDialogProps } from "./types";

const InfoDialog: React.FC<InfoDialogProps> = ({
  open,
  title,
  text,
  onClose,
  maxWidth,
  actions,
}) => {
  const actionsToRender = actions ? (
    actions
  ) : (
    <Button variant="contained" onClick={onClose} color="secondary" fullWidth>
      {"J'ai compris"}
    </Button>
  );
  return (
    <Dialog open={open} maxWidth={false} PaperProps={{ sx: { maxWidth } }}>
      <DialogTitle onClose={onClose} type="info" />
      <DialogContent>
        <DialogSubtitle title={title} text={text} />
      </DialogContent>
      <DialogActions>{actionsToRender}</DialogActions>
    </Dialog>
  );
};

export default InfoDialog;
