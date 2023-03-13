import AppointmentBookingProps from "@/types/appointmentBookingProps";
import Order from "@/types/order";
import { Box, Divider, Stack } from "@mui/material";
import AppointmentInformation from "./appointmentInformation";
import SelectAppointment from "./selectAppointment";

const AppointmentBookingDesktop: React.FC<AppointmentBookingProps> = ({
  order,
  appointmentBookingId,
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
          <AppointmentInformation order={order} />
        </Box>
      </Box>
      <Box width={1}>
        <Box m={3} ml={0}>
          <Box width={356}>
            <SelectAppointment
              order={order}
              appointmentBookingId={appointmentBookingId}
              minDate={minDate}
              maxDate={maxDate}
            />
          </Box>
        </Box>
      </Box>
    </Stack>
  );
};

export default AppointmentBookingDesktop;
