import { Floor } from "@/types/Floor";
import { HeatingEnergyType } from "@/types/HeatingEnergyType";
import { HeatingType } from "@/types/HeatingType";
import { Purpose } from "@/types/Purpose";
import { RealEstateType } from "@/types/RealEstateType";
import { ServiceType } from "@/types/ServiceType";
import { WaterHeatingEnergyType } from "@/types/WaterHeatingEnergyType";
import { WaterHeatingType } from "@/types/WaterHeatingType";

export interface RealEstateInformationFormProps {
  realEstateType?: RealEstateType;
  purpose?: Purpose;
  floor?: Floor;
  surface: string;
  roomNumber: string;
  digicode?: string;
  observation?: string;
  setRealEstateType: (realEstateType: RealEstateType) => void;
  setPurpose: (purpose?: Purpose) => void;
  setFloor: (floor: Floor) => void;
  setSurface: (surface: string) => void;
  setRoomNumber: (roomNumber: string) => void;
  setDigicode: (digicode: string) => void;
  setObservation: (observation: string) => void;
  serviceType: ServiceType;
  disabled: RealEstateFormDisabled["realEstate"];
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
  heatingType?: HeatingType;
  waterHeatingType?: WaterHeatingType;
  heatingEnergyType?: HeatingEnergyType;
  waterHeatingEnergyType?: WaterHeatingEnergyType;
  setHeatingType: (heatingType: HeatingType) => void;
  setWaterHeatingType: (waterHeatingType: WaterHeatingType) => void;
  setHeatingEnergyType: (heatingEnergyType: HeatingEnergyType) => void;
  setWaterHeatingEnergyType: (
    waterHeatingEnergyType: WaterHeatingEnergyType
  ) => void;
  required: {
    heatingType: boolean;
    waterHeatingType: boolean;
  };
}

export interface RealEstateFormProps {
  formId: string;
  onSubmit: (values: any) => void;
  contextValues: any;
  initialValues?: any;
}

export interface RealEstateFormDisabled {
  realEstate?: {
    purpose?: boolean;
    surface?: boolean;
  };
}
