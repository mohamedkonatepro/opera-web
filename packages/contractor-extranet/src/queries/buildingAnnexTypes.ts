import { BuildingAnnexType } from "@/types/BuildingAnnexType";
import { QueryFunction } from "@tanstack/react-query";
import axios from "axios";

export const getBuildingAnnexTypes: QueryFunction<
  BuildingAnnexType[]
> = async () => {
  const response = await axios.get(`/api/building-annex-types`);
  return response.data;
};
