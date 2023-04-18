import { NextApiResponse } from "next";

const handleError = (error: any, res: NextApiResponse) => {
  console.error(error);
  if (error.response) {
    return res.status(error.response.status).json(error.response.data);
  } else if (error.request) {
    return res.status(500).json({ error: "No response from server" });
  } else {
    return res.status(500).json({ error: "Unknown error" });
  }
};

export default handleError;
