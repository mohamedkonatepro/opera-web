import { ServiceOption } from "@/types/ServiceOption";

const formatServiceOption = (serviceOption: any): ServiceOption => {
  const { id, attributes } = serviceOption;
  const { name, code } = attributes;

  return { id, name, code };
};

export default formatServiceOption;
