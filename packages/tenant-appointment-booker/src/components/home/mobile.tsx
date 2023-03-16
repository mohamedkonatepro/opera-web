import AppointmentBookingProps from "@/types/appointmentBookingProps";
import Order from "@/types/order";
import { Box, Divider, Stack } from "@mui/material";
import AppointmentInformation from "./appointmentInformation";
import SelectAppointment from "./selectAppointment";

const AppointmentBookingMobile: React.FC<AppointmentBookingProps> = ({
  order,
  appointmentBookingId,
  minDate,
  maxDate,
}) => {
  return (
    <Stack divider={<Divider orientation="horizontal" flexItem />} spacing={3}>
      <Box m={3} mb={0}>
        <AppointmentInformation
          order={order}
          appointmentBookingId={appointmentBookingId}
        />
      </Box>
      <Box width={1}>
        <Box m={3} mt={0}>
          <SelectAppointment
            order={order}
            appointmentBookingId={appointmentBookingId}
            minDate={minDate}
            maxDate={maxDate}
          />
        </Box>
      </Box>
    </Stack>
  );
};

export default AppointmentBookingMobile;
