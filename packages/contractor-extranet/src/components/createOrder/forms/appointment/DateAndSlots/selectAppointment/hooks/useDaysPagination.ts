import { DateTime, Interval } from "luxon";
import { useMemo, useState } from "react";
import { datesAreSame, isItemDisabled } from "../utils";

const useDaysPagination = (
  initialDate: DateTime,
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
        disabled: disabled || initialDate >= referenceDay,
      },
      ...datesToShow.map((date) => {
        return {
          page: date,
          type: "page",
          disabled: disabled || isItemDisabled(date),
          selected: datesAreSame(date, selectedDate),
        };
      }),
      {
        page: undefined,
        type: "next",
        selected: false,
        // disabled: disabled || maxDate <= referenceDay.endOf("week"),
      },
    ],
    onClickNext,
    onClickPrevious,
  };
};

export default useDaysPagination;
