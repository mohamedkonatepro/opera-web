import { HeatingEnergyType } from "@/types/HeatingEnergyType";
import { QueryFunction } from "@tanstack/react-query";
import axios from "axios";

export const getHeatingEnergyTypes: QueryFunction<
  HeatingEnergyType[]
> = async () => {
  const response = await axios.get(`/api/heating-energy-types`);
  return response.data;
};
