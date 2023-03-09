import {
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  Typography,
} from "@mui/material";

import ValidateButton from "../buttons/ValidateButton";
import { CustomDialogTitle } from "./CustomDialogTitle";
import { successIcon } from "../../icons/Icons";

interface DialogProps {
  open: boolean;
  onValiderHandler?: () => void;
  onLoadHandler?: () => void;
  onCloseHandler?: () => void;
  content?: any;
  message?: string;
  okButtonLable?: string;
}

const SuccessDialog: React.FunctionComponent<DialogProps> = (props) => {
  const {
    open,
    onValiderHandler,
    onLoadHandler,
    onCloseHandler,
    content,
    message,
    okButtonLable,
  } = props;

  const msg = (
    <Typography variant="body1" color="text.primary">
      {message}
    </Typography>
  );

  return (
    <Dialog
      maxWidth="md"
      onClose={onCloseHandler}
      onLoad={onLoadHandler}
      open={open}
    >
      <CustomDialogTitle onClose={onCloseHandler}>
        {successIcon}
      </CustomDialogTitle>
      <DialogContent>{message ? msg : content}</DialogContent>
      <DialogActions>
        <Stack
          direction="row"
          width="100%"
          spacing={1.5}
          alignItems="center"
          margin={1.5}
        >
          <ValidateButton onClick={onValiderHandler}>
            {okButtonLable ? okButtonLable : "J'ai compris"}
          </ValidateButton>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default SuccessDialog;
