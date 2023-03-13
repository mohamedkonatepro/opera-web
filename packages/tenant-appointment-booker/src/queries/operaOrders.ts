import Tenant from "@/types/tenant";
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

export const updateTenantInformations = async ({
  locataire,
  orderId,
}: {
  locataire: Tenant;
  orderId: string;
}) => {
  return axios.put(`/api/opera-orders/${orderId}/update-tenant`, {
    locataire,
  });
};
