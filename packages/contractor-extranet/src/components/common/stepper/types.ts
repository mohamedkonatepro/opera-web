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
  }>;
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
  submitButtonLabel?: string;
  cancelButtonLabel?: string;
}

export interface StepFooterProps {
  formId: string;
  handleBack: () => void;
  handleReset: () => void;
  submitButtonDisabled: boolean;
  submitButtonLabel?: string;
  cancelButtonLabel?: string;
  currentStepNumber: number;
}
