import { ServiceOption } from "./ServiceOption";

export interface Service {
  id: number;
  name: string;
  code: string;
  item_reference: string;
  options: ServiceOption[];
}
