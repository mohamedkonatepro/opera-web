interface Slot {
  id: string;
  appointment_date: string;
  orderId: string;
  duration: number;
  endTimeSlotOfAppointment: string;
  estimatedEndTimeSlotOfAppointment: string;
  operatorId: string;
  priorite: number;
  stamp: string;
  startTimeSlotOfAppointment: string;
  datetime: string;
}

export default Slot;
