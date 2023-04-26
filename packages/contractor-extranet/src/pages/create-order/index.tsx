import { Box, Divider } from "@mui/material";
import { useContext, useMemo, useState } from "react";
import StepsSummary from "@/components/common/stepper/StepsSummary";
import StepContent from "@/components/common/stepper/StepContent";
import SelectServices from "@/components/createOrder/forms/selectServices";
import { StepDefinition } from "@/components/common/stepper/types";
import RealEstateForm from "@/components/createOrder/forms/realEstate";
import ContactForm from "@/components/createOrder/forms/contact";
import AppointmentForm from "@/components/createOrder/forms/appointment";
import { ContractorContext } from "@/context/contractor";
import { useMutation } from "@tanstack/react-query";
import router from "next/router";
import { createOrder } from "@/queries/orders";

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
      return stepStates;
    }
    default: {
      return {};
    }
  }
};

const CreateOrderStepper = () => {
  const { mutate } = useMutation({
    mutationFn: createOrder,
    onSuccess: ({data}) => {
      router.push(`/summary-order/${data.id}`);
    },
  });
  const [activeStep, setActiveStep] = useState(0);
  const contractorContext = useContext(ContractorContext);

  const currentStep = steps[activeStep];

  const [stepStates, setStepStates] = useState(
    steps.reduce((acc, step) => {
      if (step.id === "services") {
        acc[step.id] = {
          options: contractorContext.contractor?.serviceOptions ?? [],
        };
        return acc;
      } else {
        acc[step.id] = {};
      }
      return acc;
    }, {} as Record<string, any>)
  );

  const handleNext = (formState: any) => {
    if (currentStep.id === "appointment") {
      return mutate(contextValues);
    }
    setStepStates((prevStepStates) => ({
      ...prevStepStates,
      [currentStep.id]: formState,
    }));

    if (currentStep.id === "appointment") {
      contextValues.appointment = formState
      return mutate(contextValues);
    }
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
        initialValues={stepStates[currentStep.id]}
      />
    </Box>
  );
};

export default CreateOrderStepper;
