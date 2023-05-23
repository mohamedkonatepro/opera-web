import { apiAxiosInstance, setAccessToken } from "@/apiUtils/axiosInstance";
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
  const {
    address,
    buildingReference,
    unitReference,
    page = 1,
    pageSize = 25,
    firstnameTenant,
    lastnameTenant,
  } = filters;
  let url = `/real-estates?pagination[pageSize]=${pageSize}&pagination[page]=${page}&populate=*`;
  if (address) {
    url += `&filters[$or][0][address][$containsi]=${address}&filters[$or][1][postalCode][$containsi]=${address}&filters[$or][2][city][$containsi]=${address}`;
  }
  if (buildingReference) {
    url += `&filters[buildingReference][$containsi]=${buildingReference}`;
  }
  if (unitReference) {
    url += `&filters[unitReference][$containsi]=${unitReference}`;
  }
  if (firstnameTenant || lastnameTenant) {
    url += `&filters[$or][0][tenants][firstname][$containsi]=${firstnameTenant}&filters[$or][1][tenants][lastname][$containsi]=${lastnameTenant}`;
  }

  const { data } = await apiAxiosInstance.get(url);

  data.data = data.data.map(formatRealEstateData);

  return data;
};

const realEstates = async (req: NextApiRequest, res: NextApiResponse) => {
  await corsMiddleware(req, res, cors);
  setAccessToken(req);
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
