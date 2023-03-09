import {
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  Typography,
} from "@mui/material";

import ValidateButton from "../buttons/ValidateButton";
import { CustomDialogTitle } from "./CustomDialogTitle";
import { errorIcon } from "../../icons/Icons";

interface DialogProps {
  open: boolean;
  onValiderHandler?: () => void;
  onLoadHandler?: () => void;
  onCloseHandler?: () => void;
  content?: any;
  message?: string;
  okButtonLable?: string;
  displayActions?: string;
}

const ErrorDialog: React.FunctionComponent<DialogProps> = (props) => {
  const {
    open,
    onValiderHandler,
    onLoadHandler,
    onCloseHandler,
    content,
    message,
    okButtonLable,
    displayActions,
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
        {errorIcon}
      </CustomDialogTitle>
      <DialogContent>{message ? msg : content}</DialogContent>
      <DialogActions>
        <Stack
          direction="row"
          width="100%"
          spacing={1.5}
          alignItems="center"
          margin={1.5}
          display={displayActions}
        >
          <ValidateButton onClick={onValiderHandler}>
            {okButtonLable ? okButtonLable : "J'ai compris"}
          </ValidateButton>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorDialog;
