import axios from "axios";
import { DateTime } from "luxon";

export const getOperaSlots = async (orderId: string, selectedDate: DateTime) => {
  try {
    const response = await axios.get(
      `${
        process.env.NEXT_PUBLIC_SERVER_BASE_URL
      }/api/opera-slots?orderId=${orderId}&date=${selectedDate.toISODate()}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
