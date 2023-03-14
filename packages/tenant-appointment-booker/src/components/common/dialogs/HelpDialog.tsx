import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  Stack,
} from "@mui/material";
import { PropsWithChildren } from "react";
import DialogActions from "./DialogActions";
import DialogTitle from "./DialogTitle";


interface HelpDialogProps extends PropsWithChildren {
  open: boolean;
  onClose?: () => void;
  title?: string;
  text?: string;
  variant?: "help" | "form";
  actions?: React.ReactNode;
  maxWidth?: number;
}

const HelpDialog: React.FC<HelpDialogProps> = ({
  open,
  title,
  text,
  onClose,
  actions,
  maxWidth,
  children
}) => {
  return (
    <Dialog open={open} PaperProps={{ sx: { maxWidth } }}>
      <DialogTitle onClose={onClose} type="success" />
      <DialogContent>
        <Stack spacing={3}>
          <Box>
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
          </Box>
          <Box>
            {children}
          </Box>
        </Stack>

      </DialogContent>
      {actions &&(
        <DialogActions>
          {actions}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default HelpDialog;
