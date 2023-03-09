import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import HelpIcon from "@mui/icons-material/Help";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";

export const successIcon = (
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

export const helpIcon = (
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

export const infoIcon = (
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

export const errorIcon = (
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

export const editIcon = (
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
