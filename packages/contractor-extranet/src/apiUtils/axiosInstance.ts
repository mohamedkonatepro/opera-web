import axios from "axios";
import { NextApiRequest } from "next";
import { getCookie } from "cookies-next";

export const apiAxiosInstance = axios.create({
  baseURL: `${process.env.SERVER_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAccessToken = (req: NextApiRequest) => {
  const accessToken = getCookie("access_token", { req });
  apiAxiosInstance.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${accessToken}`;
};
