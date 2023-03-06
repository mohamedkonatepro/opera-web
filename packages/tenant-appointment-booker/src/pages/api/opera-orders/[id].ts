import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();
const { API_KEY, SERVER_BASE_URL } = serverRuntimeConfig;

const getOperaOrder = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { id } = req.query;
    try {
      const response = await axios.get(
        `${SERVER_BASE_URL}/api/opera-order/${id}`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );
      const order = response.data;
      res.status(200).json(order);
    } catch (error: any) {
      console.error(error);
      res.status(error.response.status).json(error.response.data);
    }
  }
};

export default getOperaOrder;
