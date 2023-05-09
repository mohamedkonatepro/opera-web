import { nanoid } from "nanoid";
import { TenantFormValues } from "./types";

export const getDefaultTenant = (): TenantFormValues => ({
  id: nanoid(),
  lastname: "",
  firstname: "",
  email: "",
  phoneNumber: "",
});
