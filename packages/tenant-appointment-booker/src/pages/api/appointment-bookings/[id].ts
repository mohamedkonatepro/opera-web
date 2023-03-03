import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    const { id } = req.query;
    const { selectedSlot } = req.body;
    try {
      const response = await axios.put(
        `${process.env.SERVER_BASE_URL}/api/appointment-bookings/${id}`,
        {
          data: selectedSlot,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.API_KEY}`,
          },
        }
      );
      const order = response.data;
      res.status(200).json(order);
    } catch (error: any) {
      console.error(error);
      res.status(error.response.status).json(error.response.data);
    }
  }
};

export default handler;
