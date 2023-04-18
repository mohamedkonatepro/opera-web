export interface Tenant {
  id: number;
  attributes: {
    firstname: string;
    lastname: string;
    email: string;
    entryDate: string;
    mobileNumber: string;
    landlineNumber: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface TenantResponse {
  data: Tenant[];
}