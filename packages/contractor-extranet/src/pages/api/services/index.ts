import { apiAxiosInstance, setAccessToken } from "@/apiUtils/axiosInstance";
import corsMiddleware, { cors } from "@/apiUtils/corsMiddleware";
import formatService from "@/apiUtils/formatData/formatService";
import handleError from "@/apiUtils/handleError";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await corsMiddleware(req, res, cors);
  setAccessToken(req);
  if (req.method === "GET") {
    try {
      const { ids } = req.query;
      let url = "/services?populate=*";
      if (typeof ids === "string") {
        let i = 0;
        for (const id of ids.split(",")) {
          url += `&filters[id][$eqi][${i}]=${id}`;
          i++;
        }
      }
      const response = await apiAxiosInstance.get(url);
      return res.status(200).json(response.data.data.map(formatService));
    } catch (error: any) {
      return handleError(error, res);
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
};

export default handler;
