import { apiAxiosInstance, setAccessToken } from "@/apiUtils/axiosInstance";
import corsMiddleware, { cors } from "@/apiUtils/corsMiddleware";
import handleError from "@/apiUtils/handleError";
import { Purpose } from "@/types/Purpose";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await corsMiddleware(req, res, cors);
  setAccessToken(req);
  if (req.method === "GET") {
    try {
      const queryParams = req.url?.split("?")[1];
      const response = await apiAxiosInstance.get(`/purposes?${queryParams}`);
      return res.status(200).json(response.data.data.map(formatPurpose));
    } catch (error: any) {
      return handleError(error, res);
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
};

export const formatPurpose = (purpose: any): Purpose => {
  const { id, attributes } = purpose;
  const { name, code } = attributes;

  return { id, name, code };
};

export default handler;
