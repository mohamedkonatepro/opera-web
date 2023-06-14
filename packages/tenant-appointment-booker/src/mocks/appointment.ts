import { DateTime } from "luxon";
import mockOrder from "./order";
import Appointment from "../types/appointment";

const appointment: Appointment = {
  id: 1,
  order: mockOrder,
  slot: {
    datetime: DateTime.local(2023, 3, 23, 10, 0).toISO(),
    duration: 60,
    appointment_date: "2023-03-23",
    id: "1",
    orderId: mockOrder.orderId,
    stamp: "2021-03-23T10:00:00.000Z",
    priorite: 2,
    operatorId: "VVA",
    startTimeSlotOfAppointment: "10:00",
    endTimeSlotOfAppointment: "11:00",
    estimatedEndTimeSlotOfAppointment: "11:00",
  },
};

export default appointment;
