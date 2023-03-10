import { DialogActions as MuiDialogActions, Stack } from "@mui/material";
import { PropsWithChildren } from "react";

const DialogActions: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <MuiDialogActions>
      <Stack
        direction={{ sm: "row", md: "row" }}
        width="100%"
        spacing={1.5}
        alignItems="center"
        justifyContent="center"
      >
        {children}
      </Stack>
    </MuiDialogActions>
  );
};

export default DialogActions;
