import MuiCheckCircleIcon from "@mui/icons-material/CheckCircle";
import MuiEditOutlinedIcon from "@mui/icons-material/EditOutlined";
import MuiHelpIcon from "@mui/icons-material/Help";
import MuiErrorIcon from "@mui/icons-material/Error";
import MuiInfoIcon from "@mui/icons-material/Info";
import MuiWarningIcon from "@mui/icons-material/Warning";
import { SvgIconProps } from "@mui/material";

export const SuccessIcon: React.FC<SvgIconProps> = (props) => (
  <MuiCheckCircleIcon {...props} color="success" />
);

export const HelpIcon: React.FC<SvgIconProps> = (props) => (
  <MuiHelpIcon {...props} color="secondary" />
);

export const InfoIcon: React.FC<SvgIconProps> = (props) => (
  <MuiInfoIcon {...props} color="secondary" />
);

export const ErrorIcon: React.FC<SvgIconProps> = (props) => (
  <MuiErrorIcon {...props} color="error" />
);

export const WarningIcon: React.FC<SvgIconProps> = (props) => (
  <MuiWarningIcon {...props} color="warning" />
);

export const EditIcon: React.FC<SvgIconProps> = ({ sx, ...rest }) => (
  <MuiEditOutlinedIcon {...rest} sx={{ ...sx, color: "text.secondary" }} />
);
