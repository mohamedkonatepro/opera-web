import { DateTime } from "luxon";
import getPreviousNearestBusinessDay from "./getPreviousNearestBusinessDay";
import orderIsEDL from "./orderIsEDL";

const appointmentDateIsTooLate = (date: string, orderType: string): boolean => {
  const previousNearestBusinessDay = getPreviousNearestBusinessDay(
    DateTime.fromISO(date)
  );
  const today = DateTime.now();
  if (previousNearestBusinessDay < today) return true;

  if (orderIsEDL(orderType)) {
    return previousNearestBusinessDay.diff(today, "hours").hours < 48;
  }
  if (orderType === "D") {
    return previousNearestBusinessDay.diff(today, "hours").hours < 24;
  }

  return false;
};

export default appointmentDateIsTooLate;
