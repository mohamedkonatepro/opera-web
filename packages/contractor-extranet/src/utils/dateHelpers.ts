import { DateTime, Info, Duration } from "luxon";
import Holidays from "date-holidays";

const holidays = new Holidays("FR");
export const getFirstAvailableDate = (zone: string, type: string) => {
  if (type === "contractor") {
    let now = DateTime.local().setZone("Europe/Paris");
    now = now.plus({ days: 1 });
    if (now.hour >= 18) {
      now = now.plus({ days: 1 });
    }
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
      for (const futureDay of futureDays) {
        if (!DateTime.fromObject({ weekday: futureDay })) {
          return DateTime.fromObject({ weekday: futureDay }).plus({ days: 1 });
        }
      }
    }

    for (const futureDay of dayNumbers) {
      const isHoliday = holidays.isHoliday(
        DateTime.fromObject({ weekday: futureDay })
          .plus({ weeks: 1 })
          .toISODate()
      );
      if (!isHoliday) {
        return DateTime.fromObject({ weekday: futureDay })
          .plus({ weeks: 1 })
          .plus({ days: 1 });
      }
    }
  }
  return DateTime.now().plus(Duration.fromObject({ days: 1 }));
};
