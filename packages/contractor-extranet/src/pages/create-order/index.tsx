import { Box, Divider } from "@mui/material";
import { useState } from "react";
import StepsSummary from "@/components/common/stepper/StepsSummary";
import StepContent from "@/components/common/stepper/StepContent";
import SelectServices from "@/components/createOrder/forms/selectServices";
import { StepDefinition } from "@/components/common/stepper/types";
import RealEstateForm from "@/components/createOrder/forms/realEstate";

const steps: StepDefinition[] = [
  {
    id: "services",
    label: "Services",
    title: "Services et options de ma commande",
    description:
      "Une fois votre sélection terminée, passez à l'étape suivante.",
    form: SelectServices,
  },
  {
    id: "realEstate",
    label: "Informations du bien",
    title: "Informations du bien",
    description:
      "Une fois votre sélection terminée, passez à l’étape suivante.",
    form: RealEstateForm,
  },
];

const CreateOrderStepper = () => {
  const [activeStep, setActiveStep] = useState(1);

  const currentStep = steps[activeStep];

  const [stepStates, setStepStates] = useState(
    steps.reduce((acc, step) => {
      acc[step.id] = {};
      return acc;
    }, {} as Record<string, any>)
  );

  const handleNext = (formState: any) => {
    setStepStates((prevStepStates) => ({
      ...prevStepStates,
      [currentStep.id]: formState,
    }));
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setStepStates(
      steps.reduce((acc, step) => {
        acc[step.id] = {};
        return acc;
      }, {} as Record<string, any>)
    );
    setActiveStep(0);
  };

  return (
    <Box display="flex" height={1} width={1}>
      <StepsSummary steps={steps} currentStepNumber={activeStep + 1} />
      <Divider flexItem orientation="vertical" />
      <StepContent
        step={currentStep}
        currentStepNumber={activeStep + 1}
        handleNext={handleNext}
        handleBack={handleBack}
        handleReset={handleReset}
        width={536}
      />
    </Box>
  );
};

export default CreateOrderStepper;
