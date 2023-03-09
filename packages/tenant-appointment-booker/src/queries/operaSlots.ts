import axios from "axios";
import { DateTime } from "luxon";

export const getOperaSlots = async (
  orderId: string,
  selectedDate: DateTime
) => {
  try {
    const response = await axios.get(
      `/api/opera-slots?orderId=${orderId}&date=${selectedDate.toISODate()}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const hasOperaSlotsBetweenDates = async (
  orderId: string,
  startDate: string,
  endDate: string
) => {
  try {
    const response = await axios.get(
      `/api/opera-slots/has-slots-between-dates?orderId=${orderId}&startDate=${startDate}&endDate=${endDate}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendNoSlotsAvailableEmail = async ({
  orderId,
  appointmentBookingId,
}: {
  orderId: string;
  appointmentBookingId: string;
}) => {
  try {
    const response = await axios.post(
      `/api/opera-slots/send-no-slots-available-email`,
      { orderId, appointmentBookingId }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
