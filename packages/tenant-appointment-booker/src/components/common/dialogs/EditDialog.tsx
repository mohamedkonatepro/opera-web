import { Box, Dialog, DialogContent, Stack } from "@mui/material";

import ValidateButton from "../buttons/ValidateButton";
import CancelButton from "../buttons/CancelButton";
import DialogActions from "@/components/common/dialogs/DialogActions";
import DialogTitle from "@/components/common/dialogs/DialogTitle";
import { EditDialogProps } from "./types";
import DialogSubtitle from "./DialogSubtitle";

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
          <DialogSubtitle title={title} text={text} />
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
