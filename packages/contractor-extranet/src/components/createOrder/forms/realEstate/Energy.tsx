import HeatingEnergyTypeSelect from "@/components/inputs/HeatingEnergyTypeSelect";
import HeatingTypeSelect from "@/components/inputs/HeatingTypeSelect";
import WaterHeatingEnergyTypeSelect from "@/components/inputs/WaterHeatingEnergyTypeSelect";
import WaterHeatingTypeSelect from "@/components/inputs/WaterHeatingTypeSelect";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { EnergyFormProps } from "./types";

const Energy: FC<EnergyFormProps> = ({
  heatingEnergyType,
  heatingType,
  waterHeatingEnergyType,
  waterHeatingType,
  setHeatingEnergyType,
  setHeatingType,
  setWaterHeatingEnergyType,
  setWaterHeatingType,
  required
}) => {
  return (
    <Stack spacing={2}>
      <Typography variant="subtitle1">Type d&#39;énergie</Typography>
      <Typography variant="subtitle2">Chauffage</Typography>
      <Stack spacing={2} direction="row">
        <HeatingEnergyTypeSelect
          value={heatingEnergyType}
          setValue={setHeatingEnergyType}
        />
        <HeatingTypeSelect value={heatingType} setValue={setHeatingType} required={required.heatingType} />
      </Stack>
      <Typography variant="subtitle2">Eau chaude sanitaire</Typography>
      <Stack spacing={2} direction="row">
        <WaterHeatingEnergyTypeSelect
          value={waterHeatingEnergyType}
          setValue={setWaterHeatingEnergyType}
        />
        <WaterHeatingTypeSelect
          value={waterHeatingType}
          setValue={setWaterHeatingType}
          required={required.waterHeatingType}
        />
      </Stack>
    </Stack>
  );
};

export default Energy;
