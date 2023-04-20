export interface ContactFormProps {
  formId: string;
  onSubmit: (values: any) => void;
  contextValues: any;
}

export interface EnteringTenantsFormProps {
  tenants: any[];
  setTenants: (tenants: any[]) => void;
}

export interface LeavingTenantsFormProps {
  tenants: any[];
  setTenants: (tenants: any[]) => void;
}

export interface RealEstateOwnerFormProps {
  firstname: string;
  lastname: string;
  fiscalInvariant: string;
  socialReason: string;
  setFirstname: (firstname: string) => void;
  setLastname: (lastname: string) => void;
  setFiscalInvariant: (fiscalInvariant: string) => void;
  setSocialReason: (socialReason: string) => void;
}

export interface ContractorFormProps {
  firstname: string;
  lastname: string;
  email: string;
  setFirstname: (firstname: string) => void;
  setLastname: (lastname: string) => void;
  setEmail: (email: string) => void;
}
