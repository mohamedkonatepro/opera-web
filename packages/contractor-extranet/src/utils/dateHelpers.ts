import { DateTime, Info } from "luxon";

export const getFirstAvailableDate = (zone: string) => {
  const now = DateTime.local().setZone("Europe/Paris");
  const dayOfWeek = now.toFormat("cccc");
  const weekdays = Info.weekdays("long", { locale: "fr" });

  let days;
  if (zone === "PAR") {
    days = ["mardi", "jeudi", "vendredi"];
  } else if (zone === "LYO") {
    days = ["lundi", "mercredi", "vendredi"];
  } else {
    return now.plus({ days: 2 });
  }

  const dayNumbers = days.map((day) => (weekdays.indexOf(day) + 1) % 7);
  if (days.includes(dayOfWeek)) {
    return now.plus({ days: 1 });
  }

  const futureDays = dayNumbers.filter((day) => {
    const dayIndex = DateTime.fromObject({ weekday: day }).weekday;
    return dayIndex > now.weekday;
  });

  if (futureDays.length > 0) {
    const futureDay = futureDays[0];
    return DateTime.fromObject({ weekday: futureDay }).plus({ days: 1 });
  }

  const futureDay = dayNumbers[0];
  return DateTime.fromObject({ weekday: futureDay })
    .plus({ weeks: 1 })
    .plus({ days: 1 });
};
