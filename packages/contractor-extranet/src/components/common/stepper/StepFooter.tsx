import { Stack } from "@mui/material";
import CancelButton from "../buttons/CancelButton";
import ValidateButton from "../buttons/ValidateButton";
import { FC } from "react";
import { StepFooterProps } from "./types";

const StepFooter: FC<StepFooterProps> = ({
  formId,
  currentStepNumber,
  handleReset,
  handleBack,
  submitButtonDisabled,
  submitButtonLabel = "Étape suivante",
  cancelButtonLabel = "Étape précédente",
}) => {
  return (
    <Stack direction="row" justifyContent="space-between">
      <CancelButton
        onClick={currentStepNumber === 1 ? handleReset : handleBack}
        sx={{ minWidth: "130px" }}
      >
        {cancelButtonLabel}
      </CancelButton>
      <ValidateButton
        sx={{ minWidth: "130px" }}
        disabled={submitButtonDisabled}
        form={formId}
      >
        {submitButtonLabel}
      </ValidateButton>
    </Stack>
  );
};

export default StepFooter;
