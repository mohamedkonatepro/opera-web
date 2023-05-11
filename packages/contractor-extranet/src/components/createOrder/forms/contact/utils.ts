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

export const getInitialTenant = (tenants: Tenant[]): any[] => {
  if (!tenants || tenants?.length === 0) {
    return []
  }

  return tenants.map((tenant) => ({
    id: tenant.id,
    firstname: tenant.firstname ?? "",
    lastname: tenant.lastname ?? "",
    socialReason: tenant.companyName ?? "",
    email: tenant.email ?? "",
    phoneNumber: tenant.mobileNumber ?? "",
  }))
};