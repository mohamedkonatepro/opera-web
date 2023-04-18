import { ContractorResponse } from "./contractor";
import { OwnerResponse } from "./owner";
import { RealEstateTypeResponse } from "./realEstateType";
import { TenantResponse } from "./tenant";

interface RealEstate {
  id: number;
  attributes: {
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
    real_estate_type: RealEstateTypeResponse;
    owner: OwnerResponse;
    tenants: TenantResponse;
    contractor: ContractorResponse;
    createdAt: string;
    updatedAt: string;
  };
};

export default RealEstate;