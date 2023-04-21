import { apiAxiosInstance } from "@/apiUtils/axiosInstance";
import corsMiddleware, { cors } from "@/apiUtils/corsMiddleware";
import handleError from "@/apiUtils/handleError";
import { MovingZoneListResponse } from "@/types/MovingZone";
import { formatMovingZoneData } from "@/utils/dataFormattingUtils";
import { NextApiRequest, NextApiResponse } from "next";

export const getMovingZone = async (postalCode: any): Promise<MovingZoneListResponse> => {
  let url = '/moving-zones?pagination[pageSize]=100&pagination[page]=1';
  if (postalCode) {
    url += `&filters[postal_code][$contains]=${postalCode}`;
  }

  const { data } = await apiAxiosInstance.get(url);
  data.data = data.data.map(formatMovingZoneData);

  return data;
};

const movingZone = async (req: NextApiRequest, res: NextApiResponse) => {
  await corsMiddleware(req, res, cors);
  if (req.method === "GET") {
    try {
      const { postalCode } = req.query
      const movingZone = await getMovingZone(postalCode);
      return res.status(200).json(movingZone);
    } catch (error: any) {
      return handleError(error, res);
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
};

export default movingZone;