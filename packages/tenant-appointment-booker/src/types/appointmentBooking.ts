import Order from "./order";
import Appointment from "./appointment";
import TenantRequestProps from "./tenantResquestProps";

interface AppointmentBooking {
  order: Order;
  id: string;
  appointment?: Appointment;
  uuid: string;
  tenant_request?: TenantRequestProps;
}

export default AppointmentBooking;
