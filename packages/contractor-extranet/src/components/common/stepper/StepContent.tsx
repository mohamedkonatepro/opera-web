import { Box, Divider, Stack, Typography } from "@mui/material";
import StepFooter from "./StepFooter";
import StepHeader from "./StepHeader";
import { FC } from "react";
import { StepContentProps } from "./types";

const StepContent: FC<StepContentProps> = ({
  step,
  currentStepNumber,
  handleNext,
  handleBack,
  handleReset,
}) => {
  const StepForm = step.form;
  return (
    <Box display="flex" flexDirection="column" width={1} mt={4}>
      <Stack spacing={4} mb={5} divider={<Divider flexItem />}>
        <StepHeader {...step} stepNumber={currentStepNumber} />
        <Box mr={4} display="flex" justifyContent="center">
          <StepForm formId={`${step.id}-form`} onSubmit={handleNext} />
        </Box>
      </Stack>
      <StepFooter
        formId={`${step.id}-form`}
        handleBack={handleBack}
        handleReset={handleReset}
      />
    </Box>
  );
};

export default StepContent;
