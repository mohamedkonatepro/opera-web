import Appointment from "@/types/appointment";
import { DateTime } from "luxon";
import mockOrder from "./order";

const appointment: Appointment = {
  id: 1,
  order: mockOrder,
  slot: {
    datetime: DateTime.local(2023, 3, 23, 10, 0).toISO(),
    duration: 60,
    appointment_date: "2023-03-23",
  },
};

export default appointment;
