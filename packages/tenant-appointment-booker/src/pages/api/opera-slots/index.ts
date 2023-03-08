import corsMiddleware, { cors } from "@/apiUtils/corsMiddleware";
import getAxiosOptions from "@/apiUtils/getAxiosOptions";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export const getOperaSlots = async (orderId: string, date: string) => {
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
      const slots = await getOperaSlots(orderId as string, date as string);
      res.status(200).json(slots);
    } catch (error: any) {
      if (error.response) {
        res.status(error.response.status).json(error.response.data);
      } else if (error.request) {
        res.status(500).json({ error: "No response from server" });
      } else {
        res.status(500).json({ error: "Unknown error" });
      }
    }
  }
};

export default operaSlots;
