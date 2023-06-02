import { Stack } from "@mui/material";
import CancelButton from "../buttons/CancelButton";
import ValidateButton from "../buttons/ValidateButton";
import { FC } from "react";
import { StepFooterProps } from "./types";

const StepFooterEstimate: FC<StepFooterProps> = ({
  formId,
  currentStepNumber,
  handleReset,
  handleBack,
  submitButtonDisabled,
}) => {
  return (
    <Stack direction="row" justifyContent="space-between">
      <CancelButton
        onClick={currentStepNumber === 1 ? handleReset : handleBack}
        sx={{ minWidth: "130px" }}
      >
        Précédent
      </CancelButton>
      <ValidateButton
        sx={{ minWidth: "130px" }}
        disabled={submitButtonDisabled}
        form={formId}
      >
        Envoyer la demande de devis
      </ValidateButton>
    </Stack>
  );
};

export default StepFooterEstimate;
