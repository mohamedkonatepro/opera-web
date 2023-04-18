import { apiAxiosInstance } from "@/apiUtils/axiosInstance";
import corsMiddleware, { cors } from "@/apiUtils/corsMiddleware";
import handleError from "@/apiUtils/handleError";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await corsMiddleware(req, res, cors);
  if (req.method === "GET") {
    try {
      const response = await apiAxiosInstance.get(
        `/purposes`
      );
      return res.status(200).json(
        response.data.data.map((purpose: any) => ({
          id: purpose.id,
          name: purpose.attributes.name,
          code: purpose.attributes.code,
        }))
      );
    } catch (error: any) {
      return handleError(error, res);
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
};

export default handler;
