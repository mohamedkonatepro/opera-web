import { Box, Divider, Stack, Typography } from "@mui/material";
import StepFooter from "./StepFooter";
import StepHeader from "./StepHeader";
import { FC, useEffect, useState } from "react";
import { StepContentProps } from "./types";
import { rest } from "lodash";

const StepContent: FC<StepContentProps> = ({
  step,
  currentStepNumber,
  handleNext,
  handleBack,
  handleReset,
  width,
  contextValues,
  initialValues,
  isButtonAppointmentVisible,
  setIsButtonAppointmentVisible,
  submitWithAppointment,
  setSubmitWithAppointment,
  ...rest
}) => {
  const StepForm = step.form;
  const StepFooterCurrent = step.footer;

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
            setIsButtonAppointmentVisible={setIsButtonAppointmentVisible}
            submitWithAppointment={submitWithAppointment}
            {...rest}
          />
        </Box>
      </Box>

      <Box mr={4} display="flex" justifyContent="center" mb={6}>
        <Box width={width}>
          <StepFooterCurrent
            formId={`${step.id}-form`}
            handleBack={handleBack}
            handleReset={handleReset}
            submitButtonDisabled={submitButtonDisabled}
            currentStepNumber={currentStepNumber}
            isButtonAppointmentVisible={isButtonAppointmentVisible}
            setSubmitWithAppointment={setSubmitWithAppointment}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default StepContent;
