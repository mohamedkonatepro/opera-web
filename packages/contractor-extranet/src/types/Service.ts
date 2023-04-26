import { ServiceOption } from "./ServiceOption";

export interface Service {
  id: number;
  name: string;
  code: string;
  options: ServiceOption[];
}
