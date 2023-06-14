export interface StepDefinition {
  id: string;
  title: string;
  label: string;
  description: string;
  form: React.FC<{
    formId: string;
    onSubmit: (formState: any) => void;
    contextValues: any;
    initialValues: any;
    setSubmitButtonDisabled: (disabled: boolean) => void;
    setIsButtonAppointmentVisible?: (disabled: boolean) => void;
    submitWithAppointment?: boolean;
    [key: string]: any;
  }>;
  footer: React.FC<StepFooterProps & StepFooterAppointmentProps>;
}

export interface StepHeaderProps extends Omit<StepDefinition, "form"> {
  stepNumber: number;
  width?: number;
}

export interface StepsSummaryProps {
  steps: StepDefinition[];
  currentStepNumber: number;
}

export interface StepContentProps {
  currentStepNumber: number;
  step: StepDefinition;
  width?: number;
  contextValues: any;
  initialValues: any;
  handleNext: (formState: any) => void;
  handleBack: () => void;
  handleReset: () => void;
  isButtonAppointmentVisible?: boolean;
  setIsButtonAppointmentVisible?: (disabled: boolean) => void;
  submitWithAppointment?: boolean;
  setSubmitWithAppointment?: (disabled: boolean) => void;
  [key: string]: any;
}

export interface StepFooterProps {
  formId: string;
  handleBack: () => void;
  handleReset: () => void;
  submitButtonDisabled: boolean;
  currentStepNumber: number;
}

export interface StepFooterAppointmentProps {
  formId: string;
  handleBack: () => void;
  isButtonAppointmentVisible?: boolean;
  setSubmitWithAppointment?: (disabled: boolean) => void;
}
