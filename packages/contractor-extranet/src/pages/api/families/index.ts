import { apiAxiosInstance } from "@/apiUtils/axiosInstance";
import corsMiddleware, { cors } from "@/apiUtils/corsMiddleware";
import formatFamily from "@/apiUtils/formatData/formatFamily";
import handleError from "@/apiUtils/handleError";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await corsMiddleware(req, res, cors);
  if (req.method === "GET") {
    try {
      const response = await apiAxiosInstance.get(
        `/families?populate=services.service_options`
      );
      return res.status(200).json(response.data.data.map(formatFamily));
    } catch (error: any) {
      return handleError(error, res);
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
};

const formatFamily = (family: any) => {
    const { id, attributes } = family;
    const { name, code, services } = attributes;
    const formattedServices = services.data.map(formatService);

    return { id, name, code, services: formattedServices };
}

const formatService = (service: any) => {
    const { id, attributes } = service;
    const { name, code, service_options } = attributes;
    const formattedServiceOptions = service_options.data.map(formatServiceOption);

    return { id, name, code, options: formattedServiceOptions };
}

const formatServiceOption = (serviceOption: any) => {
    const { id, attributes } = serviceOption;
    const { name, code } = attributes;

    return { id, name, code };
}

export default handler;
