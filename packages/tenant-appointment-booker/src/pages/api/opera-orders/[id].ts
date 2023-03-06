import getAxiosOptions from "@/apiUtils/getAxiosOptions";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const getOperaOrder = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { id } = req.query;
    try {
      const response = await axios.get(
        `${process.env.SERVER_BASE_URL}/api/opera-order/${id}`,
        getAxiosOptions()
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
