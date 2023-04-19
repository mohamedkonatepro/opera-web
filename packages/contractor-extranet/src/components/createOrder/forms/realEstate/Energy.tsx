import HeatingEnergyTypeSelect from "@/components/inputs/HeatingEnergyTypeSelect";
import HeatingTypeSelect from "@/components/inputs/HeatingTypeSelect";
import WaterHeatingEnergyTypeSelect from "@/components/inputs/WaterHeatingEnergyTypeSelect";
import WaterHeatingTypeSelect from "@/components/inputs/WaterHeatingTypeSelect";
import { Stack, Typography } from "@mui/material";

const Energy = () => {
  return (
    <Stack spacing={2}>
      <Typography variant="subtitle1">Type d'énergie</Typography>
      <Typography variant="subtitle2">Chauffage</Typography>
      <Stack spacing={2} direction="row">
        <HeatingEnergyTypeSelect />
        <HeatingTypeSelect />
      </Stack>
      <Typography variant="subtitle2">Eau chaude sanitaire</Typography>
      <Stack spacing={2} direction="row">
        <WaterHeatingEnergyTypeSelect />
        <WaterHeatingTypeSelect />
      </Stack>
    </Stack>
  );
};

export default Energy;
