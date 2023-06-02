import { Family } from "@/types/Family";
import formatService from "./formatService";
import { Service } from "@/types/Service";

const formatFamily = (family: any): Family | null => {
  if (!family) {
    return null
  }
  const { id, attributes } = family;
  const { name, code, services } = attributes;

  const formattedServices: Service[] = (
    services?.data?.map(formatService) ?? []
  ).sort((a: Service, b: Service) => a.position - b.position);

  return { id, name, code, services: formattedServices };
};

export default formatFamily;
