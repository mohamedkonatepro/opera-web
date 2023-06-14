import { Service } from "@/types/Service";
import axios from "axios";

export const getServices = async (ids: string): Promise<Service[]> => {
  const response = await axios.get(`/api/services?ids=${ids}`);
  return response.data;
};
