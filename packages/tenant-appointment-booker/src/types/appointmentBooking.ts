import Order from "./order";
import Appointment from "./appointment";

interface AppointmentBooking {
  order: Order;
  id: string;
  appointment?: Appointment;
  uuid: string;
}

export default AppointmentBooking;
