import { apiAxiosInstance } from "@/apiUtils/axiosInstance";
import corsMiddleware, { cors } from "@/apiUtils/corsMiddleware";
import handleError from "@/apiUtils/handleError";
import { formatRealEstateData } from "@/utils/dataFormattingUtils";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await corsMiddleware(req, res, cors);
  if (req.method === "GET") {
    const { id } = req.query
    try {
      const populateParams = {
        'populate[0]': 'buildingAnnexes.buildingAnnexType',
        'populate[1]': 'real_estate_type',
        'populate[2]': 'contractor',
        'populate[3]': 'floor',
        'populate[4]': 'purpose',
        'populate[5]': 'tenants',
        'populate[6]': 'owner',
        'populate[7]': 'moving_zone',
        'populate[8]': 'heating_energy_type',
        'populate[9]': 'heating_type',
        'populate[10]': 'water_heating_type',
        'populate[11]': 'water_heating_energy_type',
      };
      
      const params = new URLSearchParams(populateParams);
      const response = await apiAxiosInstance.get(`/real-estates/${id}?${params.toString()}`);
      return res.status(200).json(formatRealEstateData(response.data.data));
    } catch (error: any) {
      return handleError(error, res);
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
};

export default handler;
