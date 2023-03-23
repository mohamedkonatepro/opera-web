import corsMiddleware, { cors } from "@/apiUtils/corsMiddleware";
import getAxiosOptions from "@/apiUtils/getAxiosOptions";
import handleError from "@/apiUtils/handleError";
import Slot from "@/types/slot";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export const getOperaSlotsForDate = async (
  orderId: string,
  date: string
): Promise<Slot[]> => {
  const response = await axios.get(
    `${process.env.SERVER_BASE_URL}/api/opera-slots/${orderId}/${date}`,
    getAxiosOptions()
  );
  const slots = response.data;
  return slots;
};

const operaSlots = async (req: NextApiRequest, res: NextApiResponse) => {
  await corsMiddleware(req, res, cors);
  if (req.method === "GET") {
    const { orderId, date } = req.query;
    try {
      const slots = await getOperaSlotsForDate(
        orderId as string,
        date as string
      );
      return res.status(200).json(slots);
    } catch (error: any) {
      return handleError(error, res);
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
};

export default operaSlots;
