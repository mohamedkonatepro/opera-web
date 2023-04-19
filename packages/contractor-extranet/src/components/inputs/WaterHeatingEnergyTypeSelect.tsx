import { getWaterHeatingEnergyTypes } from "@/queries/waterHeatingEnergyTypes";
import { MenuItem, Skeleton, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";

interface WaterHeatingEnergyTypeSelectProps {
  value: string;
  setValue: (value: string) => void;
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
      value={value}
      onChange={(event) => setValue(event.target.value)}
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
