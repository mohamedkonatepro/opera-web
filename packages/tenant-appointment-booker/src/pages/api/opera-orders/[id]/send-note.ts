import corsMiddleware, { cors } from "@/apiUtils/corsMiddleware";
import getAxiosOptions from "@/apiUtils/getAxiosOptions";
import handleError from "@/apiUtils/handleError";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const sendNoteToUpdateRealEstateInformation = async (
  operaOrderId: string,
  note: string
) => {
  return axios.post(
    `${process.env.SERVER_BASE_URL}/api/opera-order/${operaOrderId}/send-note`,
    {
      data: {
        content: note,
      },
    },
    getAxiosOptions()
  );
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await corsMiddleware(req, res, cors);
  if (req.method === "POST") {
    try {
      const { note } = req.body;
      const { id } = req.query;
      const operaOrderId = id as string;
      const response = await sendNoteToUpdateRealEstateInformation(
        operaOrderId,
        note
      );
      return res.status(200).json(response.data);
    } catch (error: any) {
      handleError(error, res);
    }
  }
  return res.status(405).json({ message: "Method not allowed" });
};

export default handler;
