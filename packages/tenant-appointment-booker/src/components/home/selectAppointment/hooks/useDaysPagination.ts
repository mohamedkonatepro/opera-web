import { DateTime, Interval } from "luxon";
import { useMemo, useState } from "react";
import { datesAreSame, isItemDisabled } from "../utils";

const DAYS_TO_SHOW_BEFORE_AND_AFTER = 2;
const DAYS_TO_SHOW = 6;

const useDaysPagination = (
  initialDate: DateTime,
  minDate: DateTime,
  maxDate: DateTime,
  selectedDate: DateTime,
  disabled: boolean
) => {
  const [referenceDay, setReferenceDay] = useState(initialDate.startOf("week"));

  const datesToShow = useMemo(() => {
    const endOfWeek = referenceDay.endOf("week").minus({ days: 1 });

    const interval = Interval.fromDateTimes(referenceDay, endOfWeek);
    const daysToShow = interval.splitBy({ days: 1 });

    return daysToShow.map((day) => day.start);
  }, [referenceDay]);

  const onClickNext = () => {
    setReferenceDay(referenceDay.plus({ weeks: 1 }));
  };

  const onClickPrevious = () => {
    setReferenceDay(referenceDay.minus({ weeks: 1 }));
  };

  return {
    items: [
      {
        page: undefined,
        type: "previous",
        selected: false,
        disabled: disabled || minDate >= referenceDay,
      },
      ...datesToShow.map((date) => {
        return {
          page: date,
          type: "page",
          disabled: disabled || isItemDisabled(date, minDate, maxDate),
          selected: datesAreSame(date, selectedDate),
        };
      }),
      {
        page: undefined,
        type: "next",
        selected: false,
        disabled: disabled || maxDate <= referenceDay.endOf("week"),
      },
    ],
    onClickNext,
    onClickPrevious,
  };
};

export default useDaysPagination;
