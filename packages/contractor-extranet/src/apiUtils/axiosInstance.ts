import axios from "axios";

export const apiAxiosInstance = axios.create({
  baseURL: `${process.env.SERVER_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.API_KEY}`,
  },
});
