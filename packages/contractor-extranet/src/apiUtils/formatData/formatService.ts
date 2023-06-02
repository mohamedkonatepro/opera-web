import { Service } from "@/types/Service";
import formatServiceOption from "./formatServiceOption";
import formatServiceType from "./formatServiceType";
import formatFamily from "./formatFamily";

const formatService = (service: any): Service => {
  const { id, attributes } = service;
  const {
    name,
    code,
    item_reference,
    service_options,
    serviceTypes,
    family,
    position,
  } = attributes;
  const formattedServiceOptions =
    service_options?.data?.map(formatServiceOption) ?? [];

  const formattedServiceTypes =
    serviceTypes?.data?.map(formatServiceType) ?? [];

  const formattedFamily = formatFamily(family?.data);

  return {
    id,
    name,
    code,
    position,
    item_reference,
    options: formattedServiceOptions,
    serviceTypes: formattedServiceTypes,
    family: formattedFamily,
  };
};

export default formatService;
