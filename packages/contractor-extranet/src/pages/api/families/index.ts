import { apiAxiosInstance } from "@/apiUtils/axiosInstance";
import corsMiddleware, { cors } from "@/apiUtils/corsMiddleware";
import handleError from "@/apiUtils/handleError";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await corsMiddleware(req, res, cors);
  if (req.method === "GET") {
    try {
      const response = await apiAxiosInstance.get(
        `/families?populate=services.service_options`
      );
      return res.status(200).json(
        response.data.data.map((family: any) => ({
          id: family.id,
          name: family.attributes.name,
          code: family.attributes.code,
          services: family.attributes.services.data.map((service: any) => ({
            id: service.id,
            name: service.attributes.name,
            code: service.attributes.code,
            options: service.attributes.service_options.data.map(
              (option: any) => ({
                id: option.id,
                name: option.attributes.name,
                code: option.attributes.code,
              })
            ),
          })),
        }))
      );
    } catch (error: any) {
      return handleError(error, res);
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
};

export default handler;
