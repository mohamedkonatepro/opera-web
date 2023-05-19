import { createOrder } from "@/queries/orders";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext, useEffect, useMemo, useState } from "react";
import { steps } from "./constants";
import { getContextValuesForStep, getInitialValues } from "./utils";
import { Box, Divider } from "@mui/material";
import StepsSummary from "../common/stepper/StepsSummary";
import StepContent from "../common/stepper/StepContent";
import { useQuery } from '@tanstack/react-query';
import { getRealEstate } from "@/queries/realEstates";
const contractor = {}

const CreateOrderStepper = () => {
  const [realEstate, setRealEstate] = useState<any>({})
  const router = useRouter();
  const { realEstateId } = router.query;
  const { mutate } = useMutation({
    mutationFn: createOrder,
    onSuccess: ({ data }) => {
      router.push(`${process.env.NEXT_PUBLIC_OG_EXTRANET_URL}/ordremission.asp?numcom=${data.orderId}`);
    },
  });
  const [activeStep, setActiveStep] = useState(1);

  useQuery({
    queryKey: ["getRealEstate"],
    enabled: !!realEstateId,
    queryFn: () => getRealEstate(realEstateId as string),
    onSuccess: (data) => {
      setRealEstate(data)
    },
  });

  const [isButtonAppointmentVisible, setIsButtonAppointmentVisible] =
    useState(false);
  const [submitWithAppointment, setSubmitWithAppointment] = useState(false);
  const currentStep = steps[activeStep - 1];

  useEffect(() => {
    setStepStates(
      getInitialValues(contractor, realEstate)
    );
  }, [contractor, realEstate]);

  const [stepStates, setStepStates] = useState(
    getInitialValues(contractor, realEstate)
  );

  const handleNext = (formState: any) => {
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
    router.push("/");
  };

  const contextValues = useMemo(() => {
    return getContextValuesForStep(activeStep, stepStates);
  }, [activeStep, stepStates]);

  useEffect(() => {
    if (currentStep.id !== "appointment") {
      setIsButtonAppointmentVisible(false);
    }
  }, [currentStep]);

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
        isButtonAppointmentVisible={isButtonAppointmentVisible}
        setIsButtonAppointmentVisible={setIsButtonAppointmentVisible}
        submitWithAppointment={submitWithAppointment}
        setSubmitWithAppointment={setSubmitWithAppointment}
      />
    </Box>
  );
};

export default CreateOrderStepper;
