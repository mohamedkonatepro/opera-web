import { apiAxiosInstance, setAccessToken } from "@/apiUtils/axiosInstance";
import corsMiddleware, { cors } from "@/apiUtils/corsMiddleware";
import handleError from "@/apiUtils/handleError";
import { formatTenantData } from "@/utils/dataFormattingUtils";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await corsMiddleware(req, res, cors);
  setAccessToken(req);
  if (req.method === "GET") {
    const { firstname, lastname } = req.query;
    try {
      let url =
        "/tenants?populate=*&filters[realEstate][id][$null]=false&pagination[pageSize]=100&pagination[page]=1";
      if (firstname) {
        url += `&filters[$or][0][firstname][$containsi]=${firstname}`;
      }
      if (lastname) {
        url += `&filters[$or][1][lastname][$containsi]=${lastname}`;
      }
      const response = await apiAxiosInstance.get(url);
      return res.status(200).json(response.data.data.map(formatTenantData));
    } catch (error: any) {
      return handleError(error, res);
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
};

export default handler;
