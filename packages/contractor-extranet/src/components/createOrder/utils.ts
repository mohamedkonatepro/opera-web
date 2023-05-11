import { ContractorContextType } from "@/context/contractor";
import { steps } from "./constants";
import { getInitialTenant } from "./forms/contact/utils";

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
        enteringTenants: getInitialTenant(realEstate?.tenants),
        leavingTenants: getInitialTenant(realEstate?.tenants),
        realEstateOwner: {
          firstname: realEstate?.owner?.firstname,
          lastname: realEstate?.owner?.lastname,
          fiscalInvariant: realEstate?.owner?.fiscalInvariant,
          socialReason: realEstate?.owner?.companyName,
        },
        contractor: {
          id: realEstate?.contractor?.id,
          customerReference: realEstate?.contractor?.customerReference,
        },
      };
      return acc;
    } if (step.id === "realEstate") {
      acc[step.id] = {
        address: realEstate?.address,
        additionalAddress: realEstate?.additionalAddress,
        postalCode: realEstate?.postalCode,
        city: realEstate?.city,
        realEstateType: realEstate?.real_estate_type,
        floor: realEstate?.floor?.data,
        purpose: realEstate?.purpose?.data,
        surface: realEstate?.surface,
        roomNumber: realEstate?.roomNumber,
        digicode: realEstate?.digicode,
        observation: realEstate?.observation,
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
        locationHotWater: realEstate?.locationHotWater,
        locationElectricMeter: realEstate?.locationElectricMeter,
        locationColdWater: realEstate?.locationColdWater,
        locationGasMeter: realEstate?.locationGasMeter,
        electricalReferenceMeasureLocation: realEstate?.electricalReferenceMeasureLocation,
      }
    } else {
      acc[step.id] = {};
    }
    return acc;
  }, {} as Record<string, any>);
};
