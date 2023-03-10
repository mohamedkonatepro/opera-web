import axios from "axios";

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
