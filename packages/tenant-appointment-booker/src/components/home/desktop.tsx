import AppointmentBookingProps from "@/types/appointmentBookingProps";
import Order from "@/types/order";
import { Box, Divider, Stack } from "@mui/material";
import AppointmentInformation from "./appointmentInformation";
import SelectAppointment from "./selectAppointment";

const AppointmentBookingDesktop: React.FC<AppointmentBookingProps> = ({
  appointmentBooking,
  minDate,
  maxDate,
}) => {
  return (
    <Stack
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
      spacing={3}
    >
      <Box m={3} mr={0}>
        <Box width={540}>
          <AppointmentInformation appointmentBooking={appointmentBooking} />
        </Box>
      </Box>
      <Box width={1}>
        <Box m={3} ml={0}>
          <Box width={356}>
            <SelectAppointment
              order={appointmentBooking.order}
              appointmentBookingId={appointmentBooking.uuid}
              minDate={minDate}
              maxDate={maxDate}
              appointment={appointmentBooking.appointment}
              isEdit={!!appointmentBooking.appointment}
            />
          </Box>
        </Box>
      </Box>
    </Stack>
  );
};

export default AppointmentBookingDesktop;
