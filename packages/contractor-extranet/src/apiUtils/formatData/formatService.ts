import { Service } from "@/types/Service";
import formatServiceOption from "./formatServiceOption";

const formatService = (service: any): Service => {
  const { id, attributes } = service;
  const { name, code, item_reference, service_options } = attributes;
  const formattedServiceOptions =
    service_options?.data?.map(formatServiceOption) ?? [];

  return { id, name, code, item_reference, options: formattedServiceOptions };
};

export default formatService;
