import AppointmentBookingProps from "@/types/appointmentBookingProps";
import { Box, Divider, Stack } from "@mui/material";
import AppointmentInformation from "./appointmentInformation";
import SelectAppointment from "./selectAppointment";

const AppointmentBookingMobile: React.FC<AppointmentBookingProps> = ({
  appointmentBooking,
  minDate,
  maxDate,
}) => {
  return (
    <Stack divider={<Divider orientation="horizontal" flexItem />} spacing={3}>
      <Box m={3} mb={0}>
        <AppointmentInformation
          appointmentBooking={appointmentBooking}
        />
      </Box>
      <Box width={1}>
        <Box m={3} mt={0}>
          <SelectAppointment
            order={appointmentBooking.order}
            appointmentBookingId={appointmentBooking.id}
            minDate={minDate}
            maxDate={maxDate}
          />
        </Box>
      </Box>
    </Stack>
  );
};

export default AppointmentBookingMobile;
