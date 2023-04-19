import { Stack, TextField, Typography } from "@mui/material";

const Unit = () => {
  return (
    <Stack spacing={2}>
      <Typography variant="subtitle1">Informations du lot</Typography>
      <Stack spacing={2} direction="row">
        <TextField label="Référence immeuble" color="secondary" fullWidth />
        <TextField label="N° de lot" color="secondary" fullWidth />
        <TextField label="Mandat" color="secondary" fullWidth />
        <TextField label="Code bail" color="secondary" fullWidth />
        <TextField label="Année construction" color="secondary" fullWidth />
      </Stack>
    </Stack>
  );
};

export default Unit;
