import { Family } from "@/types/Family";

export interface SelectServicesProps {
  formId: string;
  onSubmit: (formState: any) => void;
}

export interface SelectServicesFormProps extends SelectServicesProps {
  families: Family[];
}
