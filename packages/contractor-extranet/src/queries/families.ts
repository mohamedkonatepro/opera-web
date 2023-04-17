import axios from "axios";

export const getFamilies = async () => {
  try {
    const response = await axios.get(`/api/families`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
