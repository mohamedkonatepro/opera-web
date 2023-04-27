import { apiAxiosInstance } from "@/apiUtils/axiosInstance";
import corsMiddleware, { cors } from "@/apiUtils/corsMiddleware";
import handleError from "@/apiUtils/handleError";
import { NextApiRequest, NextApiResponse } from "next";
import { getAppointmentBooking } from "../../appointment-bookings/[id]";

const cancelTenantRequest = async (
  operaOrderId: string,
  appointmentBookingId: string
) => {
  return await apiAxiosInstance.post(
    `/api/opera-order/${operaOrderId}/cancel-tenant-request`,
    { appointmentBookingId }
  );
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await corsMiddleware(req, res, cors);
  if (req.method === "POST") {
    try {
      const { appointmentBookingId } = req.body;
      const appointmentBooking = await getAppointmentBooking(appointmentBookingId, true);

      const { id } = req.query;
      const operaOrderId = id as string;
      const response = await cancelTenantRequest(
        operaOrderId,
        appointmentBooking.id
      );
      return res.status(200).json(response.data);
    } catch (error: any) {
      return handleError(error, res);
    }
  }
  return res.status(405).json({ message: "Method not allowed" });
};

export default handler;
