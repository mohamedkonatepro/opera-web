import { ContactReason } from "@/components/home/appointmentInformation/contact/form/types";
import axios from "axios";
import { DateTime } from "luxon";

export const sendNoteToUpdateRealEstateInformation = async ({
  note,
  orderId,
}: {
  note: string;
  orderId: string;
}) => {
  return axios.post(`/api/opera-orders/${orderId}/send-note`, {
    note,
  });
};

export const sendNoteContactForm = async ({
  reason,
  type,
  orderId,
  newDesiredDate,
}: {
  reason: string;
  type: ContactReason;
  orderId: string;
  newDesiredDate?: DateTime;
}) => {
  console.log(type);
  return axios.post(`/api/opera-orders/${orderId}/send-note-contact-form`, {
    reason,
    type,
    newDesiredDate: newDesiredDate ? newDesiredDate.toISODate() : undefined,
  });
};
