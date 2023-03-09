import corsMiddleware, { cors } from "@/apiUtils/corsMiddleware";
import { DateTime, Interval } from "luxon";
import { NextApiRequest, NextApiResponse } from "next";
import { getOperaSlotsForDate } from ".";

export const hasOperaSlotsBetweenDates = async (
  orderId: string,
  startDate: string,
  endDate: string
) => {
  return false;
  const interval = Interval.fromDateTimes(
    DateTime.fromISO(startDate),
    DateTime.fromISO(endDate)
  );
  const dates = interval.splitBy({ days: 1 }).map((i) => i.start.toISODate());
  const promises = dates.map((date) => getOperaSlotsForDate(orderId, date));
  const allSlots = await Promise.allSettled(promises);
  return allSlots.some((s) => s.status === "fulfilled" && s.value.length > 0);
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await corsMiddleware(req, res, cors);
  if (req.method === "GET") {
    const { orderId, startDate, endDate } = req.query;
    try {
      const hasSlots = await hasOperaSlotsBetweenDates(
        orderId as string,
        startDate as string,
        endDate as string
      );
      return res.status(200).json(hasSlots);
    } catch (error: any) {
      if (error.response) {
        return res.status(error.response.status).json(error.response.data);
      } else if (error.request) {
        return res.status(500).json({ error: "No response from server" });
      } else {
        return res.status(500).json({ error: "Unknown error" });
      }
    }
  }
  return res.status(405).json({ error: "Method not allowed" });
};

export default handler;
