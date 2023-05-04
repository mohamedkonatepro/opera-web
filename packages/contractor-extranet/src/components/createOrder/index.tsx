import { ContractorContext, ContractorContextType } from "@/context/contractor";
import { createOrder } from "@/queries/orders";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext, useMemo, useState } from "react";
import { steps } from "./constants";
import {
  getCancelButtonLabel,
  getContextValuesForStep,
  getInitialValues,
  getSubmitButtonLabel,
} from "./utils";
import { Box, Divider } from "@mui/material";
import StepsSummary from "../common/stepper/StepsSummary";
import StepContent from "../common/stepper/StepContent";

const CreateOrderStepper = () => {
  const router = useRouter();
  const { mutate } = useMutation({
    mutationFn: createOrder,
    onSuccess: ({ data }) => {
      router.push(`/summary-order/${data.id}`);
    },
  });
  const [activeStep, setActiveStep] = useState(1);
  const contractorContext = useContext(ContractorContext);

  const currentStep = steps[activeStep - 1];

  const [stepStates, setStepStates] = useState(
    getInitialValues(contractorContext.contractor)
  );

  const handleNext = (formState: any) => {
    console.log(formState, currentStep.id);
    setStepStates((prevStepStates) => ({
      ...prevStepStates,
      [currentStep.id]: formState,
    }));

    if (currentStep.id === "appointment") {
      contextValues.appointment = formState;
      return mutate(contextValues);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setStepStates(getInitialValues(contractorContext.contractor));
    setActiveStep(1);
  };

  const contextValues = useMemo(() => {
    return getContextValuesForStep(activeStep, stepStates);
  }, [activeStep, stepStates]);

  return (
    <Box display="flex" height={1} width={1}>
      <StepsSummary steps={steps} currentStepNumber={activeStep} />
      <Divider flexItem orientation="vertical" />
      <StepContent
        step={currentStep}
        currentStepNumber={activeStep}
        handleNext={handleNext}
        handleBack={handleBack}
        handleReset={handleReset}
        width={536}
        contextValues={contextValues}
        initialValues={stepStates[currentStep.id]}
        submitButtonLabel={getSubmitButtonLabel(activeStep)}
        cancelButtonLabel={getCancelButtonLabel(activeStep)}
      />
    </Box>
  );
};

export default CreateOrderStepper;
