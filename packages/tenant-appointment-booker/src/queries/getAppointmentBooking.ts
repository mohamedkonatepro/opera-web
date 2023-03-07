import axios from "axios";

const getAppointmentBooking = async (appointmentBookingId: string) => {
  try {
    const response = await axios(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/appointment-bookings/${appointmentBookingId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default getAppointmentBooking
