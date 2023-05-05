import { Family } from "@/types/Family";
import { Service } from "@/types/Service";
import { ServiceOption } from "@/types/ServiceOption";
import { ServiceType } from "@/types/ServiceType";

export interface SelectServiceProps {
  selectedServiceType: ServiceType;
  setSelectedServiceType: (serviceType: ServiceType) => void;
}

export interface SelectServicesProps {
  formId: string;
  onSubmit: (formState: any) => void;
  setSubmitButtonDisabled: (disabled: boolean) => void;
  initialValues?: {
    options?: ServiceOption[];
    family?: Family;
    services?: Service[];
    serviceType?: ServiceType;
  };
}

export interface SelectServicesFormProps extends SelectServicesProps {
  families: Family[];
}
