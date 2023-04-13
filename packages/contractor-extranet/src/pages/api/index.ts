import corsMiddleware, { cors } from "@/apiUtils/corsMiddleware";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await corsMiddleware(req, res, cors);
  return res.status(200).json({ ok: true });
};

export default handler;
