import { Paper, Stack } from "@mui/material";
import SelectAppointmentDayCalendar from "./SelectAppointmentDayCalendar";
import { FC } from "react";
import { DateTime } from "luxon";
import SelectSlot from "./SelectSlot";
import Slot from "@/types/Slot";

interface SelectAppointmentProps {
  desiredDateByContractor?: DateTime;
  onSelectDate: (date: DateTime) => void;
  selectedDate?: DateTime;
  selectedSlot?: Slot;
  onSelectSlot: (slot: Slot) => void;
  disabled?: boolean;
  contextValues: any;
}

const SelectAppointment: FC<SelectAppointmentProps> = ({
  desiredDateByContractor,
  onSelectDate,
  selectedDate,
  selectedSlot,
  onSelectSlot,
  contextValues,
  disabled = false,
}) => {

  if (!desiredDateByContractor) return null;

  return (
    <Stack component={Paper} spacing={3} p={3} variant="outlined">
      <SelectAppointmentDayCalendar
        desiredDateByContractor={desiredDateByContractor}
        selectedDate={selectedDate}
        onSelectDate={onSelectDate}
        disabled={disabled}
      />
      {selectedDate && (
        <SelectSlot
          selectedDate={selectedDate}
          selectedSlot={selectedSlot}
          onSelectSlot={onSelectSlot}
          disabled={disabled}
          contextValues={contextValues}
        />
      )}
    </Stack>
  );
};

export default SelectAppointment;
