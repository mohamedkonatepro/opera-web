import { FC, useContext, useState } from "react";
import { ContactFormProps } from "./types";
import { Stack } from "@mui/material";
import RealEstateOwner from "./RealEstateOwner";
import Contractor from "./Contractor";
import Tenants from "./Tenants";
import schema from "./validationSchema";
import validateForm from "@/utils/validateForm";
import { ContractorContext } from "@/context/contractor";

const ContactForm: FC<ContactFormProps> = ({
  formId,
  onSubmit,
  contextValues = {},
}) => {
  const { contractor } = useContext(ContractorContext);
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

  const [errors, setErrors] = useState<any>({});

  const services =
    contextValues?.services?.map((service: any) => service.code) ?? [];
  const familyCode = contextValues?.family?.code ?? "";

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const values = {
      enteringTenants,
      leavingTenants,
      realEstateOwner: {
        firstname: realEstateOwnerFirstname,
        lastname: realEstateOwnerLastname,
        fiscalInvariant: realEstateOwnerFiscalInvariant,
        socialReason: realEstateOwnerSocialReason,
      },
      contractor: {
        id: contractor.id,
        customerReference: contractor.customerReference,
        firstname: contractorFirstname,
        lastname: contractorLastname,
        email: contractorEmail,
      },
    };

    const errors = await validateForm(schema, values, { familyCode });

    if (!errors) {
      setErrors({});
      onSubmit(values);
    } else {
      setErrors(errors);
    }
  };

  const showLeavingTenants = !services.some((service: any) =>
    ["EDL-E", "EDL-CAT"].includes(service)
  );
  const showEnteringTenants = services.some((service: any) =>
    ["EDL-E", "EDL-ES", "EDL-CAT"].includes(service)
  );

  const showFiscalInvariant = familyCode === "DIAG";

  return (
    <Stack spacing={5} component="form" id={formId} onSubmit={handleOnSubmit}>
      {showEnteringTenants && (
        <Tenants
          tenants={enteringTenants}
          setTenants={setEnteringTenants}
          title="Locataire Entrant"
          prefixId="entering-tenant"
          errors={errors.enteringTenants}
        />
      )}
      {showLeavingTenants && (
        <Tenants
          tenants={leavingTenants}
          setTenants={setLeavingTenants}
          title="Locataire Sortant"
          prefixId="leaving-tenant"
          errors={errors.leavingTenants}
        />
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
        showFiscalInvariant={showFiscalInvariant}
        errors={errors.realEstateOwner}
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
