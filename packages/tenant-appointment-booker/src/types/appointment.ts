import Order from "./order";

interface Appointment {
  id: number;
  order: Order;
  slot: {
    datetime: string;
  };
}

export default Appointment;
