import { DateTime, Duration } from "luxon";
import { FC, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { Stack, Typography, useTheme } from "@mui/material";
import { getFirstAvailableDate } from "@/utils/dateHelpers";
import Holidays from "date-holidays";

const holidays = new Holidays("FR");

interface DesiredDatePickerProps {
  zone: string;
  keyType: string;
  onChange: (newValue: DateTime | undefined) => void;
}

const shouldDisableDate = (date: DateTime) => {

  if (date.weekday === 7) {
    return true;
  }
  if (holidays.isHoliday(date.toISODate())) {
    return true;
  }

  return false;
};
 

const DesiredDatePicker: FC<DesiredDatePickerProps> = ({
  zone,
  keyType,
  onChange,
}) => {
  const handleOnChange = (value: DateTime | undefined) => {
    onChange(value);
  };

  return (
    <DatePicker
      label="Date de RDV souhaitée"
      format="EEEE, d MMMM yyyy"
      minDate={getFirstAvailableDate(zone, keyType)}
      disablePast
      shouldDisableDate={(date: DateTime) =>
        shouldDisableDate(date)
      }
      onChange={(newValue) => {
        handleOnChange(newValue as DateTime);
      }}
      slotProps={{
        openPickerIcon: {
          fontSize: "small",
        },
        textField: {
          name: "newDesiredDate",
          color: "secondary",
          fullWidth: true,
        },
        day: {
          sx: {
            "&.Mui-selected": {
              backgroundColor: "secondary.main",
              color: "secondary.contrastText",
              "&:hover": {
                backgroundColor: "secondary.main",
              },
              "&:focus": {
                backgroundColor: "secondary.main",
                color: "secondary.contrastText",
                "&:hover": {
                  backgroundColor: "secondary.main",
                },
                "&:focus": {
                  backgroundColor: "secondary.main",
                },
              },
            },
          },
        },
      }}
    />
  );
};

export default DesiredDatePicker;
