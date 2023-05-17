import { ContractorContextType } from "@/context/contractor";
import { steps } from "./constants";
import capitalizeWords from "@/utils/capitalizeWords";

export const getContextValuesForStep = (
  activeStep: number,
  stepStates: any
) => {
  switch (activeStep) {
    case 2: {
      return {
        services: stepStates.services.services,
        family: stepStates.services.family,
      };
    }
    case 3: {
      return {
        services: stepStates.services.services,
        serviceType: stepStates.services.serviceType,
      };
    }
    case 4: {
      return stepStates;
    }
    default: {
      return {};
    }
  }
};

export const getInitialValues = (
  contractor: ContractorContextType["contractor"],
  realEstate: any
) => {
  return steps.reduce((acc, step) => {
    if (step.id === "services") {
      acc[step.id] = {
        options: contractor?.serviceOptions ?? [],
      };
      return acc;
    } 
    if (step.id === "contacts") {
      acc[step.id] = {
        realEstateOwner: {
          id: realEstate?.owner?.id,
          firstname: capitalizeWords(realEstate?.owner?.firstname),
          lastname: capitalizeWords(realEstate?.owner?.lastname),
          fiscalInvariant: capitalizeWords(realEstate?.owner?.fiscalInvariant),
          socialReason: capitalizeWords(realEstate?.owner?.companyName),
        },
        contractor: {
          id: realEstate?.contractor?.id,
          customerReference: capitalizeWords(realEstate?.contractor?.customerReference),
        },
      };
      return acc;
    } if (step.id === "realEstate") {
      acc[step.id] = {
        id: realEstate?.id,
        address: capitalizeWords(realEstate?.address),
        additionalAddress: capitalizeWords(realEstate?.additionalAddress),
        postalCode: realEstate?.postalCode,
        city: capitalizeWords(realEstate?.city),
        realEstateType: realEstate?.real_estate_type,
        floor: realEstate?.floor?.data,
        purpose: realEstate?.purpose?.data,
        surface: realEstate?.surface,
        roomNumber: realEstate?.roomNumber,
        digicode: realEstate?.digicode,
        observation: capitalizeWords(realEstate?.observation),
        buildingReference: realEstate?.buildingReference,
        unitReference: realEstate?.unitReference,
        mandateReference: realEstate?.mandateReference,
        leaseReference: realEstate?.leaseReference,
        buildingYear: realEstate?.buildingYear,
        annexes: realEstate?.buildingAnnexes,
        heatingEnergyType: realEstate?.heating_energy_type?.data,
        heatingType: realEstate?.heating_type?.data,
        waterHeatingEnergyType: realEstate?.water_heating_energy_type?.data,
        waterHeatingType: realEstate?.water_heating_type?.data,
        locationHotWater: capitalizeWords(realEstate?.locationHotWater),
        locationElectricMeter: capitalizeWords(realEstate?.locationElectricMeter),
        locationColdWater: capitalizeWords(realEstate?.locationColdWater),
        locationGasMeter: capitalizeWords(realEstate?.locationGasMeter),
        electricalReferenceMeasureLocation: realEstate?.electricalReferenceMeasureLocation,
      }
    } else {
      acc[step.id] = {};
    }
    return acc;
  }, {} as Record<string, any>);
};