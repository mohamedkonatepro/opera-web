import { WaterHeatingEnergyType } from "@/types/WaterHeatingEnergyType";
import { QueryFunction } from "@tanstack/react-query";
import axios from "axios";

export const getWaterHeatingEnergyTypes: QueryFunction<
  WaterHeatingEnergyType[]
> = async () => {
  const response = await axios.get(`/api/water-heating-energy-types`);
  return response.data;
};
