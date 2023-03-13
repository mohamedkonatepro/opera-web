import { IconButton, Stack, Typography } from "@mui/material";
import { DateTime } from "luxon";
import SelectSlot from "./SelectSlot";
import Slot from "@/types/slot";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import useDaysPagination from "./hooks/useDaysPagination";
import { useQuery } from "@tanstack/react-query";
import * as operaSlotsClient from "@/queries/operaSlots";
import NoSlotsBetweenDates from "./NoSlotsAvailable";

interface SelectAppointmentDayCalendarProps {
  orderId: string;
  desiredDateByContractor: DateTime;
  selectedDate: DateTime;
  selectedSlot?: Slot;
  minDate: DateTime;
  maxDate: DateTime;
  disabled?: boolean;
  hasSlotsBetweenDates?: boolean;
  onSelectSlot: (slot: Slot) => void;
  onSelectDate: (date: DateTime) => void;
}

const SelectAppointmentDayCalendar: React.FC<
  SelectAppointmentDayCalendarProps
> = (props) => {
  const {
    orderId,
    minDate,
    maxDate,
    selectedDate,
    selectedSlot,
    desiredDateByContractor,
    disabled = false,
    hasSlotsBetweenDates = true,
    onSelectDate,
    onSelectSlot,
  } = props;

  const { items, onClickNext, onClickPrevious } = useDaysPagination(
    desiredDateByContractor,
    minDate,
    maxDate,
    selectedDate,
    disabled
  );

  const handleOnClickPage = (page: DateTime) => {
    onSelectDate(page);
  };

  return (
    <Stack spacing={1.5}>
      <Typography variant="body1" textTransform="capitalize">
        {selectedDate.toFormat("LLLL, yyyy")}
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
                    variant="body1"
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
                      color: selected ? "common.white" : "secondary",
                      typography: "body2",
                      fontWeight: "500",
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
            case "next": {
              return (
                <Stack key="next" spacing={1} alignItems="center">
                  <Typography variant="body1" color="text.secondary">
                    &nbsp;
                  </Typography>
                  <IconButton
                    onClick={onClickNext}
                    disabled={disabled}
                    sx={{ width: 40, height: 40, backgroundColor: "#F4F4F4" }}
                  >
                    <ChevronRight />
                  </IconButton>
                </Stack>
              );
            }
            case "previous": {
              return (
                <Stack key="previous" spacing={1} alignItems="center">
                  <Typography variant="body1" color="text.secondary">
                    &nbsp;
                  </Typography>
                  <IconButton
                    onClick={onClickPrevious}
                    disabled={disabled}
                    sx={{ width: 40, height: 40, backgroundColor: "#F4F4F4" }}
                  >
                    <ChevronLeft />
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
      {hasSlotsBetweenDates && (
        <>
          <Typography
            variant="body1"
            sx={{
              ":first-letter": {
                textTransform: "uppercase",
              },
            }}
          >
            {selectedDate.toFormat("EEEE, d LLLL yyyy")}
          </Typography>
          <SelectSlot
            selectedDate={selectedDate}
            selectedSlot={selectedSlot}
            orderId={orderId}
            onSelectSlot={onSelectSlot}
            disabled={disabled}
          />
        </>
      )}
      {!hasSlotsBetweenDates && <NoSlotsBetweenDates />}
    </Stack>
  );
};

export default SelectAppointmentDayCalendar;
