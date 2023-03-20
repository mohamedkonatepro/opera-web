import Order from "@/types/order";
import { Divider, Stack } from "@mui/material";
import Contact from "./contact";
import Information from "./information";
import TenantRequestProps from "@/types/tenantResquestProps";

interface AppointmentInformationProps {
  order: Order;
  appointmentBookingId: string;
  tenantRequest: TenantRequestProps;
}

const AppointmentInformation: React.FunctionComponent<
  AppointmentInformationProps
> = ({ order, appointmentBookingId, tenantRequest }) => {
  return (
    <Stack spacing={3} divider={<Divider orientation="horizontal" flexItem />}>
      <Information order={order} appointmentBookingId={appointmentBookingId} tenantRequest={tenantRequest} />
      { !tenantRequest && (<Contact order={order} appointmentBookingId={appointmentBookingId} />)}
    </Stack>
  );
};

export default AppointmentInformation;
