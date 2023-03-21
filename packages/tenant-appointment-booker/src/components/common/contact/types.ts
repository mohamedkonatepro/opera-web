import AppointmentBooking from "@/types/appointmentBooking";
import Order from "@/types/order";
import { ContactFormSubmitValuesWithType } from "./form/types";

export interface ContactProps {
  appointmentBooking: AppointmentBooking;
}

export interface ContactDialogProps {
  open: boolean;
  order: Order;
  disabled: boolean;
  onClose: () => void;
  onSubmit: (values: ContactFormSubmitValuesWithType) => void;
}

export interface AppointmentTooLateDialogProps {
  open: boolean;
  onClose: () => void;
  appointmentBooking: AppointmentBooking;
}
