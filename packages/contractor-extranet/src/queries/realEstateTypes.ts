import { RealEstateType } from "@/types/RealEstateType";
import { QueryFunction } from "@tanstack/react-query";
import axios from "axios";

export const getRealEstateTypes: QueryFunction<RealEstateType[]> = async () => {
  const response = await axios.get(`/api/real-estate-types`);
  return response.data;
};
