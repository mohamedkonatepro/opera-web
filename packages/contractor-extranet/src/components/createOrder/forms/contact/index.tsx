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
  initialValues = {},
}) => {
  const { contractor } = useContext(ContractorContext);
  const [enteringTenants, setEnteringTenants] = useState<any[]>(
    initialValues?.enteringTenants ?? []
  );
  const [leavingTenants, setLeavingTenants] = useState<any[]>(
    initialValues?.leavingTenants ?? []
  );

  // RealEstateOwner
  const [realEstateOwnerFirstname, setRealEstateOwnerFirstname] = useState(
    initialValues?.realEstateOwner?.firstname ?? ""
  );
  const [realEstateOwnerLastname, setRealEstateOwnerLastname] = useState(
    initialValues?.realEstateOwner?.lastname ?? ""
  );
  const [realEstateOwnerFiscalInvariant, setRealEstateOwnerFiscalInvariant] =
    useState(initialValues?.realEstateOwner?.fiscalInvariant ?? "");
  const [realEstateOwnerSocialReason, setRealEstateOwnerSocialReason] =
    useState(initialValues?.realEstateOwner?.socialReason ?? "");

  // Contractor
  const [contractorFirstname, setContractorFirstname] = useState(
    initialValues?.contractor?.firstname ?? ""
  );
  const [contractorLastname, setContractorLastname] = useState(
    initialValues?.contractor?.lastname ?? ""
  );
  const [contractorEmail, setContractorEmail] = useState(
    initialValues?.contractor?.email ?? ""
  );

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
