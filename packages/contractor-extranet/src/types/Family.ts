import { Service } from "./Service";

export interface Family {
  id: number;
  name: string;
  code: string;
  services: Service[];
}
