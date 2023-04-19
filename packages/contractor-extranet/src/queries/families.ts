import { Family } from "@/types/Family";
import axios from "axios";

export const getFamilies = async (): Promise<Family[]> => {
  try {
    const response = await axios.get(`/api/families`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
