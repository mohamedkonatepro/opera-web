import { ContractorContextType } from "@/context/contractor";
import { steps } from "./constants";

export const getContextValuesForStep = (activeStep: number, stepStates: any) => {
  switch (activeStep) {
    case 2: {
      return {
        services: stepStates.services.services,
        family: stepStates.services.family,
      };
    }
    case 3: {
      return {
        services: stepStates.services.services,
      };
    }
    case 4: {
      return stepStates;
    }
    default: {
      return {};
    }
  }
};

export const getSubmitButtonLabel = (activeStep: number) => {
  switch (activeStep) {
    case 4: {
      return "Continuer sans rendez-vous";
    }
    default: {
      return undefined;
    }
  }
};

export const getCancelButtonLabel = (activeStep: number) => {
  switch (activeStep) {
    case 1: {
      return "Annuler";
    }
    default: {
      return undefined;
    }
  }
}

export const getInitialValues = (contractor: ContractorContextType["contractor"]) => {
  return steps.reduce((acc, step) => {
    if (step.id === "services") {
      acc[step.id] = {
        options: contractor?.serviceOptions ?? [],
      };
      return acc;
    } else {
      acc[step.id] = {};
    }
    return acc;
  }, {} as Record<string, any>)
}
