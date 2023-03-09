import { Dialog, DialogActions, DialogContent, Stack } from "@mui/material";

import ValidateButton from "../buttons/ValidateButton";
import CancelButton from "../buttons/CancelButton";
import { CustomDialogTitle } from "./CustomDialogTitle";
import { editIcon } from "../../icons/Icons";

interface DialogProps {
  open: boolean;
  onValiderHandler?: (e: any) => void;
  onLoadHandler?: () => void;
  onCloseHandler?: () => void;
  content?: any;
  formId?: string;
  okButtonLable?: string;
  cancelButtonLable?: string;
}

const EditDialog: React.FunctionComponent<DialogProps> = (props) => {
  const {
    open,
    onValiderHandler,
    onLoadHandler,
    onCloseHandler,
    content,
    formId,
    okButtonLable,
    cancelButtonLable,
  } = props;

  return (
    <Dialog
      maxWidth="md"
      onClose={onCloseHandler}
      onLoad={onLoadHandler}
      open={open}
    >
      <CustomDialogTitle onClose={onCloseHandler}>{editIcon}</CustomDialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Stack
          direction="row"
          width="100%"
          spacing={1.5}
          alignItems="center"
          margin={1.5}
        >
          <CancelButton onClick={onCloseHandler}>
            {cancelButtonLable ? cancelButtonLable : "Annuler"}
          </CancelButton>
          <ValidateButton form={formId} onClick={onValiderHandler}>
            {okButtonLable ? okButtonLable : "Envoyer"}
          </ValidateButton>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
