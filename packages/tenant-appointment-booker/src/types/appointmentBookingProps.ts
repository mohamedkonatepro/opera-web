import Order from "./order";

interface AppointmentBookingProps {
  order: Order;
  appointmentBookingId: string;
  minDate: string;
  maxDate: string;
}

export default AppointmentBookingProps;
