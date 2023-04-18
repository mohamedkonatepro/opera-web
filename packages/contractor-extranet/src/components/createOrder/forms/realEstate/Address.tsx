import { Stack, TextField, Typography } from "@mui/material"

const Address = () => {
  return (
    <Stack spacing={2}>
      <Typography variant="subtitle1">Adresse du bien</Typography>
      <TextField
        label="Adresse du bien"
        required
        inputProps={{ minLength: 1 }}
        color="secondary"
        fullWidth
      />
      <TextField
        label="Complément d'adresse"
        color="secondary"
        fullWidth
      />
      <Stack spacing={2} direction='row'>
        <TextField
          label="Code Postal"
          color="secondary"
          required
          inputProps={{ minLength: 5, maxLength: 5, pattern: "[0-9]{5}" }}
          fullWidth
        />
        <TextField
          label="Ville"
          color="secondary"
          required
          inputProps={{ minLength: 1 }}
          fullWidth
        />
      </Stack>
    </Stack>
  )
}

export default Address
