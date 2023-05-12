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
