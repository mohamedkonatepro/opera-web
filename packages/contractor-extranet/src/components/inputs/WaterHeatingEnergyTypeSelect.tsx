import { getWaterHeatingEnergyTypes } from "@/queries/waterHeatingEnergyTypes";
import { WaterHeatingEnergyType } from "@/types/WaterHeatingEnergyType";
import { MenuItem, Skeleton, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";

interface WaterHeatingEnergyTypeSelectProps {
  value?: WaterHeatingEnergyType;
  setValue: (value: WaterHeatingEnergyType) => void;
}

const WaterHeatingEnergyTypeSelect: FC<WaterHeatingEnergyTypeSelectProps> = ({
  value,
  setValue,
}) => {
  const {
    isLoading,
    error,
    data: waterHeatingEnergyTypes,
  } = useQuery({
    queryKey: ["waterHeatingEnergyTypes"],
    queryFn: getWaterHeatingEnergyTypes,
  });

  if (isLoading) {
    return (
      <Skeleton>
        <TextField fullWidth />
      </Skeleton>
    );
  }

  if (error || !waterHeatingEnergyTypes) {
    return <p>Erreur</p>;
  }

  return (
    <TextField
      id="water-heating-energy-type"
      label="Énergie Utilisée"
      color="secondary"
      select
      fullWidth
      value={value?.id?.toString() ?? ""}
      onChange={(event) => {
        const value = event.target.value.toString();
        const waterHeatingEnergyType = waterHeatingEnergyTypes.find(
          (waterHeatingEnergyType) =>
            waterHeatingEnergyType.id.toString() === value
        ) as WaterHeatingEnergyType;
        setValue(waterHeatingEnergyType);
      }}
    >
      {waterHeatingEnergyTypes.map((waterHeatingEnergyType) => (
        <MenuItem
          key={waterHeatingEnergyType.id}
          value={waterHeatingEnergyType.id}
          color="secondary"
        >
          {waterHeatingEnergyType.name}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default WaterHeatingEnergyTypeSelect;
