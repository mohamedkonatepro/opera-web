import { Stack, TextField, Typography } from "@mui/material"

const RealEstate = () => {
  return (
    <Stack spacing={2}>
      <Typography variant="subtitle1">Détails du bien</Typography>
      <Stack spacing={2} direction="row">
        <TextField
          label="Type"
          color="secondary"
          required
          select
          fullWidth
        />
        <TextField
          label="Étage"
          color="secondary"
          select
          fullWidth
          required
        />
        <TextField
          label="Usage"
          color="secondary"
          select
          fullWidth
        />
        <TextField
          label="Surface"
          color="secondary"
          required
          fullWidth
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        />
      </Stack>
      <Stack spacing={2} direction="row">
        <TextField
          label="Nombre de pièces"
          color="secondary"
          required
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          fullWidth
        />
        <TextField
          label="Digicode"
          color="secondary"
          fullWidth
        />
      </Stack>
      <TextField
        label="Informations complémentaires"
        color="secondary"
        fullWidth
      />
  </Stack>
  )
}

export default RealEstate
