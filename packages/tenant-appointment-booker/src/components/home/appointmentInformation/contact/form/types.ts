import Order from "@/types/order";
import { DateTime } from "luxon";

export enum ContactReason {
  NOT_AVAILABLE_AT_DATES = "NOT_AVAILABLE_AT_DATES",
  CANCEL_APPOINTMENT = "CANCEL_APPOINTMENT",
}

export interface ContactFormSubmitValues {
  newDesiredDate?: DateTime;
  reason: string;
}

export interface ContactFormSubmitValuesWithType {
  newDesiredDate?: DateTime;
  reason: string;
  type: ContactReason;
}

export interface ContactFormProps {
  id: string;
  order: Order;
  disabled: boolean;
  onSubmit: (values: ContactFormSubmitValuesWithType) => void;
  setFormIsValid: (isValid: boolean) => void;
}

export interface NotAvailableAtDatesProps {
  expanded: boolean;
  order: Order;
  formId: string;
  disabled: boolean;
  onSubmit: (values: ContactFormSubmitValues) => void;
  onChange: () => void;
  setFormIsValid: (isValid: boolean) => void;
}

export interface CancelAppointmentProps {
  expanded: boolean;
  formId: string;
  order: Order;
  onSubmit: (values: ContactFormSubmitValues) => void;
  onChange: () => void;
  setFormIsValid: (isValid: boolean) => void;
}

export interface ChangeDesiredAppointmentDateAlertProps {
  newDesiredDate?: DateTime;
  order: Order;
  type: ContactReason;
}
