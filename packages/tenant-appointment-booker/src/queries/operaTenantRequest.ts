import axios from "axios";

export interface TenantRequestAction {
  appointmentBookingId: string;
  orderId: string;
}

export const cancelTenantRequest = async ({
  appointmentBookingId,
  orderId,
}: TenantRequestAction) => {
  return axios.post(`/api/opera-orders/${orderId}/cancel-tenant-request`, {
    appointmentBookingId,
  });
};

export const confirmTenantRequest = async ({
  appointmentBookingId,
  orderId,
}: TenantRequestAction) => {
  return axios.post(`/api/opera-orders/${orderId}/confirm-tenant-request`, {
    appointmentBookingId,
  });
};
