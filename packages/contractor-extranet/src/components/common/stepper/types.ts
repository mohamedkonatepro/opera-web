export interface StepDefinition {
  title: string;
  label: string;
  description: string;
  form: React.FC;
}

export interface StepHeaderProps extends Omit<StepDefinition, "form"> {
  stepNumber: number;
}

export interface StepsSummaryProps {
  steps: StepDefinition[];
  currentStepNumber: number;
}

export interface StepContentProps {
  currentStepNumber: number;
  step: StepDefinition;
}
