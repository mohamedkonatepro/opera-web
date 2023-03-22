import Order from "./order";

interface Appointment {
  id: number;
  order: Order;
  slot: {
    datetime: string;
    duration: number;
    appointment_date: string;
  };
}

export default Appointment;
