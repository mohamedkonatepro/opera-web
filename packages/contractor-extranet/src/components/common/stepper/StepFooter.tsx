import { Box, Stack } from "@mui/material";
import CancelButton from "../buttons/CancelButton";
import ValidateButton from "../buttons/ValidateButton";
import { FC } from "react";

const StepFooter: FC = () => {
  return (
    <Box mr={4} display="flex" justifyContent="center">
      <Stack direction="row">
        <CancelButton sx={{ minWidth: "130px" }}>Annuler</CancelButton>
        <ValidateButton sx={{ minWidth: "130px" }}>
          Étape suivante
        </ValidateButton>
      </Stack>
    </Box>
  );
};

export default StepFooter;
