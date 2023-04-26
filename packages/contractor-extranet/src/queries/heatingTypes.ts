import { HeatingType } from "@/types/HeatingType";
import { QueryFunction } from "@tanstack/react-query";
import axios from "axios";

export const getHeatingTypes: QueryFunction<HeatingType[]> = async () => {
  const response = await axios.get(`/api/heating-types`);
  return response.data;
};
