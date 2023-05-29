import axios from "axios";

export const getMyUser = async () => {
  try {
    return (await axios.get("/api/users/me")).data;
  } catch (error) {
    throw error;
  }
};
