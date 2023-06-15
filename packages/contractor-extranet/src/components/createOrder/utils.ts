import RealEstate from "@/types/RealEstate";
import { MIN_SURFACE_FOR_ESTIMATE, steps } from "./constants";
import capitalizeWords from "@/utils/capitalizeWords";
import Contractor from "@/types/Contractor";
import { ServiceType } from "@/types/ServiceType";
import { transformIncomingTenants } from "./forms/contact/utils";

export const getContextValuesForStep = (
  activeStep: number,
  stepStates: any,
  otherValues: any,
) => {
  switch (activeStep) {
    case 1: {
      return {
        serviceTypes: otherValues.serviceTypes,
      };
    }
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
        disabled: {
          realEstate: {
            surface: !!stepStates.services.surface,
          },
        },
      };
    }
    case 4: {
      return {
        realEstate: stepStates.realEstate,
        furtherInformations: `${otherValues?.realEstate?.observation ?? ""}${
          otherValues?.realEstate?.observation ? "\n" : ""
        }${stepStates.services.family.code === 'EDL' ? otherValues?.contractor?.observationEdl : otherValues?.contractor?.observationDiag}`,
      };
    }
    default: {
      return {
        appointment: null
      };
    }
  }
};

const getRealEstateDefaultServiceType = (realEstate: RealEstate) => {
  if (realEstate?.real_estate_type?.code === "tertiary_local") return "tertiary";
  if (realEstate?.real_estate_type?.code === "common_part") return "common_parts";

  return "living";
};

export const getInitialValues = (
  contractor: Contractor,
  realEstate?: any,
  otherValues?: any
) => {
  return steps.reduce((acc, step) => {
    if (step.id === "services") {
      acc[step.id] = {
        options: contractor?.serviceOptions ?? [],
        serviceType: realEstate
          ? getRealEstateDefaultServiceType(realEstate)
          : otherValues.serviceTypes.find(
              (serviceType: ServiceType) => serviceType.code === "living"
            ),
        surface: realEstate?.surface,
      };
      return acc;
    } else if (step.id === "contacts") {
      acc[step.id] = {
        enteringTenants: transformIncomingTenants(realEstate?.tenants),
        leavingTenants: transformIncomingTenants(realEstate?.tenants),
        realEstateOwner: {
          id: realEstate?.owner?.id,
          firstname: capitalizeWords(realEstate?.owner?.firstname),
          lastname: capitalizeWords(realEstate?.owner?.lastname),
          fiscalInvariant: capitalizeWords(realEstate?.owner?.fiscalInvariant),
          socialReason: capitalizeWords(realEstate?.owner?.companyName),
        },
        contractor: {
          id: realEstate?.contractor?.id,
          customerReference: capitalizeWords(
            realEstate?.contractor?.customerReference
          ),
        },
      };
      return acc;
    } else if (step.id === "realEstate") {
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
        locationElectricMeter: capitalizeWords(
          realEstate?.locationElectricMeter
        ),
        locationColdWater: capitalizeWords(realEstate?.locationColdWater),
        locationGasMeter: capitalizeWords(realEstate?.locationGasMeter),
        electricalReferenceMeasureLocation:
          realEstate?.electricalReferenceMeasureLocation,
      };
    } else if (step.id === "appointment") {
      acc[step.id] = {
        furtherInformations: `${realEstate?.observation ?? ""}${
          realEstate?.observation ? "\n" : ""
        }${contractor?.observationEdl ?? contractor?.observationDiag ?? ""}`,
      };
    } else {
      acc[step.id] = {};
    }
    return acc;
  }, {} as Record<string, any>);
};

export const needsEstimate = (serviceType: ServiceType, surface?: string) => {
  return (
    serviceType.code === "common_parts" ||
    (serviceType.code === "tertiary" &&
      typeof surface === "string" &&
      parseFloat(surface) >= MIN_SURFACE_FOR_ESTIMATE)
  );
};

export const getTextForEstimateDialog = (serviceType: ServiceType) => {
  if (serviceType.code === "common_parts") {
    return "Votre commande concerne des parties communes. Vous devez effectuer une demande de devis pour créer la commande.";
  }

  return "La surface de votre bien est supérieure à 250m². Vous devez effectuer une demande de devis pour créer la commande.";
};
