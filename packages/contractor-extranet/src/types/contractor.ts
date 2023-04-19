interface Contractor {
  id: number;
  customerReference: string;
  name: string;
  address: string;
  additionalAddress: string;
  postalCode: string;
  city: string;
  mobileNumber: string;
  landlineNumber: string | null;
  siren: string;
  vatIntracommunity: string;
  agencyReference: string;
  accountingReference: string;
  accountingReferenceSecondary: string | null;
  groupReference: string;
  earlyExitDeadline: number;
  particularity: string;
  observationEdl: string;
  observationDiag: string;
  creationDate: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export default Contractor;
