import { apiAxiosInstance } from "@/apiUtils/axiosInstance";
import corsMiddleware, { cors } from "@/apiUtils/corsMiddleware";
import handleError from "@/apiUtils/handleError";
import { NextApiRequest, NextApiResponse } from "next";

const sendNoSlotsAvailableEmail = async (appointmentBookingId: string) => {
  await apiAxiosInstance.post(
    `/api/opera-slots/send-no-slots-available-email`,
    { appointmentBookingId }
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
      return handleError(error, res);
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
};

export default handler;
