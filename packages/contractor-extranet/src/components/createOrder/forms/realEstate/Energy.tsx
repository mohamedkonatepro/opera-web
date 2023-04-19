import { Stack, TextField, Typography } from "@mui/material";

const Energy = () => {
  return (
    <Stack spacing={2}>
      <Typography variant="subtitle1">Type d'énergie</Typography>
      <Typography variant="subtitle2">Chauffage</Typography>
      <Stack spacing={2} direction="row">
        <TextField
          label="Énergie utilisée"
          color="secondary"
          select
          fullWidth
        />
        <TextField
          label="Type de compteur"
          color="secondary"
          select
          fullWidth
        />
      </Stack>
      <Typography variant="subtitle2">Eau chaude sanitaire</Typography>
      <Stack spacing={2} direction="row">
        <TextField
          label="Énergie utilisée"
          color="secondary"
          select
          fullWidth
        />
        <TextField
          label="Type de compteur"
          color="secondary"
          select
          fullWidth
        />
      </Stack>
    </Stack>
  );
};

export default Energy;
