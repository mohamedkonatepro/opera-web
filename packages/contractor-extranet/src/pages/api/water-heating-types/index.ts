import { apiAxiosInstance, setAccessToken } from "@/apiUtils/axiosInstance";
import corsMiddleware, { cors } from "@/apiUtils/corsMiddleware";
import handleError from "@/apiUtils/handleError";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await corsMiddleware(req, res, cors);
  setAccessToken(req);
  if (req.method === "GET") {
    try {
      const response = await apiAxiosInstance.get(`/water-heating-types`);
      return res
        .status(200)
        .json(response.data.data.map(formatWaterHeatingType));
    } catch (error: any) {
      return handleError(error, res);
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
};

const formatWaterHeatingType = (waterHeatingType: any) => {
  const { id, attributes } = waterHeatingType;
  const { name, code } = attributes;

  return { id, name, code };
};

export default handler;
