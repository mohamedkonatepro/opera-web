import { DateTime } from "luxon";
import dateIsBussinessDay from "./dateIsBussinessDay";

const getPreviousNearestBusinessDay = (desiredDate: DateTime): DateTime => {
  const dateToTest = desiredDate.minus({ days: 1 }).set({ hour: 18 });
  if (!dateIsBussinessDay(dateToTest))
    return getPreviousNearestBusinessDay(dateToTest);

  return dateToTest;
};

export default getPreviousNearestBusinessDay;
