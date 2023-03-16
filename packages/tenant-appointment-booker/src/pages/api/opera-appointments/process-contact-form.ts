import corsMiddleware, { cors } from "@/apiUtils/corsMiddleware";
import getAxiosOptions from "@/apiUtils/getAxiosOptions";
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
      `${process.env.SERVER_URL}/api/opera-appointments/cancel-request`,
      {
        reason,
        appointmentBookingId,
      },
      getAxiosOptions()
    );
  }

  return axios.post(
    `${process.env.SERVER_URL}/api/opera-appointments/update-date`,
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
      return res.status(200).json(response);
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
  return res.status(405).json({ message: "Method not allowed" });
};

export default handler;
