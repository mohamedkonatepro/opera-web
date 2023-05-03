import { apiAxiosInstance } from "@/apiUtils/axiosInstance";
import corsMiddleware, { cors } from "@/apiUtils/corsMiddleware";
import handleError from "@/apiUtils/handleError";
import Slot from "@/types/Slot";
import { NextApiRequest, NextApiResponse } from "next";

export const getOperaSlotsForDate = async (query: any): Promise<Slot[]> => {
  const searchParams = new URLSearchParams(query);
  const response = await apiAxiosInstance.get(
    `/opera-slots/without-order?${searchParams.toString()}`
  );
  const slots = response.data;
  return slots;
};

const operaSlots = async (req: NextApiRequest, res: NextApiResponse) => {
  await corsMiddleware(req, res, cors);
  if (req.method === "GET") {
    try {
      const slots = await getOperaSlotsForDate(req.query);
      return res.status(200).json(slots);
    } catch (error: any) {
      return handleError(error, res);
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
};

export default operaSlots;
