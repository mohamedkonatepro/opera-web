import Slot from "@/types/slot";
import axios from "axios";

export const getAppointmentBooking = async (appointmentBookingId: string) => {
  try {
    const response = await axios(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/appointment-bookings/${appointmentBookingId}`
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
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/appointment-bookings/${appointmentBookingId}`,
    { selectedSlot }
  );
};
