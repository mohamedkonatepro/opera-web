import RealEstate from "@/types/RealEstate";
import { steps } from "./constants";
import capitalizeWords from "@/utils/capitalizeWords";
import Contractor from "@/types/Contractor";
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
) => {
  return steps.reduce((acc, step) => {
    const { surface, serviceType, services, options } = queryParams || {};
    const optionsAndServiceTypes = getUniqueOptionsAndServiceTypes(servicesData)
    
    if (step.id === "services") {
      acc[step.id] = {
        surface,
        family: services.length ? optionsAndServiceTypes.family : undefined,
        services: services.length
          ? servicesData.filter((service: Service) => services.includes(service.id))
          : [],
        options: options.length > 0
          ? optionsAndServiceTypes.options.filter((option: ServiceOption) => options.includes(option.id))
          : [],
        serviceType: serviceType
            ? optionsAndServiceTypes.serviceTypes.find((type: ServiceType) => type.id === serviceType)
            : optionsAndServiceTypes.serviceTypes.find((type: ServiceType) => type.code === "living"),
      };
    } else {
      acc[step.id] = {};
    }
    return acc;
  }, {} as Record<string, any>);
};


export const getUniqueOptionsAndServiceTypes = (services: Service[]) => {
  const optionsSet = new Set<ServiceOption>();
  const serviceTypesSet = new Set<ServiceType>();

  services.forEach(service => service.options.forEach(option => optionsSet.add(option)));
  services.forEach(service => service.serviceTypes.forEach(serviceType => serviceTypesSet.add(serviceType)));
  const [ family ] = services.map(service => service.family);

  const uniqueOptions = Array.from(optionsSet);
  const uniqueServiceTypes = Array.from(serviceTypesSet);

  return { options: uniqueOptions, serviceTypes: uniqueServiceTypes, family };
}