import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  Stack,
} from "@mui/material";
import DialogActions from "./DialogActions";
import DialogSubtitle from "./DialogSubtitle";
import DialogTitle from "./DialogTitle";
import { HelpDialogProps } from "./types";

const HelpDialog: React.FC<HelpDialogProps> = ({
  open,
  title,
  text,
  onClose,
  actions,
  maxWidth,
  children,
}) => {
  return (
    <Dialog open={open} maxWidth={false} PaperProps={{ sx: { maxWidth } }}>
      <DialogTitle onClose={onClose} type="help" />
      <DialogContent>
        <Stack spacing={3}>
          <DialogSubtitle title={title} text={text} />
          <Box>{children}</Box>
        </Stack>
      </DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </Dialog>
  );
};

export default HelpDialog;
