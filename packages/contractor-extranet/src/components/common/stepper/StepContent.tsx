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
  width,
}) => {
  const StepForm = step.form;
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
          <StepForm formId={`${step.id}-form`} onSubmit={handleNext} />
        </Box>
      </Box>

      <Box mr={4} display="flex" justifyContent="center" mb={6}>
        <Box width={width}>
          <StepFooter
            formId={`${step.id}-form`}
            handleBack={handleBack}
            handleReset={handleReset}
          />
          </Box>
      </Box>

    </Box>
  );
};

export default StepContent;
