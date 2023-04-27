import { NextApiRequest, NextApiResponse } from "next";
import Slot from "@/types/slot";
import corsMiddleware, { cors } from "@/apiUtils/corsMiddleware";
import handleError from "@/apiUtils/handleError";
import { apiAxiosInstance } from "@/apiUtils/axiosInstance";

const getInformationAboutAppointmentBooking = async (response: any) => {
  const appointmentBooking = {
    id: response.data.data.id.toString(),
    ...response.data.data.attributes,
  };

  const orderResponse = await apiAxiosInstance.get(
    `/api/opera-order/${appointmentBooking.order_id}`
  );

  appointmentBooking.order = orderResponse.data;

  if (appointmentBooking.appointment_id !== null) {
    try {
      const appointmentResponse = await apiAxiosInstance.get(
        `/api/opera-appointments/${appointmentBooking.appointment_id}`
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

  if (appointmentBooking.tenant_request_id !== null) {
    try {
      const requestResponse = await apiAxiosInstance.get(
        `/api/opera-appointments/request-tracking/${appointmentBooking.tenant_request_id}`
      );
      appointmentBooking.tenant_request = requestResponse.data;
    } catch (error: any) {
      if (error.response.status === 404)
        appointmentBooking.tenant_request = null;
      else throw error;
    }
  } else {
    appointmentBooking.tenant_request = null;
  }

  return appointmentBooking
}

export const getAppointmentBooking = async (uuid: string, withoutInfo: boolean = false) => {
  const response = await apiAxiosInstance.get(
    `/api/appointment-bookings/by-uuid/${uuid}`
  );

  if (withoutInfo) {
    return {
      id: response.data.data.id.toString(),
      ...response.data.data.attributes,
    };
  }

  return getInformationAboutAppointmentBooking(response);
};



export const updateAppointmentBooking = async (
  id: string,
  selectedSlot: Slot
) => {
  const appointmentBooking = await getAppointmentBooking(id, true);
  await apiAxiosInstance.put(`/api/appointment-bookings/${appointmentBooking.id}`, {
    data: selectedSlot,
  });

  return getAppointmentBooking(appointmentBooking.uuid);
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
    return handleError(error, res);
  }
};

export default handler;
