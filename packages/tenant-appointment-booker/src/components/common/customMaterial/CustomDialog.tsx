import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import HelpIcon from "@mui/icons-material/Help";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";

interface DialogProps {
  title?: any;
  open: boolean;
  onValiderHandler?: () => void;
  onCancelHandler?: () => void;
  onLoadHandler?: () => void;
  onCloseHandler?: () => void;
  content?: any;
  dialogType?: DialogType;
  message?: string;
  okButtonLable?: string;
  cancelButtonLable?: string;
}

export enum DialogType {
  Info,
  Success,
  Error,
  Help,
  Edit,
}

export interface DialogTitleProps {
  children?: React.ReactNode;
  onClose?: () => void;
}

function CustomDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose && (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 12,
            top: 10,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon sx={{ p: 0.3, color: "#666666" }} />
        </IconButton>
      )}
    </DialogTitle>
  );
}
const success = (
  <CheckCircleIcon
    sx={{
      color: "#2A9D8F",
      backgroundColor: "#EAF5F4",
      p: 1.2,
      width: 40,
      height: 40,
      borderRadius: "50%",
    }}
  />
);

const help = (
  <HelpIcon
    sx={{
      color: "#5148E6",
      backgroundColor: "#EEEDFC",
      p: 1.2,
      width: 40,
      height: 40,
      borderRadius: "50%",
    }}
  />
);

const infoTitle = (
  <InfoIcon
    sx={{
      color: "#5148E6",
      backgroundColor: "#EEEDFC",
      p: 1.2,
      width: 40,
      height: 40,
      borderRadius: "50%",
    }}
  />
);

const error = (
  <ErrorIcon
    sx={{
      color: "#E63946",
      backgroundColor: "#FCEBEC",
      p: 1.2,
      width: 40,
      height: 40,
      borderRadius: "50%",
    }}
  />
);

const edit = (
  <EditOutlinedIcon
    sx={{
      color: "#666666",
      backgroundColor: "#F4F4F4",
      p: 1.2,
      width: 40,
      height: 40,
      borderRadius: "50%",
    }}
  />
);

const CustomDialog: React.FunctionComponent<DialogProps> = (props) => {
  const {
    title,
    open,
    onValiderHandler,
    onCancelHandler,
    onLoadHandler,
    onCloseHandler,
    content,
    dialogType,
    message,
  } = props;

  let dialogTitle = title;
  let info = false;

  const msg = (
    <Typography variant="body1" color="text.primary">
      {message}
    </Typography>
  );

  switch (dialogType) {
    case DialogType.Success:
      dialogTitle = success;
      info = true;
      break;
    case DialogType.Info:
      dialogTitle = infoTitle;
      info = true;
      break;
    case DialogType.Help:
      dialogTitle = help;
      info = false;
      break;
    case DialogType.Error:
      dialogTitle = error;
      info = true;
      break;
    default:
      dialogTitle = edit;
      info = false;
      break;
  }

  return (
    <Dialog
      onClose={onCloseHandler}
      onLoad={onLoadHandler}
      open={open}
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            maxWidth: "456px",
          },
        },
      }}
    >
      <CustomDialogTitle onClose={onCloseHandler}>
        {dialogTitle}
      </CustomDialogTitle>
      <DialogContent>{info && message ? msg : content}</DialogContent>
      <DialogActions>
        <Stack
          direction="row"
          spacing={1.5}
          alignItems="center"
          margin="auto"
          marginBottom={2}
        >
          <Button
            variant="outlined"
            color="secondary"
            onClick={onCancelHandler ? onCancelHandler : onCloseHandler}
            sx={{
              display: info ? "none" : "block",
              width: 198,
              height: 48,
              backgroun: "#FFFFFF",
              border: "2px solid #5148E6",
              textTransform: "none",
              borderRadius: "6px",
            }}
          >
            Annuler
          </Button>
          <Button
            onClick={onValiderHandler}
            variant="contained"
            color="secondary"
            sx={{
              width: info ? 408 : 198,
              height: 48,
              background:
                "linear-gradient(180deg, #6061F0 0.01%, #5046E5 100%)",
              boxShadow:
                "0px 1px 2px rgba(17, 17, 34, 0.1), inset 0px 1px 0px rgba(255, 255, 255, 0.1), inset 0px -1px 0px rgba(0, 0, 0, 0.1)",
              textTransform: "none",
              borderRadius: "6px",
            }}
          >
            {info ? "J'ai compris" : "Envoyer"}
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
