import { Family } from "@/types/Family";
import { Service } from "@/types/Service";
import { ServiceOption } from "@/types/ServiceOption";
import { ServiceType } from "@/types/ServiceType";

export interface SelectServiceProps {
  selectedServiceType: ServiceType;
  setSelectedServiceType: (serviceType: ServiceType) => void;
  serviceTypes: ServiceType[];
}

export interface SelectServicesProps {
  formId: string;
  contextValues: {
    serviceTypes: ServiceType[];
  };
  onSubmit: (formState: any) => void;
  setSubmitButtonDisabled: (disabled: boolean) => void;
  initialValues: {
    options?: ServiceOption[];
    family?: Family;
    services?: Service[];
    serviceType: ServiceType;
    surface?: number;
  };
}

export interface SelectServicesFormProps extends SelectServicesProps {
  families: Family[];
}
