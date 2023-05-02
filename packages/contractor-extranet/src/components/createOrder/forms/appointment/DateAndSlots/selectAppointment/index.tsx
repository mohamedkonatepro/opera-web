import { Stack } from "@mui/material";
import SelectAppointmentDayCalendar from "./SelectAppointmentDayCalendar";
import { FC } from "react";
import { DateTime } from "luxon";
import SelectSlot from "./SelectSlot";
import Slot from "@/types/Slot";

interface SelectAppointmentProps {
  desiredDateByContractor: DateTime;
  onSelectDate: (date: DateTime) => void;
  selectedDate: DateTime;
  selectedSlot?: Slot;
  onSelectSlot: (slot: Slot) => void;
  disabled?: boolean;
}

const SelectAppointment: FC<SelectAppointmentProps> = ({
  desiredDateByContractor,
  onSelectDate,
  selectedDate,
  selectedSlot,
  onSelectSlot,
  disabled = false
}) => {
  return (
    <Stack spacing={3}>
      <SelectAppointmentDayCalendar
        desiredDateByContractor={desiredDateByContractor}
        selectedDate={selectedDate}
        onSelectDate={onSelectDate}
        disabled={disabled}
      />
      <SelectSlot
        selectedDate={selectedDate}
        selectedSlot={selectedSlot}
        onSelectSlot={onSelectSlot}
        disabled={disabled}
      />
    </Stack>
  );
};

export default SelectAppointment;
