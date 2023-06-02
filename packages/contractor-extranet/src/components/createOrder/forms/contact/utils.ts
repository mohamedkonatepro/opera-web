import { nanoid } from "nanoid";
import { TenantFormValues } from "./types";
import Tenant from "@/types/Tenant";

export const getDefaultTenant = (): TenantFormValues => ({
  id: nanoid(),
  lastname: "",
  firstname: "",
  email: "",
  phoneNumber: "",
});

export const transformIncomingTenants = (tenants: Tenant[]): TenantFormValues[] => {
  if (!tenants) {
    return []
  }
  return tenants
    .filter((tenant) => tenant.tenant_type.code === "incoming")
    .map((tenant) => {
      const { mobileNumber, id, ...rest } = tenant;
      return { phoneNumber: mobileNumber, id: id.toString(), ...rest };
    });
};
