export interface Owner {
  id: number;
  attributes: {
    firstname: string;
    lastname: string | null;
    mobileNumber: string | null;
    landlineNumber: string | null;
    email: string | null;
    fiscalInvariant: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

export interface OwnerResponse {
  data: Owner;
}
