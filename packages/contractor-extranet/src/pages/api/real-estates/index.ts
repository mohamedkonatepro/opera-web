import { apiAxiosInstance } from "@/apiUtils/axiosInstance";
import corsMiddleware, { cors } from "@/apiUtils/corsMiddleware";
import handleError from "@/apiUtils/handleError";
import RealEstateListResponse from "@/types/realEstateListResponse";
import { NextApiRequest, NextApiResponse } from "next";

interface Filters {
  address?: string | string[]
  buildingReference?: string | string[]
  unitReference?: string | string[]
  page?: string | string[]
  pageSize?: string | string[]
}

export const getRealEstates = async (filters: Filters): Promise<RealEstateListResponse> => {
  const { address, buildingReference, unitReference, page, pageSize } = filters
  let url = `/api/real-estates?pagination[pageSize]=${pageSize}&pagination[page]=${page}&populate=*`;
  if (address) {
    url += `&filters[address][$containsi]=${address}`;
  }
  if (buildingReference) {
    url += `&filters[buildingReference][$containsi]=${buildingReference}`;
  }
  if (unitReference) {
    url += `&filters[unitReference][$containsi]=${unitReference}`;
  }

  const { data } = await apiAxiosInstance.get(url);

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
