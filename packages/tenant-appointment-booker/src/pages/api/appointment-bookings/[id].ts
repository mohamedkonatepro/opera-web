import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import getAxiosOptions from "@/apiUtils/getAxiosOptions";
import Slot from "@/types/slot";
import corsMiddleware, { cors } from "@/apiUtils/corsMiddleware";
import order from "@/mocks/order";
import handleError from "@/apiUtils/handleError";

export const getAppointmentBooking = async (id: string) => {
  const response = await axios.get(
    `${process.env.SERVER_BASE_URL}/api/appointment-bookings/${id}`,
    getAxiosOptions()
  );

  const appointmentBooking = {
    id: response.data.data.id,
    ...response.data.data.attributes,
  };

  const orderResponse = await axios.get(
    `${process.env.SERVER_BASE_URL}/api/opera-order/${appointmentBooking.order_id}`,
    getAxiosOptions()
  );

  appointmentBooking.order = orderResponse.data;

  if (appointmentBooking.appointment_id !== null) {
    try {
      const appointmentResponse = await axios.get(
        `${process.env.SERVER_BASE_URL}/api/opera-appointments/${appointmentBooking.appointment_id}`,
        getAxiosOptions()
      );
      const appointment = appointmentResponse.data;
      appointmentBooking.appointment = appointment;
    } catch (error: any) {
      if (error.response.status === 404) appointmentBooking.appointment = null;
      else throw error;
    }
  } else {
    appointmentBooking.appointment = null;
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
    handleError(error, res);
  }
};

export default handler;
