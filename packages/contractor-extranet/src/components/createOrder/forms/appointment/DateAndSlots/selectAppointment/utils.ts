import Holidays from "date-holidays";
import { DateTime } from "luxon";

const hd = new Holidays("FR", "fr");

export const isItemDisabled = (currentDate: DateTime) => {
  if (currentDate.weekday === 7) return true;
  const holidays = hd.getHolidays(currentDate.year);
  const isHoliday = holidays.some(
    (h) => DateTime.fromJSDate(h.start).toISODate() === currentDate.toISODate()
  );

  return isHoliday;
};

export const datesAreSame = (date1?: DateTime, date2?: DateTime) => {
  if (!date1 || !date2) return false;
  return (
    date1.hasSame(date2, "day") &&
    date1.hasSame(date2, "month") &&
    date1.hasSame(date2, "year")
  );
};
