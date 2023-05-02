import axios from "axios";
import https from "https";

export const apiAxiosInstance = axios.create({
  baseURL: process.env.SERVER_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.API_KEY}`,
  },
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});
