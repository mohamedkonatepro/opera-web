export interface StepDefinition {
  id: string;
  title: string;
  label: string;
  description: string;
  form: React.FC<{
    formId: string;
    onSubmit: (formState: any) => void;
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
  handleNext: (formState: any) => void;
  handleBack: () => void;
  handleReset: () => void;
}

export interface StepFooterProps {
  formId: string;
  handleBack: () => void;
  handleReset: () => void;
}
