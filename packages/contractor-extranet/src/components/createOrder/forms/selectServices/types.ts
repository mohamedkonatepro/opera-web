import { Family } from "@/types/Family";
import { Service } from "@/types/Service";
import { ServiceOption } from "@/types/ServiceOption";

export interface SelectServicesProps {
  formId: string;
  onSubmit: (formState: any) => void;
  setSubmitButtonDisabled: (disabled: boolean) => void;
  initialValues?: {
    options?: ServiceOption[];
    family?: Family;
    services?: Service[]
  };
}

export interface SelectServicesFormProps extends SelectServicesProps {
  families: Family[];
}
