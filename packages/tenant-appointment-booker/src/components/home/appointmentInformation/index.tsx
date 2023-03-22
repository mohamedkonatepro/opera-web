import AppointmentBooking from "@/types/appointmentBooking";
import { Divider, Stack } from "@mui/material";
import Contact from "./contact";
import Information from "./information";
import TenantRequestProps from "@/types/tenantResquestProps";

interface AppointmentInformationProps {
  appointmentBooking: AppointmentBooking;
  tenantRequest?: TenantRequestProps;
}

const AppointmentInformation: React.FunctionComponent<
  AppointmentInformationProps
> = ({ appointmentBooking, tenantRequest }) => {
  return (
    <Stack spacing={3} divider={<Divider orientation="horizontal" flexItem />}>
      <Information
        order={appointmentBooking.order}
        appointmentBookingId={appointmentBooking.id}
        tenantRequest={tenantRequest}
      />
      { !tenantRequest && (<Contact appointmentBooking={appointmentBooking} />)}
    </Stack>
  );
};

export default AppointmentInformation;
