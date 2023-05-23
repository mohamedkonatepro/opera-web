import { apiAxiosInstance, setAccessToken } from "@/apiUtils/axiosInstance";
import corsMiddleware, { cors } from "@/apiUtils/corsMiddleware";
import handleError from "@/apiUtils/handleError";
import { formatContractorData } from "@/utils/dataFormattingUtils";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await corsMiddleware(req, res, cors);
  setAccessToken(req);

  if (req.method === "GET") {
    try {
      const response = await apiAxiosInstance.get(
        `/users/me?populate=contractor.service_options`
      );

      const { data } = response;

      const formattedUser = {
        username: data.username,
        contractor: {
          ...data.contractor,
          serviceOptions: data.contractor.service_options.map(
            (serviceOption: any) => ({
              ...serviceOption,
              itemReference: serviceOption.item_reference,
            })
          ),
        },
      };

      return res.status(200).json(formattedUser);
    } catch (error: any) {
      return handleError(error, res);
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
};

export default handler;
