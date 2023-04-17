import { Box, Stack } from "@mui/material";
import CancelButton from "../buttons/CancelButton";
import ValidateButton from "../buttons/ValidateButton";
import { FC } from "react";
import { StepFooterProps } from "./types";

const StepFooter: FC<StepFooterProps> = ({ formId, handleReset }) => {
  return (
    <Box mr={4} display="flex" justifyContent="center">
      <Stack direction="row">
        <CancelButton onClick={handleReset} sx={{ minWidth: "130px" }}>
          Annuler
        </CancelButton>
        <ValidateButton sx={{ minWidth: "130px" }} form={formId}>
          Étape suivante
        </ValidateButton>
      </Stack>
    </Box>
  );
};

export default StepFooter;
