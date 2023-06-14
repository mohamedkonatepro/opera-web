import { steps } from "./constants";
import capitalizeWords from "@/utils/capitalizeWords";
import { ServiceType } from "@/types/ServiceType";
import { Service } from "@/types/Service";
import { ServiceOption } from "@/types/ServiceOption";

export const getContextValuesForStep = (
  activeStep: number,
  stepStates: any,
  otherValues: any,
  queryParams: any
) => {
  switch (activeStep) {
    case 1: {
      return {
        serviceTypes: otherValues.serviceTypes,
        options: queryParams?.options ?? [],
        serviceType: queryParams?.serviceType,
        services: queryParams?.services ?? [],
      };
    }
    case 2: {
      return {
        services: stepStates.services.services,
        family: stepStates.services.family,
        serviceType: stepStates.services.serviceType,
      };
    }
    default: {
      return {};
    }
  }
};

export const getInitialValues = (
  servicesData?: any,
  queryParams?: any,
  realEstate?: any
) => {
  return steps.reduce((acc, step) => {
    const { surface, serviceType, services, options } = queryParams || {};
    const optionsAndServiceTypes =
      getUniqueOptionsAndServiceTypes(servicesData);

    switch (step.id) {
      case "informationEstimate": {
        return {
          ...acc,
          [step.id]: {
            realEstate: {
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
              waterHeatingEnergyType:
                realEstate?.water_heating_energy_type?.data,
              waterHeatingType: realEstate?.water_heating_type?.data,
              locationHotWater: capitalizeWords(realEstate?.locationHotWater),
              locationElectricMeter: capitalizeWords(
                realEstate?.locationElectricMeter
              ),
              locationColdWater: capitalizeWords(realEstate?.locationColdWater),
              locationGasMeter: capitalizeWords(realEstate?.locationGasMeter),
              electricalReferenceMeasureLocation:
                realEstate?.electricalReferenceMeasureLocation,
            },
          },
        };
      }
      case "services": {
        return {
          ...acc,
          [step.id]: {
            surface,
            family: services.length ? optionsAndServiceTypes.family : undefined,
            services: services.length
              ? servicesData.filter((service: Service) =>
                  services.includes(service.id)
                )
              : [],
            options:
              options.length > 0
                ? optionsAndServiceTypes.options.filter(
                    (option: ServiceOption) => options.includes(option.id)
                  )
                : [],
            serviceType: serviceType
              ? optionsAndServiceTypes.serviceTypes.find(
                  (type: ServiceType) => type.id === serviceType
                )
              : optionsAndServiceTypes.serviceTypes.find(
                  (type: ServiceType) => type.code === "living"
                ),
          },
        };
      }
      default: {
        return acc;
      }
    }
  }, {} as Record<string, any>);
};

export const getUniqueOptionsAndServiceTypes = (services: Service[]) => {
  const optionsSet = new Set<ServiceOption>();
  const serviceTypesSet = new Set<ServiceType>();

  services.forEach((service) =>
    service.options.forEach((option) => optionsSet.add(option))
  );
  services.forEach((service) =>
    service.serviceTypes.forEach((serviceType) =>
      serviceTypesSet.add(serviceType)
    )
  );
  const [family] = services.map((service) => service.family);

  const uniqueOptions = Array.from(optionsSet);
  const uniqueServiceTypes = Array.from(serviceTypesSet);

  return { options: uniqueOptions, serviceTypes: uniqueServiceTypes, family };
};
