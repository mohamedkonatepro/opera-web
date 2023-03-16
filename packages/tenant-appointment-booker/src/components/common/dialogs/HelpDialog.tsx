import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  Stack,
} from "@mui/material";
import DialogActions from "./DialogActions";
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
          <Box>
            {title && (
              <DialogContentText
                variant="subtitle1"
                fontWeight="500"
                color="text.primary"
              >
                {title}
              </DialogContentText>
            )}
            {text && (
              <DialogContentText variant="body2">{text}</DialogContentText>
            )}
          </Box>
          <Box>{children}</Box>
        </Stack>
      </DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </Dialog>
  );
};

export default HelpDialog;
