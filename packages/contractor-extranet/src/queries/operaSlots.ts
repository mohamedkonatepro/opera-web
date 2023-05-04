import { Service } from "@/types/Service";
import { ServiceOption } from "@/types/ServiceOption";
import axios from "axios";
import { DateTime } from "luxon";

interface OperaSlotQueryParams {
  date: DateTime;
  realEstate: any;
  servicesAndOptions: any;
  contractor: any;
}

export const getOperaSlots = async (params: OperaSlotQueryParams) => {
  const searchParams = new URLSearchParams({
    date: params.date.toISODate(),
    contractorId: params.contractor.id,
    realEstateTypeId: params.realEstate.realEstateType.id,
    serviceIds: params.servicesAndOptions.services
      .map((service: Service) => service.id)
      .join(","),
    optionIds: params.servicesAndOptions.options
      .map((option: ServiceOption) => option.id)
      .join(","),
    roomNumber: params.realEstate.roomNumber,
    postalCode: params.realEstate.postalCode,
    buildingAnnexCellar: params.realEstate.annexes.filter(
      (buildingAnnex: any) => buildingAnnex.type.code === "cellar"
    )[0]?.unitReference,
    buildingAnnexParking: params.realEstate.annexes.filter(
      (buildingAnnex: any) => buildingAnnex.type.code === "parking"
    )[0]?.unitReference,
    buildingAnnexGarage: params.realEstate.annexes.filter(
      (buildingAnnex: any) => buildingAnnex.type.code === "garage"
    )[0]?.unitReference,
  });
  try {
    const response = await axios.get(
      `/api/opera-slots?${searchParams.toString()}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
