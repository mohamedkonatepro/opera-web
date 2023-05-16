import { apiAxiosInstance, setAccessToken } from "@/apiUtils/axiosInstance";
import corsMiddleware, { cors } from "@/apiUtils/corsMiddleware";
import handleError from "@/apiUtils/handleError";
import { RealEstateType } from "@/types/RealEstateType";
import { NextApiRequest, NextApiResponse } from "next";
import { formatPurpose } from "../purposes";

const getRealEstateTypes = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const queryParams = req.url?.split("?")[1];
    const response = await apiAxiosInstance.get(
      `/real-estate-types?${queryParams}`
    );
    return res.status(200).json(response.data.data.map(formatRealEstateType));
  } catch (error: any) {
    return handleError(error, res);
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await corsMiddleware(req, res, cors);
  setAccessToken(req);
  if (req.method === "GET") {
    return getRealEstateTypes(req, res);
  }

  return res.status(405).json({ error: "Method not allowed" });
};

const formatRealEstateType = (realEstateType: any): RealEstateType => {
  const { id, attributes } = realEstateType;
  const { name, code, og_code, purpose } = attributes;

  return {
    id,
    name,
    code,
    og_code,
    purpose: purpose?.data && formatPurpose(purpose.data),
  };
};

export default handler;
