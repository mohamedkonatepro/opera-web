import { BuildingAnnex } from "./BuildingAnnex";
import Contractor from "./Contractor";
import { Floor } from "./Floor";
import Owner from "./Owner";
import { Purpose } from "./Purpose";
import RealEstateType from "./RealEstateType";
import Tenant from "./Tenant";

interface RealEstate {
  id: number;
  address: string;
  additionalAddress: string;
  postalCode: string;
  city: string;
  digicode: string;
  surface: number;
  roomNumber: number | null;
  propertyManager: string;
  buildingYear: string;
  unitReference: string;
  buildingReference: string;
  staircaseNumber: string;
  cadastreReference: string | null;
  observation: string;
  mandateReference: string;
  leaseReference: string;
  electricalReferenceMeasureLocation: string | null;
  locationElectricMeter: string | null;
  locationGasMeter: string | null;
  locationHotWater: string | null;
  locationColdWater: string | null;
  real_estate_type: RealEstateType;
  owner: Owner;
  floor: Floor;
  purpose: Purpose;
  tenants: Tenant[];
  contractor: Contractor;
  buildingAnnexes: BuildingAnnex[];
  createdAt: string;
  updatedAt: string;
}

export default RealEstate;
