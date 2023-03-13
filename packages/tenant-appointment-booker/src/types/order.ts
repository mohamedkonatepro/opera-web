import RealEstate from "./realEstate";
import Tenant from "./tenant";

interface Order {
  orderId: string;
  RDV: string | null;
  famille: string;
  familleInitial: string;
  familleLongue: string;
  services: string[];
  type: "D" | "E" | "S" | "ES" | "C" | "P";
  address: string;
  bien: RealEstate;
  commercialName: string;
  commercialPhoneNumber: string;
  desiredDateByContractor: string;
  minimumDate?: string;
  maximumDate?: string;
  locataires: Tenant[];
  emails: string[];
  operaGroupePhoneNumber: string;
  operaGroupeEmail: string;
}

export default Order;
