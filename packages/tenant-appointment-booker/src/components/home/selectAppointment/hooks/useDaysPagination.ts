import { DateTime } from "luxon";
import { useMemo, useState } from "react";
import { datesAreSame, isItemDisabled } from "../utils";

const DAYS_TO_SHOW_BEFORE_AND_AFTER = 2;

const useDaysPagination = (
  initialDate: DateTime,
  minDate: DateTime,
  maxDate: DateTime,
  selectedDate: DateTime,
  disabled: boolean
) => {
  const [halfDate, setHalfDate] = useState(initialDate);

  const datesToShow = useMemo(() => {
    const dates = [halfDate];
    for (let i = 1; i <= DAYS_TO_SHOW_BEFORE_AND_AFTER; i++) {
      const date = halfDate.minus({ days: i });
      dates.push(date);
    }
    for (let i = 1; i <= DAYS_TO_SHOW_BEFORE_AND_AFTER; i++) {
      const date = halfDate.plus({ days: i });
      dates.push(date);
    }
    return dates.sort();
  }, [halfDate]);

  const onClickNext = () => {
    const nextHalfDate = halfDate.plus({ days: 1 });
    setHalfDate(nextHalfDate);
  };

  const onClickPrevious = () => {
    const previousHalfDate = halfDate.minus({ days: 1 });
    setHalfDate(previousHalfDate);
  };

  return {
    items: [
      {
        page: undefined,
        type: "previous",
        selected: false,
        disabled: disabled || datesAreSame(datesToShow[0], minDate),
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
        disabled:
          disabled ||
          datesAreSame(datesToShow[datesToShow.length - 1], maxDate) ||
          datesAreSame(halfDate, maxDate),
      },
    ],
    onClickNext,
    onClickPrevious,
  };
};

export default useDaysPagination;
