import Order from "@/types/order";
import { Divider, Stack } from "@mui/material";
import Contact from "./contact";
import Information from "./information";

interface AppointmentInformationProps {
  order: Order;
  appointmentBookingId: string;
}

const AppointmentInformation: React.FunctionComponent<
  AppointmentInformationProps
> = ({ order, appointmentBookingId }) => {
  return (
    <Stack spacing={3} divider={<Divider orientation="horizontal" flexItem />}>
      <Information order={order} />
      <Contact order={order} appointmentBookingId={appointmentBookingId} />
    </Stack>
  );
};

export default AppointmentInformation;
