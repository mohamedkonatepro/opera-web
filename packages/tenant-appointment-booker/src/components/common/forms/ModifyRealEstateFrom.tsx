import { Box, Stack, TextField, Typography } from "@mui/material";
interface FormProps {
  id: string;
  onChange: any;
  onSubmit: any;
}

const ModifyRealEstateForm: React.FunctionComponent<FormProps> = (props) => {
  const { id, onChange, onSubmit } = props;
  return (
    <Box id={id} component="form" onSubmit={onSubmit}>
      <Stack spacing={0.5}>
        <Typography variant="h6">Modifier les informations du bien</Typography>
        <Typography variant="body2" color="text.secondary">
          Modifier l&apos;adresse, le type de bien, l&apos;étage ou le digicode.
        </Typography>
      </Stack>
      <Stack sx={{ mt: 3 }}>
        <TextField
          label="Votre message"
          placeholder="Votre message..."
          name="informationsBien"
          color="secondary"
          onChange={onChange}
          multiline
          required
          InputLabelProps={{ shrink: true }}
        />
      </Stack>
    </Box>
  );
};

export default ModifyRealEstateForm;
