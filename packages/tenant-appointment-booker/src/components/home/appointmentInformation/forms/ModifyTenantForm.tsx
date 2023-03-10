import { isValidEmail } from "@/utils/isValidEmail";
import { Stack, TextField } from "@mui/material";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import { useState } from "react";
import { parsePhoneNumber } from "libphonenumber-js";

export interface TenantFormSubmitValues {
  phoneNumber: string;
  email: string;
}

interface FormProps {
  id: string;
  onSubmit: (values: TenantFormSubmitValues) => void;
  defaultValues: TenantFormSubmitValues;
}

const ModifyTenantForm: React.FunctionComponent<FormProps> = (props) => {
  const { id, onSubmit, defaultValues } = props;

  const [phoneNumber, setPhoneNumber] = useState(parsePhoneNumber(defaultValues.phoneNumber, "FR").formatInternational());
  const [email, setEmail] = useState(defaultValues.email);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onSubmit({ phoneNumber, email });
  };

  return (
    <Stack spacing={2.5} id={id} component="form" onSubmit={handleOnSubmit}>
      <TextField
        label="Email"
        type="email"
        name="email"
        color="secondary"
        error={!isValidEmail(email)}
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required
      />
      <MuiTelInput
        label="Numéro de téléphone"
        name="phoneNumber"
        defaultCountry="FR"
        error={!matchIsValidTel(phoneNumber)}
        color="secondary"
        value={phoneNumber}
        onChange={setPhoneNumber}
        required
      />
    </Stack>
  );
};

export default ModifyTenantForm;
