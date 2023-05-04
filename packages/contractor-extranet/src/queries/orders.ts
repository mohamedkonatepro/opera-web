import axios from "axios";

export const createOrder = async (params: any) => {
  try {
    return await axios.post("api/orders", params);
  } catch (error) {
    throw error;
  }
};
