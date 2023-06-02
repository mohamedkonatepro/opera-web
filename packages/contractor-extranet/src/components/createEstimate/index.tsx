import { createOrder } from "@/queries/orders";
import { useMutation, useQuery } from "@tanstack/react-query";
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

interface QueryData {
  serviceType: string;
  services: string;
  options: string;
}

const CreateEstimateStepper: React.FC<{
  realEstate: any;
  servicesData: Service[];
  serviceTypes: ServiceType[];
  contractor: Contractor;
}> = ({ realEstate, servicesData, serviceTypes, contractor }) => {
  const router = useRouter();
  const { serviceType, services, options, surface } = router.query

  const queryParams = useMemo(() => ({
    serviceType: typeof serviceType === 'string' ? parseInt(serviceType) : 0,
    services: typeof services === 'string' ? services.split(",").map(service => parseInt(service)) : [],
    options: typeof options === 'string' ? options.split(",").map(option => parseInt(option)) : [],
    surface: typeof surface === 'string' ? parseInt(surface) : 0
  }), [serviceType, services, options, surface]);
  
  const [activeStep, setActiveStep] = useState(2);

  const currentStep = steps[activeStep - 1];

  useEffect(() => {
    setStepStates(
      getInitialValues(servicesData, queryParams)
    );
  }, [queryParams, servicesData]);

  const [stepStates, setStepStates] = useState(
    getInitialValues(servicesData, queryParams)
  );

  const handleNext = (formState: any) => {
    setStepStates((prevStepStates) => ({
      ...prevStepStates,
      [currentStep.id]: formState,
    }));

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    // router.push(router.pathname);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    router.push("/");
  };

  const contextValues = useMemo(() => {
    return getContextValuesForStep(activeStep, stepStates, { serviceTypes }, queryParams);
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
      />
    </Box>
  );
};

export default CreateEstimateStepper;
