import { isValidEmail } from "@/utils/isValidEmail";
import { Box, Stack, TextField, Typography } from "@mui/material";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";

interface FormProps {
  id: string;
  onChange: any;
  onSubmit: any;
  locataire: any;
}

const ModifyTenantFrom: React.FunctionComponent<FormProps> = (props) => {
  const { id, onChange, onSubmit, locataire } = props;
  const handleChange = (newValue: string) => {
    locataire.phoneNumber = newValue;
  };
  return (
    <Box id={id} component="form" onSubmit={onSubmit}>
      <Stack spacing={0.5} sx={{ ml: 0, mr: 4 }}>
        <Typography variant="h6">Modifier vos coordonnées</Typography>
        <Typography variant="body2" color="text.secondary">
          Modifier votre email ou votre numéro de téléphone.
        </Typography>
      </Stack>
      <Stack sx={{ mt: 3 }} spacing={2}>
        <TextField
          label="Email"
          type="Email"
          defaultValue={locataire.email}
          name="email"
          color="secondary"
          error={isValidEmail(locataire.email) == false}
          onChange={onChange}
          required
          InputLabelProps={{ shrink: true }}
        />
        <MuiTelInput
          label="Numéro de téléphone"
          name="phoneNumber"
          continents={["EU"]}
          defaultCountry="FR"
          error={!matchIsValidTel(locataire.phoneNumber)}
          placeholder="+33 6 12 34 56 78"
          color="secondary"
          value={locataire.phoneNumber}
          onChange={handleChange}
          required
        />
      </Stack>
    </Box>
  );
};

export default ModifyTenantFrom;
