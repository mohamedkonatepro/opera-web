import Slot from "@/types/slot";
import axios from "axios";

export const getAppointmentBooking = async (appointmentBookingId: string) => {
  try {
    const response = await axios(
      `/api/appointment-bookings/${appointmentBookingId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateAppointmentBooking = async ({
  appointmentBookingId,
  selectedSlot,
}: {
  appointmentBookingId: string;
  selectedSlot: Slot;
}) => {
  return axios.put(
    `/api/appointment-bookings/${appointmentBookingId}`,
    { selectedSlot }
  );
};
