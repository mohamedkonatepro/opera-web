import { BuildingAnnexType } from "./BuildingAnnexType";

export interface BuildingAnnex {
  id: string;
  type: BuildingAnnexType;
  unitReference?: string;
  location?: string;
}
