import { DateTime } from "luxon";
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

const shouldDisableDate = (date: DateTime, zone: string, keyType: string) => {
  const firstAvailableDate = getFirstAvailableDate(zone);
  if (date.weekday === 7) return true;
  const dateString = date.toISODate();
  if (holidays.isHoliday(dateString)) return true;
  if (
    keyType === "contractor" &&
    date < firstAvailableDate &&
    !date.hasSame(firstAvailableDate, "day")
  ) {
    return true;
  }
  return false;
};

const DesiredDatePicker: FC<DesiredDatePickerProps> = ({
  zone,
  keyType,
  onChange,
}) => {
  const theme = useTheme();
  const handleOnChange = (value: DateTime | undefined) => {
    onChange(value);
  };

  return (
    <Stack spacing={1}>
      <Typography
        variant="subtitle1"
        sx={{ ...theme.typography.subtitle1, marginBottom: 1 }}
      >
        Date souhaitée
      </Typography>

      <DatePicker
        label="Date de RDV souhaitée"
        format="EEEE, d MMMM yyyy"
        disablePast
        shouldDisableDate={(date: DateTime) =>
          shouldDisableDate(date, zone, keyType)
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
                },
              },
            },
          },
        }}
      />
    </Stack>
  );
};

export default DesiredDatePicker;
