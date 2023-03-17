import getAxiosOptions from "@/apiUtils/getAxiosOptions";
import Tenant from "@/types/tenant";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const updateTenantInformations = async (
  operaOrderId: string,
  locataire: Tenant
) => {
  return axios.put(
    `${process.env.SERVER_BASE_URL}/api/opera-order/${operaOrderId}/update-tenant`,
    {
      data: locataire,
    },
    getAxiosOptions()
  );
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "PUT") {
      const { locataire } = req.body;
      const { id } = req.query;
      const operaOrderId = id as string;
      const response = await updateTenantInformations(operaOrderId, locataire);
      return res.status(200).json(response.data);
    }
    return res.status(405).json({ message: "Method not allowed" });
  } catch (error: any) {
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    } else if (error.request) {
      return res.status(500).json({ error: "No response from server" });
    } else {
      return res.status(500).json({ error: "Unknown error" });
    }
  }
};

export default handler;
