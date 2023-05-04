export interface ContactFormProps {
  formId: string;
  onSubmit: (values: any) => void;
  contextValues: any;
  initialValues?: any;
}

export interface TenantsFormProps {
  tenants: any[];
  setTenants: (tenants: any[]) => void;
  prefixId?: string;
  title: string;
  errors?: [
    {
      lastname?: string;
      firstname?: string;
      socialReason?: string;
      email?: string;
      phoneNumber?: string;
    }
  ];
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
  showFiscalInvariant: boolean;
  errors?: {
    firstname?: string;
    lastname?: string;
    fiscalInvariant?: string;
    socialReason?: string;
  };
}

export interface ContractorFormProps {
  firstname: string;
  lastname: string;
  email: string;
  setFirstname: (firstname: string) => void;
  setLastname: (lastname: string) => void;
  setEmail: (email: string) => void;
}
