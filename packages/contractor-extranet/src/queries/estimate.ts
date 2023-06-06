import axios from "axios";
import { DateTime } from "luxon";

export interface CreateEstimateParams {
  realEstate: {
    id?: string
  }
  contractor: {
    id: number
    firstname: string
    lastname: string
    email: string
  },
  services: number[],
  options: number[]
  surface: number,
  occupation: string,
  furtherInformations: string,
  date: DateTime
}

export const createEstimate = async (params: CreateEstimateParams) => {
  try {
    return await axios.post("api/estimates", params);
  } catch (error) {
    throw error;
  }
}
