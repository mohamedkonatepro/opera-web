import { Purpose } from "@/types/Purpose";
import axios from "axios";
import qs from "qs";

interface PurposeQueryParams {
  serviceType?: string;
}

const getFilters = (serviceType?: string) => {
  const filters: any = {};
  switch (serviceType) {
    case "living": {
      filters.code = {
        $contains: "residential",
      };
      break;
    }
    case "tertiary": {
      filters.code = {
        $notIn: ["common_parts"],
        $notContains: "residential",
      };
      break;
    }
    case "common_parts": {
      filters.code = {
        $contains: "common_parts",
      };
      break;
    }
    default: {
      break;
    }
  }
  return filters;
};

export const getPurposes = async ({
  serviceType,
}: PurposeQueryParams): Promise<Purpose[]> => {
  const query = qs.stringify({
    filters: getFilters(serviceType),
  });
  const response = await axios.get(`/api/purposes?${query}`);
  return response.data;
};
