import corsMiddleware, { cors } from "@/apiUtils/corsMiddleware";
import getAxiosOptions from "@/apiUtils/getAxiosOptions";
import handleError from "@/apiUtils/handleError";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const sendNoSlotsAvailableEmail = async (appointmentBookingId: string) => {
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
      await sendNoSlotsAvailableEmail(appointmentBookingId as string);
      return res.status(200).json({ success: true });
    } catch (error: any) {
      handleError(error, res);
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
};

export default handler;
