import { DateTime } from "luxon";
import { FC } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import Holidays from "date-holidays";
import { Stack, TextField, Typography, useTheme } from "@mui/material";

const holidays = new Holidays("FR");

interface MaxInterventionDatePickerProps {
  onChange: (newValue: DateTime | undefined) => void;
  furtherInformations: string;
  setFurtherInformations: (furtherInformations: string) => void;
}

const shouldDisableDate = (date: DateTime): boolean => {
  const isSunday = date.weekday === 7;
  const isHoliday = holidays.isHoliday(date.toISODate());

  return isSunday || !!isHoliday;
};

const MaxInterventionDatePicker: FC<MaxInterventionDatePickerProps> = ({
  onChange,
  furtherInformations,
  setFurtherInformations,
}) => {
  const theme = useTheme();
  const handleOnChange = (value: DateTime | undefined) => {
    onChange(value);
  };
  const minDate = DateTime.now().plus({ days: 1 }).startOf("day");

  return (
    <Stack spacing={2}>
      <Typography variant="subtitle1" sx={{ ...theme.typography.subtitle1 }}>
        Intervantion
      </Typography>
      <Stack sx={{ width: "50%" }}>
        <DatePicker
          label="Date maximale pour l’intervention"
          format="EEEE, d MMMM yyyy"
          minDate={minDate}
          disablePast
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
      </Stack>
      <TextField
        name="furtherInformations"
        placeholder="Informations complémentaires : précisions sur l’intervention, estimation des travaux d’amiante…"
        color="secondary"
        sx={{
          bgcolor: "background.paper",
        }}
        multiline
        value={furtherInformations}
        onChange={(event) => {
          setFurtherInformations(event.target.value);
        }}
      />
    </Stack>
  );
};

export default MaxInterventionDatePicker;
