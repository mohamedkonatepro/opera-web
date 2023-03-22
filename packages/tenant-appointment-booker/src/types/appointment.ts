import Order from "./order";
import Slot from "./slot";

interface Appointment {
  id: number;
  order: Order;
  slot?: Slot;
}

export default Appointment;
