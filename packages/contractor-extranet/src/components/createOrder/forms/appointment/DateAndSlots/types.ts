import { MovingZone } from "@/types/MovingZone";
import { DateTime } from "luxon";

export interface DateAndSlotsProps {
  zone: string;
  handleChangeDate: (date?: DateTime) => void;
  key: string;
  date?: DateTime;
}
