import { apiAxiosInstance } from "@/apiUtils/axiosInstance";
import corsMiddleware, { cors } from "@/apiUtils/corsMiddleware";
import handleError from "@/apiUtils/handleError";
import { MovingZone } from "@/types/MovingZone";
import { formatMovingZoneData } from "@/utils/dataFormattingUtils";
import { NextApiRequest, NextApiResponse } from "next";

export const getMovingZoneByPostalCode = async (
  postalCode: any
): Promise<MovingZone> => {
  const { data } = await apiAxiosInstance.get(
    `/moving-zones/by-postal-code/${postalCode}`
  );

  return data;
};

const movingZone = async (req: NextApiRequest, res: NextApiResponse) => {
  await corsMiddleware(req, res, cors);
  if (req.method === "GET") {
    try {
      const { postalCode } = req.query;
      const movingZone = await getMovingZoneByPostalCode(postalCode);
      return res.status(200).json(movingZone);
    } catch (error: any) {
      return handleError(error, res);
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
};

export default movingZone;
