import { FC, useContext, useState } from "react";
import { ContactFormProps } from "./types";
import { Stack } from "@mui/material";
import RealEstateOwner from "./RealEstateOwner";
import Contractor from "./Contractor";
import Tenants from "./Tenants";
import schema from "./validationSchema";
import validateForm from "@/utils/validateForm";
import { ContractorContext } from "@/context/contractor";
import { getDefaultTenant } from "./utils";

const ContactForm: FC<ContactFormProps> = ({
  formId,
  onSubmit,
  contextValues = {},
  initialValues = {},
}) => {
  const services =
    contextValues?.services?.map((service: any) => service.code) ?? [];

  const showLeavingTenants = !services.some((service: any) =>
    ["EDL-E", "EDL-CAT"].includes(service)
  );
  const showEnteringTenants = services.some((service: any) =>
    ["EDL-E", "EDL-ES", "EDL-CAT"].includes(service)
  );

  const isDiag = contextValues?.family?.code === "DIAG";

  const { contractor } = useContext(ContractorContext);
  const [enteringTenants, setEnteringTenants] = useState<any[]>(
    showEnteringTenants
      ? initialValues?.enteringTenants ?? [getDefaultTenant()]
      : []
  );
  const [leavingTenants, setLeavingTenants] = useState<any[]>(
    showLeavingTenants && !isDiag
      ? initialValues?.leavingTenants ?? [getDefaultTenant()]
      : []
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

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const values = {
      enteringTenants: showEnteringTenants ? enteringTenants : [],
      leavingTenants: showLeavingTenants ? leavingTenants : [],
      realEstateOwner: {
        id: initialValues?.realEstateOwner?.id ?? "",
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

    const errors = await validateForm(schema, values, {
      isDiag,
      showEnteringTenants,
      showLeavingTenants,
    });

    if (!errors) {
      setErrors({});
      onSubmit(values);
    } else {
      setErrors(errors);
    }
  };

  return (
    <Stack spacing={5} component="form" id={formId} onSubmit={handleOnSubmit}>
      {showEnteringTenants && (
        <Tenants
          tenants={enteringTenants}
          setTenants={setEnteringTenants}
          title="Locataire Entrant"
          prefixId="entering-tenant"
          errors={errors.enteringTenants}
          canDelete={showEnteringTenants && enteringTenants.length > 1}
        />
      )}
      {showLeavingTenants && (
        <Tenants
          tenants={leavingTenants}
          setTenants={setLeavingTenants}
          title="Locataire Sortant"
          prefixId="leaving-tenant"
          errors={errors.leavingTenants}
          canDelete={
            (showLeavingTenants && leavingTenants.length > 1) || isDiag
          }
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
        showFiscalInvariant={isDiag}
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
