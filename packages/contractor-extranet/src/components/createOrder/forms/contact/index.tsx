import { FC, useState } from "react";
import { ContactFormProps } from "./types";
import { Stack } from "@mui/material";
import EnteringTenants from "./EnteringTenants";
import LeavingTenants from "./LeavingTenants";
import RealEstateOwner from "./RealEstateOwner";
import Contractor from "./Contractor";

const ContactForm: FC<ContactFormProps> = ({ formId, onSubmit, contextValues = {} }) => {
  const [enteringTenants, setEnteringTenants] = useState<any[]>([]);
  const [leavingTenants, setLeavingTenants] = useState<any[]>([]);

  // RealEstateOwner
  const [realEstateOwnerFirstname, setRealEstateOwnerFirstname] = useState("");
  const [realEstateOwnerLastname, setRealEstateOwnerLastname] = useState("");
  const [realEstateOwnerFiscalInvariant, setRealEstateOwnerFiscalInvariant] =
    useState("");
  const [realEstateOwnerSocialReason, setRealEstateOwnerSocialReason] =
    useState("");

  // Contractor
  const [contractorFirstname, setContractorFirstname] = useState("");
  const [contractorLastname, setContractorLastname] = useState("");
  const [contractorEmail, setContractorEmail] = useState("");

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    onSubmit({});
  };

  const services = contextValues?.services?.map((service: any) => service.code) ?? [];

  const showLeavingTenants = !services.some((service: any) => ["EDL-E", "EDL-CAT"].includes(service));
  const showEnteringTenants = services.some((service: any) => ["EDL-E", "EDL-ES", "EDL-CAT"].includes(service));

  return (
    <Stack spacing={5} component="form" id={formId} onSubmit={handleOnSubmit}>
      {showEnteringTenants &&
        <EnteringTenants
          tenants={enteringTenants}
          setTenants={setEnteringTenants}
        />
      }
      {showLeavingTenants && (
        <LeavingTenants tenants={leavingTenants} setTenants={setLeavingTenants} />
      )}
      <RealEstateOwner
        firstname={realEstateOwnerFirstname}
        setFirstname={setRealEstateOwnerFirstname}
        lastname={realEstateOwnerLastname}
        setLastname={setRealEstateOwnerLastname}
        fiscalInvariant={realEstateOwnerFiscalInvariant}
        setFiscalInvariant={setRealEstateOwnerFiscalInvariant}
        socialReason={realEstateOwnerSocialReason}
        setSocialReason={setRealEstateOwnerSocialReason}
      />
      <Contractor
        firstname={contractorFirstname}
        setFirstname={setContractorFirstname}
        lastname={contractorLastname}
        setLastname={setContractorLastname}
        email={contractorEmail}
        setEmail={setContractorEmail}
      />
    </Stack>
  );
};

export default ContactForm;
