import { ServiceType } from "@/types/ServiceType";

const formatServiceType = (serviceType: any): ServiceType => {
  const { id, attributes } = serviceType;
  const { name, code } = attributes;

  return { id, name, code };
};

export default formatServiceType;
