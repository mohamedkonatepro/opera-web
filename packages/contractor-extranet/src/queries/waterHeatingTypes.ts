import { WaterHeatingType } from "@/types/WaterHeatingType";
import { QueryFunction } from "@tanstack/react-query";
import axios from "axios";

export const getWaterHeatingTypes: QueryFunction<
  WaterHeatingType[]
> = async () => {
  const response = await axios.get(`/api/water-heating-types`);
  return response.data;
};
