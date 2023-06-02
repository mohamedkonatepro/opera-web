export interface AddressFormProps {
  address: string;
  city: string;
  postalCode: string;
  additionalAddress: string;
  setAddress: (address: string) => void;
  setCity: (city: string) => void;
  setPostalCode: (postalCode: string) => void;
  setAdditionalAddress: (additionalAddress: string) => void;
}

export interface ContractorFormProps {
  firstname: string;
  lastname: string;
  email: string;
  setFirstname: (firstname: string) => void;
  setLastname: (lastname: string) => void;
  setEmail: (email: string) => void;
}

export interface UnitFormProps {
  buildingReference: string;
  unitReference: string;
  mandateReference: string;
  leaseReference: string;
  buildingYear: string;
  setBuildingReference: (buildingReference: string) => void;
  setUnitReference: (unitReference: string) => void;
  setMandateReference: (mandateReference: string) => void;
  setLeaseReference: (leaseReference: string) => void;
  setBuildingYear: (buildingYear: string) => void;
}

export interface AnnexesFormProps {
  annexes: any[];
  setAnnexes: (annexes: any[]) => void;
}
