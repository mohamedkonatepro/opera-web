import Holidays from "date-holidays";
import { DateTime } from "luxon";

const dateIsBussinessDay = (date: DateTime): boolean => {
  if (date.weekday <= 5) return true;
  const hd = new Holidays("FR", "fr");
  const holidays = hd.getHolidays(date.year);
  const isHoliday = holidays.some((h) => h.date === date.toISODate());
  return !isHoliday;
};

export default dateIsBussinessDay;
