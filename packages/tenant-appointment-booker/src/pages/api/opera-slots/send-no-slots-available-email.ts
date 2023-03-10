import corsMiddleware, { cors } from "@/apiUtils/corsMiddleware";
import getAxiosOptions from "@/apiUtils/getAxiosOptions";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const sendNoSlotsAvailableEmail = async (
  appointmentBookingId: string
) => {
  await axios.post(
    `${process.env.SERVER_BASE_URL}/api/opera-slots/send-no-slots-available-email`,
    { appointmentBookingId },
    getAxiosOptions()
  );
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await corsMiddleware(req, res, cors);
  if (req.method === "POST") {
    const { appointmentBookingId } = req.body;
    try {
      await sendNoSlotsAvailableEmail(
        appointmentBookingId as string
      );
      return res.status(200);
    } catch (error: any) {
      if (error.response) {
        return res.status(error.response.status).json(error.response.data);
      } else if (error.request) {
        return res.status(500).json({ error: "No response from server" });
      } else {
        return res.status(500).json({ error: "Unknown error" });
      }
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
};

export default handler;
