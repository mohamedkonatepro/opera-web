import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import getAxiosOptions from "@/apiUtils/getAxiosOptions";
import Slot from "@/types/slot";
import corsMiddleware, { cors } from "@/apiUtils/corsMiddleware";
export const getAppointmentBooking = async (id: string) => {
  const response = await axios.get(
    `${process.env.SERVER_BASE_URL}/api/appointment-bookings/${id}`,
    getAxiosOptions()
  );

  const appointmentBooking = {
    id: response.data.data.id,
    ...response.data.data.attributes,
  };

  const order = await axios.get(
    `${process.env.SERVER_BASE_URL}/api/opera-order/${appointmentBooking.order_id}`,
    getAxiosOptions()
  );
  appointmentBooking.order = order.data;

  if (appointmentBooking.appointment_id !== null) {
    const appointmentResponse = await axios.get(
      `${process.env.SERVER_BASE_URL}/api/opera-appointments/${appointmentBooking.appointment_id}`,
      getAxiosOptions()
    );
    const appointment = appointmentResponse.data;
    appointmentBooking.appointment = appointment.data;
  }

  return appointmentBooking;
};

export const updateAppointmentBooking = async (
  id: string,
  selectedSlot: Slot
) => {
  await axios.put(
    `${process.env.SERVER_BASE_URL}/api/appointment-bookings/${id}`,
    { data: selectedSlot },
    getAxiosOptions()
  );
  return getAppointmentBooking(id);
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await corsMiddleware(req, res, cors);
  try {
    if (req.method === "PUT") {
      const jsonData = await updateAppointmentBooking(
        req.query.id as string,
        req.body.selectedSlot
      );
      return res.status(200).json(jsonData);
    }
    if (req.method === "GET") {
      const jsonData = await getAppointmentBooking(req.query.id as string);
      return res.status(200).json(jsonData);
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error: any) {
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    } else if (error.request) {
      return res.status(500).json({ error: "No response from server" });
    } else {
      return res.status(500).json({ error: "Unknown error" });
    }
  }
};

export default handler;
