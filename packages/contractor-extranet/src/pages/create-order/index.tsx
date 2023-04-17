import { Box, Divider, Stack, Typography } from "@mui/material";
import { useState } from "react";
import StepsSummary from "@/components/common/stepper/StepsSummary";
import StepContent from "@/components/common/stepper/StepContent";
import SelectServices from "@/components/createOrder/forms/SelectServices";
import { StepDefinition } from "@/components/common/stepper/types";

const steps: StepDefinition[] = [
  {
    label: "Services",
    title: "Services et options de ma commande",
    description:
      "Une fois votre sélection terminée, passez à l'étape suivante.",
    form: SelectServices,
  },
];

const CreateOrderStepper = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const currentStep = steps[activeStep];

  return (
    <Box display="flex" height={1} width={1}>
      <StepsSummary steps={steps} currentStepNumber={activeStep + 1} />
      <Divider flexItem orientation="vertical" />
      <StepContent step={currentStep} currentStepNumber={activeStep + 1} />
    </Box>
  );
};

export default CreateOrderStepper;
