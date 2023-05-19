import axios from "axios";

export const getMyUser = async () => {
  try {
    return await axios.get("api/users/me");
  } catch (error) {
    throw error;
  }
}
