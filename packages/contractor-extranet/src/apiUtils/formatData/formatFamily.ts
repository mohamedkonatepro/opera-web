import { Family } from "@/types/Family";
import formatService from "./formatService";

const formatFamily = (family: any): Family => {
  const { id, attributes } = family;
  const { name, code, services } = attributes;
  const formattedServices = services?.data?.map(formatService) ?? [];

  return { id, name, code, services: formattedServices };
}

export default formatFamily;

