import { apiAxiosInstance } from "@/apiUtils/axiosInstance";
import corsMiddleware, { cors } from "@/apiUtils/corsMiddleware";
import handleError from "@/apiUtils/handleError";
import RealEstateListResponse from "@/types/RealEstateListResponse";
import { NextApiRequest, NextApiResponse } from "next";
import { formatRealEstateData } from "@/utils/dataFormattingUtils";

interface Filters {
  address?: string | string[];
  buildingReference?: string | string[];
  unitReference?: string | string[];
  page?: string | string[];
  pageSize?: string | string[];
  firstnameTenant?: string | string[];
  lastnameTenant?: string | string[];
}

export const getRealEstates = async (
  filters: Filters
): Promise<RealEstateListResponse> => {
  const { address, buildingReference, unitReference, page, pageSize, firstnameTenant, lastnameTenant } = filters;
  let url = `/real-estates?pagination[pageSize]=${pageSize}&pagination[page]=${page}&populate=*`;
  if (address) {
    url += `&filters[address][$containsi]=${address}`;
  }
  if (buildingReference) {
    url += `&filters[buildingReference][$containsi]=${buildingReference}`;
  }
  if (unitReference) {
    url += `&filters[unitReference][$containsi]=${unitReference}`;
  }
  if (firstnameTenant) {
    url += `&filters[tenants][firstname][$containsi]=${firstnameTenant}`;
  }
  if (lastnameTenant) {
    url += `&filters[tenants][lastname][$containsi]=${lastnameTenant}`;
  }

  const { data } = await apiAxiosInstance.get(url);

  data.data = data.data.map(formatRealEstateData);

  return data;
};

const realEstates = async (req: NextApiRequest, res: NextApiResponse) => {
  await corsMiddleware(req, res, cors);
  if (req.method === "GET") {
    try {
      const realEstates = await getRealEstates(req.query);
      return res.status(200).json(realEstates);
    } catch (error: any) {
      return handleError(error, res);
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
};

export default realEstates;
