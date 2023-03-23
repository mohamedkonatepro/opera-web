import corsMiddleware, { cors } from "@/apiUtils/corsMiddleware";
import getAxiosOptions from "@/apiUtils/getAxiosOptions";
import handleError from "@/apiUtils/handleError";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const processContactForm = async (
  appointmentBookingId: string,
  reason: string,
  type: string,
  newDesiredDate?: string
) => {
  if (type === "CANCEL_APPOINTMENT") {
    return axios.post(
      `${process.env.SERVER_BASE_URL}/api/opera-appointments/cancel-request`,
      {
        reason,
        appointmentBookingId,
      },
      getAxiosOptions()
    );
  }

  return axios.post(
    `${process.env.SERVER_BASE_URL}/api/opera-appointments/update-date`,
    {
      reason,
      appointmentBookingId,
      newDesiredDate,
    },
    getAxiosOptions()
  );
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await corsMiddleware(req, res, cors);
  if (req.method === "POST") {
    try {
      const { reason, type, newDesiredDate, appointmentBookingId } = req.body;
      const response = await processContactForm(
        appointmentBookingId,
        reason,
        type,
        newDesiredDate
      );
      return res.status(200).json(response.data);
    } catch (error: any) {
      return handleError(error, res);
    }
  }
  return res.status(405).json({ message: "Method not allowed" });
};

export default handler;
