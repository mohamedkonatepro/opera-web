import { Purpose } from "./Purpose";

export interface RealEstateType {
  id: number;
  name: string;
  code: string;
  og_code: string;
  purpose?: Purpose;
}

export default RealEstateType;
