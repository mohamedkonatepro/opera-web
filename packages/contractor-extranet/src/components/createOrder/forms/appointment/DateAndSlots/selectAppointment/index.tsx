import { Stack } from "@mui/material";
import SelectSlot from "./SelectSlot";
import SelectAppointmentDayCalendar from "./SelectAppointmentDayCalendar";

const SelectAppointment = () => {
  return (
    <Stack spacing={3}>
      <SelectAppointmentDayCalendar />
      {/* <SelectSlot /> */}
    </Stack>
  );
};

export default SelectAppointment;
