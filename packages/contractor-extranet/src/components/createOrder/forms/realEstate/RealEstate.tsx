import FloorSelect from "@/components/inputs/FloorSelect";
import PurposeSelect from "@/components/inputs/PurposeSelect";
import RealEstateTypeSelect from "@/components/inputs/RealEstateTypeSelect";
import { Stack, TextField, Typography } from "@mui/material";

const RealEstate = () => {
  return (
    <Stack spacing={2}>
      <Typography variant="subtitle1">Détails du bien</Typography>
      <Stack spacing={2} direction="row">
        <RealEstateTypeSelect />
        <FloorSelect />
        <PurposeSelect />
        <TextField
          label="Surface"
          color="secondary"
          required
          fullWidth
          inputProps={{
            inputMode: "numeric",
            pattern: "^(?:0|[1-9]d*)(?:.d+)?$",
          }}
        />
      </Stack>
      <Stack spacing={2} direction="row">
        <TextField
          label="Nombre de pièces"
          color="secondary"
          required
          inputProps={{ inputMode: "numeric", pattern: "^d+$" }}
          fullWidth
        />
        <TextField label="Digicode" color="secondary" fullWidth />
      </Stack>
      <TextField
        label="Informations complémentaires"
        color="secondary"
        fullWidth
      />
    </Stack>
  );
};

export default RealEstate;
