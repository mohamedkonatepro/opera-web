import corsMiddleware, { cors } from "@/apiUtils/corsMiddleware";
import getAxiosOptions from "@/apiUtils/getAxiosOptions";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const operaSlots = async (req: NextApiRequest, res: NextApiResponse) => {
  await corsMiddleware(req, res, cors);
  if (req.method === "GET") {
    const { orderId, date } = req.query;

    try {
      const response = await axios.get(
        `${process.env.SERVER_BASE_URL}/api/opera-slots/${orderId}/${date}`,
        getAxiosOptions()
      );
      const slots = response.data;
      res.status(200).json(slots);
    } catch (error: any) {
      console.error(error);
      res.status(error.response.status).json(error.response.data);
    }
  }
};

export default operaSlots;
