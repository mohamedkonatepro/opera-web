import { MovingZone } from "@/types/MovingZone";
import Slot from "@/types/Slot";
import { DateTime } from "luxon";

export interface DateAndSlotsProps {
  zone: string;
  handleChangeDate: (date?: DateTime) => void;
  keyType: string;
  date?: DateTime;
  selectedAppointmentDate?: DateTime;
  handleSelectAppointmentDate: (date: DateTime) => void;
  selectedSlot?: Slot;
  handleSelectSlot: (slot: Slot) => void;
  contextValues: any;
}
