import RealEstate from "./realEstate";
import Tenant from "./tenant";

interface Order {
  orderId: string;
  RDV: string | null;
  famille: string;
  familleLongue: string;
  services: string[];
  in_out: number;
  address: string;
  bien: RealEstate;
  commercialName: string;
  desiredDateByContractor: string;
  minimumDate: string;
  maximumDate: string;
  locataires: Tenant[];
  emails: string[];
  operaGroupePhoneNumber: string;
  operaGroupeEmail: string;
}

export default Order;
