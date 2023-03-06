import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import getAxiosOptions from "@/apiUtils/getAxiosOptions";
import Slot from "@/types/slot";
import mockAppointment from "@/mocks/appointment";
import corsMiddleware, { cors } from "@/apiUtils/corsMiddleware";

const getAppointmentBooking = async (id: string, res: NextApiResponse) => {
  try {
    const response = await axios.get(
      `${process.env.SERVER_BASE_URL}/api/appointment-bookings/${id}`,
      getAxiosOptions()
    );
    const appointmentBooking = {
      id: response.data.data.id,
      ...response.data.data.attributes,
    };

    if (appointmentBooking.appointment_id !== null) {
      const appointmentResponse = await axios.get(
        `${process.env.SERVER_BASE_URL}/api/opera-appointments/${appointmentBooking.appointment_id}`,
        getAxiosOptions()
      );
      const appointment = appointmentResponse.data;
      appointmentBooking.appointment = appointment.data;
    } else if (process.env.NODE_ENV === "development") {
      appointmentBooking.appointment = mockAppointment;
    }

    res.status(200).json(appointmentBooking);
  } catch (error: any) {
    console.error(error);
    res.status(error.response.status).json(error.response.data);
  }
};

const updateAppointmentBooking = async (
  id: string,
  selectedSlot: Slot,
  res: NextApiResponse
) => {
  try {
    const response = await axios.put(
      `${process.env.SERVER_BASE_URL}/api/appointment-bookings/${id}`,
      { data: selectedSlot },
      getAxiosOptions()
    );
    const order = response.data;
    res.status(200).json(order);
  } catch (error: any) {
    console.error(error);
    res.status(error.response.status).json(error.response.data);
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await corsMiddleware(req, res, cors);
  if (req.method === "PUT") {
    return updateAppointmentBooking(req.query.id as string, req.body, res);
  }
  if (req.method === "GET") {
    return getAppointmentBooking(req.query.id as string, res);
  }
};

export default handler;
