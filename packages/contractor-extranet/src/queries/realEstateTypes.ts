import { RealEstateType } from "@/types/RealEstateType";
import { ServiceType } from "@/types/ServiceType";
import axios from "axios";
import qs from "qs";

export interface RealEstateTypesParams {
  populate?: string
  serviceType?: string;
}

const getFilters = (serviceType?: string) => {
  const filters: any = {};
  switch (serviceType) {
    case ServiceType.LIVING: {
      filters.code = {
        $notIn: ["common_part", "tertiary_local"],
      };
      break;
    }
    case ServiceType.TERTIARY: {
      filters.code = {
        $in: ["tertiary_local"],
      };
      break;
    }
    default: {
      break;
    }
  }
  return filters;
};

export const getRealEstateTypes = async ({
  serviceType,
  populate,
}: RealEstateTypesParams): Promise<RealEstateType[]> => {
  const query = qs.stringify({
    filters: getFilters(serviceType),
    populate: populate?.split(',').reduce((acc, cur) => ({ ...acc, [cur]: true }), {}),
  });
  const response = await axios.get(`/api/real-estate-types?${query}`);
  return response.data;
};
