import { Service } from "@/types/Service";
import formatServiceOption from "./formatServiceOption";

const formatService = (service: any): Service => {
  const { id, attributes } = service;
  const { name, code, service_options } = attributes;
  const formattedServiceOptions =
    service_options?.data?.map(formatServiceOption) ?? [];

  return { id, name, code, options: formattedServiceOptions };
};

export default formatService;
