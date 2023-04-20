import { Purpose } from "@/types/Purpose";
import { QueryFunction } from "@tanstack/react-query";
import axios from "axios";

export const getPurposes: QueryFunction<Purpose[]> = async () => {
  const response = await axios.get(`/api/purposes`);
  return response.data;
};
