export interface ContactFormProps {
  formId: string;
  onSubmit: (values: any) => void;
  contextValues: any;
  initialValues?: {
    enteringTenants?: TenantFormValues[];
    leavingTenants?: TenantFormValues[];
    realEstateOwner?: {
      id?: string;
      lastname?: string;
      firstname?: string;
      fiscalInvariant?: string;
      socialReason?: string;
    };
    contractor?: {
      lastname?: string;
      firstname?: string;
      email?: string;
    };
  };
}

export interface TenantFormValues {
  lastname?: string;
  firstname?: string;
  email?: string;
  phoneNumber?: string;
  id?: string;
  socialReason?: string;
}
export interface TenantsFormProps {
  tenants: TenantFormValues[];
  setTenants: (tenants: TenantFormValues[]) => void;
  prefixId?: string;
  title: string;
  canDelete?: boolean;
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
