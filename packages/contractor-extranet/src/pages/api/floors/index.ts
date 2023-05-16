import { apiAxiosInstance, setAccessToken } from "@/apiUtils/axiosInstance";
import corsMiddleware, { cors } from "@/apiUtils/corsMiddleware";
import handleError from "@/apiUtils/handleError";
import { Floor } from "@/types/Floor";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await corsMiddleware(req, res, cors);
  setAccessToken(req);
  if (req.method === "GET") {
    return getFloors(req, res);
  }

  return res.status(405).json({ error: "Method not allowed" });
};

const getFloors = async (
  _: NextApiRequest,
  res: NextApiResponse
): Promise<Floor[] | void> => {
  const tmpFloors: any[] = [];
  let page = 1;
  let totalPages = -1;

  while (page <= totalPages || totalPages === -1) {
    try {
      const response = await apiAxiosInstance.get(
        `/floors?pagination[page]=${page}&pagination[pageSize]=100`
      );
      tmpFloors.push(...response.data.data);
      totalPages = response.data.meta.pagination.pageCount;
      page++;
    } catch (error: any) {
      return handleError(error, res);
    }
  }

  return res.status(200).json(tmpFloors.map(formatFloor));
};

const formatFloor = (floor: any): Floor => {
  const { id, attributes } = floor;
  const { name, code } = attributes;

  return { id, name, code };
};

export default handler;
