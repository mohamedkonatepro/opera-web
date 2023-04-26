import { apiAxiosInstance } from "@/apiUtils/axiosInstance";
import corsMiddleware, { cors } from "@/apiUtils/corsMiddleware";
import handleError from "@/apiUtils/handleError";
import { NextApiRequest, NextApiResponse } from "next";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await corsMiddleware(req, res, cors);
  if (req.method === "POST") {
    try {
      const { services, contacts, realEstate, appointment } = req.body
      const {data} = await apiAxiosInstance.post(`/orders`, {
        services: services.services,
        service_options: services.options,
        contacts,
        realEstate,
        appointment
      });
      return res.status(200).json(data);
    } catch (error: any) {
      return handleError(error, res);
    }
  }
  return res.status(405).json({ message: "Method not allowed" });
};

export default handler;