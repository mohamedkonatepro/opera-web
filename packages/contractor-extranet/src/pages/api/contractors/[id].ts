import { NextApiRequest, NextApiResponse } from "next";
import corsMiddleware, { cors } from "@/apiUtils/corsMiddleware";
import handleError from "@/apiUtils/handleError";
import { apiAxiosInstance } from "@/apiUtils/axiosInstance";
import { formatContractorData } from "@/utils/dataFormattingUtils";

export const getContractor = async (id: string) => {
  const response = await apiAxiosInstance.get(
    `/contractors/${id}?populate=service_options`
  );
  return formatContractorData(response.data.data);
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await corsMiddleware(req, res, cors);
  try {
    if (req.method === "GET") {
      const jsonData = await getContractor(req.query.id as string);
      return res.status(200).json(jsonData);
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error: any) {
    return handleError(error, res);
  }
};

export default handler;
