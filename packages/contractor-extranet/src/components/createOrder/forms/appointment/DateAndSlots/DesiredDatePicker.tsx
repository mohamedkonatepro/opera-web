import { DateTime } from "luxon";
import { FC } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { getFirstAvailableDate } from "@/utils/dateHelpers";
import Holidays from "date-holidays";

const holidays = new Holidays("FR");

interface DesiredDatePickerProps {
  zone: string;
  keyType: string;
  onChange: (newValue: DateTime | undefined) => void;
  date?: DateTime;
}

const shouldDisableDate = (date: DateTime): boolean => {
  const isSunday = date.weekday === 7;
  const isHoliday = holidays.isHoliday(date.toISODate());

  return isSunday || !!isHoliday;
};

const DesiredDatePicker: FC<DesiredDatePickerProps> = ({
  zone,
  keyType,
  onChange,
  date,
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
      value={date || null}
      shouldDisableDate={(date: DateTime) => shouldDisableDate(date)}
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
