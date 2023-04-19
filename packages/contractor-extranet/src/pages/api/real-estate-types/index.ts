import { apiAxiosInstance } from "@/apiUtils/axiosInstance";
import corsMiddleware, { cors } from "@/apiUtils/corsMiddleware";
import handleError from "@/apiUtils/handleError";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await corsMiddleware(req, res, cors);
  if (req.method === "GET") {
    try {
      const response = await apiAxiosInstance.get(
        `/real-estate-types`
      );
      return res.status(200).json(
        response.data.data.map(formatRealEstateType)
      );
    } catch (error: any) {
      return handleError(error, res);
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
};

const formatRealEstateType = (realEstateType: any) => {
  const { id, attributes } = realEstateType;
  const { name, code } = attributes;

  return { id, name, code };
}

export default handler;
