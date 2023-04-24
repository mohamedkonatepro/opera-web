import { Stack } from "@mui/material";
import CancelButton from "../buttons/CancelButton";
import ValidateButton from "../buttons/ValidateButton";
import { FC } from "react";
import { StepFooterProps } from "./types";

const StepFooter: FC<StepFooterProps> = ({ formId, handleReset, submitButtonDisabled }) => {
  return (
    <Stack direction="row" justifyContent="space-between">
      <CancelButton onClick={handleReset} sx={{ minWidth: "130px" }}>
        Annuler
      </CancelButton>
      <ValidateButton sx={{ minWidth: "130px" }} disabled={submitButtonDisabled} form={formId}>
        Étape suivante
      </ValidateButton>
    </Stack>
  );
};

export default StepFooter;
