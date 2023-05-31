import TenantType from "./TenantType";

interface Tenant {
  id: number;
  firstname: string;
  lastname: string;
  companyName: string;
  email: string;
  entryDate: string;
  mobileNumber: string;
  landlineNumber: string;
  tenant_type: TenantType;
  createdAt: string;
  updatedAt: string;
}

export default Tenant;
