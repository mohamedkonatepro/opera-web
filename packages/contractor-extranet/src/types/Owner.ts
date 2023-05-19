interface Owner {
  id: number;
  firstname: string;
  lastname?: string;
  mobileNumber: string;
  landlineNumber?: string;
  email?: string;
  fiscalInvariant?: string;
  createdAt: string;
  updatedAt: string;
  companyName?: string;
}

export default Owner;
