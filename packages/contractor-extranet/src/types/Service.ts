import { ServiceOption } from "./ServiceOption";
import { ServiceType } from "./ServiceType";

export interface Service {
  id: number;
  name: string;
  code: string;
  item_reference: string;
  options: ServiceOption[];
  serviceTypes: ServiceType[];
}
