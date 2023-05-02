import { IconButton, Stack, Typography } from "@mui/material";
import { DateTime } from "luxon";
import Slot from "@/types/Slot";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import useDaysPagination from "./hooks/useDaysPagination";

interface SelectAppointmentDayCalendarProps {
  desiredDateByContractor: DateTime;
  selectedDate: DateTime;
  disabled?: boolean;
  onSelectDate: (date: DateTime) => void;
}

const SelectAppointmentDayCalendar: React.FC<
  SelectAppointmentDayCalendarProps
> = (props) => {
  const {
    selectedDate,
    desiredDateByContractor,
    disabled = false,
    onSelectDate,
  } = props;

  const { items, onClickNext, onClickPrevious } = useDaysPagination(
    desiredDateByContractor,
    selectedDate,
    disabled
  );

  const handleOnClickPage = (page: DateTime) => {
    onSelectDate(page);
  };

  const currentMinPage = items[2].page as DateTime;

  return (
    <Stack spacing={1.5}>
      <Typography
        variant="subtitle2"
        textTransform="capitalize"
        color="text.primary"
      >
        {currentMinPage.toFormat("LLLL, yyyy")}
      </Typography>
      <Stack direction="row" spacing={1} justifyContent="space-between">
        {items.map(({ page, type, selected, disabled }) => {
          switch (type) {
            case "page": {
              const currentDate = page as DateTime;

              return (
                <Stack
                  key={currentDate.toISODate()}
                  spacing={1}
                  alignItems="center"
                >
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    textTransform="capitalize"
                  >
                    {currentDate.toFormat("EEE")}
                  </Typography>
                  <IconButton
                    color="secondary"
                    disabled={disabled}
                    onClick={() => handleOnClickPage(currentDate)}
                    sx={{
                      width: 40,
                      height: 40,
                      backgroundColor: selected
                        ? "secondary.main"
                        : "secondary.light",
                      typography: selected ? "subtitle2" : "body2",
                      color: selected ? "common.white" : "secondary",
                      "&:hover": {
                        backgroundColor: selected
                          ? "secondary.main"
                          : "secondary.light",
                      },
                    }}
                  >
                    {currentDate.toFormat("dd")}
                  </IconButton>
                </Stack>
              );
            }
            case "next":
            case "previous": {
              const onClick = type === "next" ? onClickNext : onClickPrevious;
              const Icon = type === "next" ? ChevronRight : ChevronLeft;
              return (
                <Stack key={type} spacing={1.75} alignItems="center">
                  <Typography variant="caption">&nbsp;</Typography>
                  <IconButton
                    onClick={onClick}
                    disabled={disabled}
                    size="small"
                  >
                    <Icon />
                  </IconButton>
                </Stack>
              );
            }
            default: {
              return null;
            }
          }
        })}
      </Stack>
    </Stack>
  );
};

export default SelectAppointmentDayCalendar;
