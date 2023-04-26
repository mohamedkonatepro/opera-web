import Contractor from "./Contractor";
import Owner from "./Owner";
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
  tenants: Tenant[];
  contractor: Contractor;
  createdAt: string;
  updatedAt: string;
}

export default RealEstate;
