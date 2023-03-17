import Appointment from "@/types/appointment";
import { DateTime } from "luxon";
import mockOrder from "./order";

const appointment: Appointment = {
  id: 1,
  order: mockOrder,
  slot: {
    datetime: DateTime.local(2023, 3, 23, 10, 0).toISO(),
    duration: 60,
  },
};

export default appointment;
