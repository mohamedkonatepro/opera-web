import { DialogTitle as MuiDialogTitle, IconButton, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Circle from "@/components/common/Circle";
import { EditIcon, ErrorIcon, HelpIcon, InfoIcon, SuccessIcon } from "@/components/common/icons/Icons";

export interface DialogTitleProps {
  onClose?: () => void;
  type?: "success" | "error" | "info" | "help" | "edit" | "default";
}

const getIcon = (type: DialogTitleProps["type"]) => {
  switch (type) {
    case "success":
      return <SuccessIcon />;
    case "error":
      return <ErrorIcon />;
    case "info":
      return <InfoIcon />;
    case "help":
      return <HelpIcon />;
    case "edit":
      return <EditIcon />;
    default:
      return null;
  }
};

const getBackgroundColor = (type: DialogTitleProps["type"]) => {
  switch (type) {
    case "success":
      return "success.light";
    case "error":
      return "error.light";
    case "info":
      return "info.light";
    case "help":
      return "info.light";
    case "edit":
      return "background.default";
    default:
      return undefined;
  }
};

const DialogTitle: React.FC<DialogTitleProps> = (props) => {
  const { onClose, type } = props;

  const icon = getIcon(type);
  const circleBackgroundColor = getBackgroundColor(type);

  return (
    <MuiDialogTitle component={Stack} direction="row">
      <Circle bgcolor={circleBackgroundColor}>
        {icon}
      </Circle>
      {onClose && (
        <IconButton
          onClick={onClose}
          sx={{ alignSelf: "start", ml: 'auto' }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      )}
    </MuiDialogTitle>
  );
}

export default DialogTitle;
