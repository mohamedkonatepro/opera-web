import { ServiceOption } from "@/types/ServiceOption";

const formatServiceOption = (serviceOption: any): ServiceOption => {
  const { id, attributes } = serviceOption;
  const { name, code, item_reference } = attributes;

  return { id, name, code, item_reference };
};

export default formatServiceOption;
