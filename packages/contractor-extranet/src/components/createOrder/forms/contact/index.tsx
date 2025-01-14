import { FC, useContext, useState } from "react";
import { ContactFormProps } from "./types";
import { Stack } from "@mui/material";
import RealEstateOwner from "./RealEstateOwner";
import Contractor from "../../../common/form/Contractor";
import Tenants from "./Tenants";
import schema from "./validationSchema";
import validateForm from "@/utils/validateForm";
import { getDefaultTenant } from "./utils";
import { UserContext } from "@/context/user";

const ContactForm: FC<ContactFormProps> = ({
  formId,
  onSubmit,
  contextValues = {},
  initialValues = {},
}) => {
  const userContext = useContext(UserContext);
  const services =
    contextValues?.services?.map((service: any) => service.code) ?? [];

  const showLeavingTenants = !services.some((service: any) =>
    ["EDL-E", "EDL-CAT"].includes(service)
  );
  const showEnteringTenants = services.some((service: any) =>
    ["EDL-E", "EDL-ES", "EDL-CAT"].includes(service)
  );

  const isDiag = contextValues?.family?.code === "DIAG";

  const completeLeavingTenantFields = services.some((service: any) =>
    ["EDL-S", "EDL-ES", "EDL-PVS", "EDL-CS"].includes(service)
  );

  const completeEnteringTenantFields = services.some((service: any) =>
    ["EDL-CAT"].includes(service)
  );

  const [enteringTenants, setEnteringTenants] = useState<any[]>(
    completeEnteringTenantFields
      ? initialValues?.enteringTenants ?? [getDefaultTenant()]
      : [getDefaultTenant()]
  );
  const [leavingTenants, setLeavingTenants] = useState<any[]>(
    completeLeavingTenantFields || isDiag
      ? initialValues?.leavingTenants ?? [getDefaultTenant()]
      : [getDefaultTenant()]
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
        id: userContext.user.contractor.id,
        customerReference: userContext.user.contractor.customerReference,
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
  const titleTenant = isDiag ? "Locataire en place" : "Locataire Sortant";
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
          title={titleTenant}
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
