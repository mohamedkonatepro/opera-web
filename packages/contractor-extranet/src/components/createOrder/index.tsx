import { createOrder } from "@/queries/orders";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { steps } from "./constants";
import {
  getContextValuesForStep,
  getInitialValues,
  getTextForEstimateDialog,
  needsEstimate,
} from "./utils";
import { Box, Divider } from "@mui/material";
import StepsSummary from "../common/stepper/StepsSummary";
import StepContent from "../common/stepper/StepContent";
import { ServiceType } from "@/types/ServiceType";
import Contractor from "@/types/Contractor";
import qs from "qs";
import InfoDialog from "../common/dialogs/InfoDialog";
import CancelButton from "../common/buttons/CancelButton";
import ContainedButton from "../common/buttons/ContainedButton";
import { Service } from "@/types/Service";
import { ServiceOption } from "@/types/ServiceOption";

const CreateOrderStepper: React.FC<{
  realEstate: any;
  serviceTypes: ServiceType[];
  contractor: Contractor;
}> = ({ realEstate, serviceTypes, contractor }) => {
  const router = useRouter();
  const { mutate } = useMutation({
    mutationFn: createOrder,
    onSuccess: ({ data }) => {
      router.push(`/order/${data.orderId}`);
    },
  });
  const [activeStep, setActiveStep] = useState(1);

  const [isButtonAppointmentVisible, setIsButtonAppointmentVisible] =
    useState(false);
  const [submitWithAppointment, setSubmitWithAppointment] = useState(false);
  const currentStep = steps[activeStep - 1];

  const [stepStates, setStepStates] = useState(
    getInitialValues(contractor, realEstate, { serviceTypes })
  );

  useEffect(() => {
    setStepStates(
      getInitialValues(userContext.user.contractor, realEstate, {
        serviceTypes,
      })
    );
  }, [userContext.user.contractor, realEstate, serviceTypes]);

  const [needEstimateDialogOpen, setNeedEstimateDialogOpen] = useState(false);

  const handleNext = (formState: any) => {
    setStepStates((prevStepStates) => {
      const newStepStates = { ...prevStepStates };
      newStepStates[currentStep.id] = formState;

      if (currentStep.id === "services" && !!formState.surface) {
        newStepStates.realEstate.surface = formState.surface;
      }

      return newStepStates;
    });

    if (
      currentStep.id === "services" &&
      needsEstimate(formState.selectedServiceType, formState.surface)
    ) {
      setNeedEstimateDialogOpen(true);
      return;
    }

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
    router.push("/");
  };

  const redirectToEstimate = () => {
    const { serviceType, services, options, surface } = stepStates.services;
    const query = qs.stringify({
      realEstateId: realEstate.id,
      serviceType: serviceType.id,
      services: services.map((service: Service) => service.id).join(","),
      options: options
        .map((serviceOption: ServiceOption) => serviceOption.id)
        .join(","),
      surface,
    });

    router.push(`/create-estimate?${query}`);
  };

  const contextValues = useMemo(() => {
    return getContextValuesForStep(activeStep, stepStates, { serviceTypes });
  }, [activeStep, stepStates, serviceTypes]);

  useEffect(() => {
    if (currentStep.id !== "appointment") {
      setIsButtonAppointmentVisible(false);
    }
  }, [currentStep]);

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
          isButtonAppointmentVisible={isButtonAppointmentVisible}
          setIsButtonAppointmentVisible={setIsButtonAppointmentVisible}
          submitWithAppointment={submitWithAppointment}
          setSubmitWithAppointment={setSubmitWithAppointment}
        />
      </Box>
      <InfoDialog
        open={needEstimateDialogOpen}
        title="Une demande de devis est nécessaire"
        text={getTextForEstimateDialog(stepStates.services.serviceType)}
        onClose={() => setNeedEstimateDialogOpen(false)}
        maxWidth={584}
        actions={
          <>
            <CancelButton onClick={() => setNeedEstimateDialogOpen(false)}>
              Annuler
            </CancelButton>
            <ContainedButton
              color="secondary"
              padding="large"
              onClick={() => {
                redirectToEstimate();
              }}
            >
              Faire une demande de devis
            </ContainedButton>
          </>
        }
      />
    </>
  );
};

export default CreateOrderStepper;
