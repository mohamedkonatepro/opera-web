import { Family } from "@/types/Family";
import { ServiceOption } from "@/types/ServiceOption";

export interface SelectServicesProps {
  formId: string;
  onSubmit: (formState: any) => void;
  setSubmitButtonDisabled: (disabled: boolean) => void;
  initialValues?: {
    options?: ServiceOption[];
  };
}

export interface SelectServicesFormProps extends SelectServicesProps {
  families: Family[];
}
