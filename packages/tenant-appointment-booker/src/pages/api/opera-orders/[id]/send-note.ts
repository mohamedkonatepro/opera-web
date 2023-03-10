import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const sendNoteToUpdateRealEstateInformation = async (
  operaOrderId: string,
  note: string
) => {
  return axios.post(`${process.env.SERVER_URL}/api/opera-order/${operaOrderId}/send-note`, {
    data: {
      content: note
    },
  });
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      const { note } = req.body;
      const { id } = req.query;
      const operaOrderId = id as string;
      const response = await sendNoteToUpdateRealEstateInformation(
        operaOrderId,
        note
      );
      res.status(200).json(response);
    }
    res.status(405).json({ message: "Method not allowed" });
  } catch (error: any) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else if (error.request) {
      res.status(500).json({ error: "No response from server" });
    } else {
      res.status(500).json({ error: "Unknown error" });
    }
  }
}

export default handler;
