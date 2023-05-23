import { Service } from "@/types/Service";
import formatServiceOption from "./formatServiceOption";
import formatServiceType from "./formatServiceType";

const formatService = (service: any): Service => {
  const { id, attributes } = service;
  const { name, code, item_reference, service_options, serviceTypes } =
    attributes;
  const formattedServiceOptions =
    service_options?.data?.map(formatServiceOption) ?? [];

  const formattedServiceTypes =
    serviceTypes?.data?.map(formatServiceType) ?? [];
  return {
    id,
    name,
    code,
    item_reference,
    options: formattedServiceOptions,
    serviceTypes: formattedServiceTypes,
  };
};

export default formatService;
