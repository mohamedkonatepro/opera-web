import { isValidEmail } from "@/utils/isValidEmail";
import { Stack, TextField } from "@mui/material";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import { useState } from "react";
import Tenant from "@/types/tenant";

interface FormProps {
  id: string;
  onSubmit: (data: Tenant) => void;
  defaultValues: Tenant;
}

const ModifyTenantForm: React.FunctionComponent<FormProps> = (props) => {
  const { id, onSubmit, defaultValues } = props;
  const [tenant, setTenant] = useState(defaultValues);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (isValidEmail(tenant.email) && matchIsValidTel(tenant.phoneNumber))
      onSubmit(tenant);
  };

  return (
    <Stack spacing={2.5} id={id} component="form" onSubmit={handleOnSubmit}>
      <TextField
        label="Email"
        type="email"
        name="email"
        color="secondary"
        error={!isValidEmail(tenant.email)}
        onChange={(e) => setTenant({ ...tenant, email: e.target.value })}
        value={tenant.email}
        required
      />
      <MuiTelInput
        label="Numéro de téléphone"
        name="phoneNumber"
        defaultCountry="FR"
        error={!matchIsValidTel(tenant.phoneNumber)}
        color="secondary"
        value={tenant.phoneNumber}
        onChange={(value) => setTenant({ ...tenant, phoneNumber: value })}
        required
      />
    </Stack>
  );
};

export default ModifyTenantForm;
