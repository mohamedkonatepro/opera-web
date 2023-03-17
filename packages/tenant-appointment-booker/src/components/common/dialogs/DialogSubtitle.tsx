import { Stack } from "@mui/material";
import DialogContentText from "./DialogContentText";
import { DialogSubtitleProps } from "./types";

const DialogSubtitle: React.FC<DialogSubtitleProps> = ({ title, text }) => {
  return (
    <Stack spacing={0.5}>
      {title && <DialogContentText type="title">{title}</DialogContentText>}
      {typeof text === "string" && (
        <DialogContentText variant="body2">{text}</DialogContentText>
      )}
      {typeof text !== "string" && text}
    </Stack>
  );
};

export default DialogSubtitle;
