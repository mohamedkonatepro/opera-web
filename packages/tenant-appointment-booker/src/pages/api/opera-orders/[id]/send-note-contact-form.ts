import corsMiddleware, { cors } from "@/apiUtils/corsMiddleware";
import getAxiosOptions from "@/apiUtils/getAxiosOptions";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const sendNoteContactForm = async (
  operaOrderId: string,
  reason: string,
  type: string,
  newDesiredDate?: string
) => {
  return axios.post(
    `${process.env.SERVER_URL}/api/opera-order/${operaOrderId}/send-note-contact-form`,
    {
      reason,
      type,
      newDesiredDate,
    },
    getAxiosOptions()
  );
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await corsMiddleware(req, res, cors);
  if (req.method === "POST") {
    try {
      const { reason, type, newDesiredDate } = req.body;
      const { id } = req.query;
      const operaOrderId = id as string;
      const response = await sendNoteContactForm(
        operaOrderId,
        reason,
        type,
        newDesiredDate
      );
      return res.status(200).json(response);
    } catch (error: any) {
      if (error.response) {
        return res.status(error.response.status).json(error.response.data);
      } else if (error.request) {
        return res.status(500).json({ error: "No response from server" });
      } else {
        return res.status(500).json({ error: "Unknown error" });
      }
    }
  }
  return res.status(405).json({ message: "Method not allowed" });
};

export default handler;
