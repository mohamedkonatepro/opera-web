import { Box, Divider, Stack, Typography } from "@mui/material";
import StepFooter from "./StepFooter";
import StepHeader from "./StepHeader";
import { FC, useState } from "react";
import { StepContentProps } from "./types";

const StepContent: FC<StepContentProps> = ({
  step,
  currentStepNumber,
  handleNext,
  handleBack,
  handleReset,
  width,
  contextValues,
  initialValues,
  submitButtonLabel = "Étape suivante",
  cancelButtonLabel = "Étape précédente",
}) => {
  const StepForm = step.form;

  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  return (
    <Box display="flex" flexDirection="column" width={1}>
      <Box mt={4} mb={4} mr={4} display="flex" justifyContent="center">
        <Box width={width}>
          <StepHeader {...step} stepNumber={currentStepNumber} />
        </Box>
      </Box>

      <Divider flexItem />

      <Box mr={4} mt={4} mb={5} display="flex" justifyContent="center">
        <Box width={width}>
          <StepForm
            formId={`${step.id}-form`}
            onSubmit={handleNext}
            contextValues={contextValues}
            initialValues={initialValues}
            setSubmitButtonDisabled={setSubmitButtonDisabled}
          />
        </Box>
      </Box>

      <Box mr={4} display="flex" justifyContent="center" mb={6}>
        <Box width={width}>
          <StepFooter
            formId={`${step.id}-form`}
            handleBack={handleBack}
            handleReset={handleReset}
            submitButtonLabel={submitButtonLabel}
            submitButtonDisabled={submitButtonDisabled}
            cancelButtonLabel={cancelButtonLabel}
            currentStepNumber={currentStepNumber}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default StepContent;
