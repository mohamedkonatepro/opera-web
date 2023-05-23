import { ServiceType } from "@/types/ServiceType";
import axios from "axios";

export const getServiceTypes = async (): Promise<ServiceType[]> => {
  const response = await axios.get(`/api/service-types`);
  return response.data;
};
