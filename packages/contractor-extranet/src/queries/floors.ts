import { Floor } from "@/types/Floor";
import { QueryFunction } from "@tanstack/react-query";
import axios from "axios";

export const getFloors: QueryFunction<Floor[]> = async () => {
  const response = await axios.get(`/api/floors`);
  return response.data;
};
