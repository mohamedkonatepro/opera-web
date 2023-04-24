import { Box, Divider } from "@mui/material";
import { useMemo, useState } from "react";
import StepsSummary from "@/components/common/stepper/StepsSummary";
import StepContent from "@/components/common/stepper/StepContent";
import SelectServices from "@/components/createOrder/forms/selectServices";
import { StepDefinition } from "@/components/common/stepper/types";
import RealEstateForm from "@/components/createOrder/forms/realEstate";
import ContactForm from "@/components/createOrder/forms/contact";
import AppointmentForm from "@/components/createOrder/forms/appointment";

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
    id: "contacts",
    label: "Informations de contact",
    title: "Informations de contact",
    description:
      "Une fois votre sélection terminée, passez à l’étape suivante.",
    form: ContactForm,
  },
  {
    id: "realEstate",
    label: "Informations du bien",
    title: "Informations du bien",
    description:
      "Une fois votre sélection terminée, passez à l’ étape suivante.",
    form: RealEstateForm,
  },
  {
    id: "appointment",
    label: "Rendez-vous",
    title: "Rendez-vous",
    description:
      "Une fois votre sélection terminée, passez à l’étape suivante.",
    form: AppointmentForm,
  },
];

const getContextValuesForStep = (activeStep: number, stepStates: any) => {
  switch (activeStep) {
    case 1: {
      return {
        services: stepStates.services.services,
        family: stepStates.services.family,
      };
    }
    case 2: {
      return {
        services: stepStates.services.services,
      };
    }
    case 3: {
      return {
        realEstate: stepStates.realEstate,
      };
    }
    default: {
      return {};
    }
  }
};

const CreateOrderStepper = () => {
  const [activeStep, setActiveStep] = useState(0);

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

  const contextValues = useMemo(() => {
    return getContextValuesForStep(activeStep, stepStates);
  }, [activeStep, stepStates]);

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
        contextValues={contextValues}
      />
    </Box>
  );
};

export default CreateOrderStepper;
