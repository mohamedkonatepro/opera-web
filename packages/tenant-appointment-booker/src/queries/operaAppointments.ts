import { ContactReason } from "@/components/home/appointmentInformation/contact/form/types";
import axios from "axios";
import { DateTime } from "luxon";

export const processContactForm = async ({
  reason,
  type,
  appointmentBookingId,
  newDesiredDate,
}: {
  reason: string;
  type: ContactReason;
  appointmentBookingId: string;
  newDesiredDate?: DateTime;
}) => {
  return axios.post(`/api/opera-appointments/process-contact-form`, {
    appointmentBookingId,
    reason,
    type,
    newDesiredDate: newDesiredDate ? newDesiredDate.toISODate() : undefined,
  });
};
