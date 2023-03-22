import corsMiddleware, { cors } from "@/apiUtils/corsMiddleware";
import getAxiosOptions from "@/apiUtils/getAxiosOptions";
import handleError from "@/apiUtils/handleError";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const cancelTenantRequest = async (
  operaOrderId: string,
  appointmentBookingId: string
) => {
  return await axios.post(
    `${process.env.SERVER_BASE_URL}/api/opera-order/${operaOrderId}/confirm-tenant-request`,
    {
      appointmentBookingId,
    },
    getAxiosOptions()
  );
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await corsMiddleware(req, res, cors);
  if (req.method === "POST") {
    try {
      const { appointmentBookingId } = req.body;
      const { id } = req.query;
      const operaOrderId = id as string;
      const response = await cancelTenantRequest(
        operaOrderId,
        appointmentBookingId
      );
      return res.status(200).json(response.data);
    } catch (error: any) {
      handleError(error, res);
    }
  }
  return res.status(405).json({ message: "Method not allowed" });
};

export default handler;
