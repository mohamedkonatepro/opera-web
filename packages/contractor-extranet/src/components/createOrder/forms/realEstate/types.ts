export interface AddressFormProps {
  address: string;
  city: string;
  postalCode: string;
  additionalAddress: string;
  setAddress: (address: string) => void;
  setCity: (city: string) => void;
  setPostalCode: (postalCode: string) => void;
  setAdditionalAddress: (additionalAddress: string) => void;
}

export interface RealEstateFormProps {
  realEstateType: string;
  purpose?: string;
  floor: string;
  surface: string;
  roomNumber: string;
  digicode?: string;
  observation?: string;
  setRealEstateType: (realEstateType: string) => void;
  setPurpose: (purpose: string) => void;
  setFloor: (floor: string) => void;
  setSurface: (surface: string) => void;
  setRoomNumber: (roomNumber: string) => void;
  setDigicode: (digicode: string) => void;
  setObservation: (observation: string) => void;
}

export interface UnitFormProps {
  buildingReference: string;
  unitReference: string;
  mandateReference: string;
  leaseReference: string;
  buildingYear: string;
  setBuildingReference: (buildingReference: string) => void;
  setUnitReference: (unitReference: string) => void;
  setMandateReference: (mandateReference: string) => void;
  setLeaseReference: (leaseReference: string) => void;
  setBuildingYear: (buildingYear: string) => void;
}

export interface MeterLocationFormProps {
  locationHotWater: string;
  locationColdWater: string;
  locationElectricMeter: string;
  locationGasMeter: string;
  electricalReferenceMeasureLocation: string;
  setLocationHotWater: (locationHotWater: string) => void;
  setLocationElectricMeter: (locationElectricMeter: string) => void;
  setLocationColdWater: (locationColdWater: string) => void;
  setLocationGasMeter: (locationGasMeter: string) => void;
  setElectricalReferenceMeasureLocation: (
    electricalReferenceMeasureLocation: string
  ) => void;
}

export interface EnergyFormProps {
  heatingType: string;
  waterHeatingType: string;
  heatingEnergyType: string;
  waterHeatingEnergyType: string;
  setHeatingType: (heatingType: string) => void;
  setWaterHeatingType: (waterHeatingType: string) => void;
  setHeatingEnergyType: (heatingEnergyType: string) => void;
  setWaterHeatingEnergyType: (waterHeatingEnergyType: string) => void;
}
