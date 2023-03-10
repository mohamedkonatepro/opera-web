import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  Stack,
} from "@mui/material";

import ValidateButton from "../buttons/ValidateButton";
import CancelButton from "../buttons/CancelButton";
import { PropsWithChildren } from "react";
import DialogActions from "@/components/common/dialogs/DialogActions";
import DialogTitle from "@/components/common/dialogs/DialogTitle";

interface EditDialogProps extends PropsWithChildren {
  open: boolean;
  onClose: () => void;
  formId: string;
  submitButtonLabel?: string;
  cancelButtonLabel?: string;
  title?: string;
  text?: string;
}

const EditDialog: React.FC<EditDialogProps> = (props) => {
  const {
    open,
    formId,
    onClose,
    submitButtonLabel = "Envoyer",
    cancelButtonLabel = "Annuler",
    children,
    title,
    text,
  } = props;

  return (
    <Dialog maxWidth="md" onClose={onClose} open={open}>
      <DialogTitle onClose={onClose} type="edit" />
      <DialogContent>
        <Stack spacing={2}>
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
            {text && (
              <DialogContentText variant="body2">{text}</DialogContentText>
            )}
          </Box>
          <Box>{children}</Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <CancelButton onClick={onClose} fullWidth>
          {cancelButtonLabel}
        </CancelButton>
        <ValidateButton form={formId} fullWidth>
          {submitButtonLabel}
        </ValidateButton>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
