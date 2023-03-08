import axios from "axios";
import { DateTime } from "luxon";

export const getOperaSlots = async (orderId: string, selectedDate: DateTime) => {
  try {
    const response = await axios.get(
      `/api/opera-slots?orderId=${orderId}&date=${selectedDate.toISODate()}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
