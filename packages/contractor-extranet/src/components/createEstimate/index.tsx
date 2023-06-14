import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { steps } from "./constants";
import { Box, Divider } from "@mui/material";
import StepsSummary from "../common/stepper/StepsSummary";
import StepContent from "../common/stepper/StepContent";
import { ServiceType } from "@/types/ServiceType";
import { getContextValuesForStep, getInitialValues } from "./utils";
import { Service } from "@/types/Service";
import Contractor from "@/types/Contractor";
import SuccessDialog from "../common/dialogs/SuccessDialog";
import { createEstimate } from "@/queries/estimate";
import ErrorDialog from "../common/dialogs/ErrorDialog";

interface QueryData {
  serviceType: string;
  services: string;
  options: string;
}

const CreateEstimateStepper: React.FC<{
  realEstate?: any;
  servicesData: Service[];
  serviceTypes: ServiceType[];
  contractor: Contractor;
}> = ({ realEstate, servicesData, serviceTypes, contractor }) => {
  const router = useRouter();
  const { serviceType, services, options, surface, from } = router.query;

  const [estimateRequestedDialogOpen, setEstimateRequestedDialogOpen] = useState(false);
  const [estimateRequestedErrorDialogOpen, setEstimateRequestedErrorDialogOpen] = useState(false);

  const { mutate } = useMutation({
    mutationFn: createEstimate,
    onSuccess: ({ data }) => {
      setEstimateRequestedDialogOpen(true)
    },
    onError: () => {
      setEstimateRequestedErrorDialogOpen(true)
    }
  });


  const queryParams = useMemo(
    () => ({
      serviceType: typeof serviceType === "string" ? parseInt(serviceType) : 0,
      services:
        typeof services === "string"
          ? services.split(",").map((service) => parseInt(service)).filter((service) => !!service)
          : [],
      options:
        typeof options === "string"
          ? options.split(",").map((option) => parseInt(option)).filter((option) => !!option)
          : [],
      surface: typeof surface === "string" ? parseInt(surface) : 0,
    }),
    [serviceType, services, options, surface]
  );

  const [activeStep, setActiveStep] = useState(from === 'order' ? 2 : 1);

  const currentStep = steps[activeStep - 1];

  const [stepStates, setStepStates] = useState(
    getInitialValues(servicesData, queryParams, realEstate)
  );

  useEffect(() => {
    setStepStates(getInitialValues(servicesData, queryParams, realEstate));
  }, [queryParams, servicesData, realEstate]);

  const handleNext = (formState: any) => {
    setStepStates((prevStepStates) => ({
      ...prevStepStates,
      [currentStep.id]: formState,
    }));

    if (activeStep === steps.length) {
      const allStates = {
        ...stepStates,
        [currentStep.id]: formState,
      }
      mutate({
        realEstate: allStates.informationEstimate.realEstate,
        services: queryParams.services,
        options: queryParams.options,
        surface: queryParams.surface,
        occupation: allStates.informationEstimate.occupation,
        date: allStates.informationEstimate.date,
        furtherInformations: allStates.informationEstimate.furtherInformations,
        contractor: {
          id: contractor.id,
          firstname: allStates.informationEstimate.contractor.firstname,
          lastname: allStates.informationEstimate.contractor.lastname,
          email: allStates.informationEstimate.contractor.email,
        }
      });
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    // router.push(router.pathname);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    router.push("/");
  };

  const contextValues = useMemo(() => {
    return getContextValuesForStep(
      activeStep,
      stepStates,
      { serviceTypes },
      queryParams
    );
  }, [activeStep, stepStates, serviceTypes, queryParams]);

  return (
    <>
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
        />
      </Box>
      <ErrorDialog
        open={estimateRequestedErrorDialogOpen}
        title="Erreur"
        text="Une erreur est survenue lors de la demande de devis. Veuillez réessayer ultérieurement."
        maxWidth={584}
        onClose={() => setEstimateRequestedErrorDialogOpen(false)}
      />
      <SuccessDialog
        open={estimateRequestedDialogOpen}
        title="Demande de devis validée"
        text={`
        Votre demande de devis a été transmise à nos équipes.
        Le devis sera envoyé au plus vite par nos équipes à l’adresse mail suivante : ${stepStates?.contractor?.email}
        `}
        maxWidth={584}
        onClose={() => setEstimateRequestedDialogOpen(false)}
      />
    </>
  );
};

export default CreateEstimateStepper;
