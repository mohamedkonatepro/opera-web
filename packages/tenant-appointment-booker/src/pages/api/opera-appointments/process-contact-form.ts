import { apiAxiosInstance } from "@/apiUtils/axiosInstance";
import corsMiddleware, { cors } from "@/apiUtils/corsMiddleware";
import handleError from "@/apiUtils/handleError";
import { NextApiRequest, NextApiResponse } from "next";
import { getAppointmentBooking } from "../appointment-bookings/[id]";

const processContactForm = async (
  appointmentBookingId: string,
  reason: string,
  type: string,
  newDesiredDate?: string
) => {
  const appointmentBooking = await getAppointmentBooking(appointmentBookingId, true);
  if (type === "CANCEL_APPOINTMENT") {
    return apiAxiosInstance.post(`/api/opera-appointments/cancel-request`, {
      reason,
      appointmentBookingId: appointmentBooking.id,
    });
  }

  return apiAxiosInstance.post(`/api/opera-appointments/update-date`, {
    reason,
    appointmentBookingId: appointmentBooking.id,
    newDesiredDate,
  });
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await corsMiddleware(req, res, cors);
  if (req.method === "POST") {
    try {
      const { reason, type, newDesiredDate, appointmentBookingId } = req.body;
      const appointmentBooking = await getAppointmentBooking(appointmentBookingId, true);

      const response = await processContactForm(
        appointmentBooking.id,
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
