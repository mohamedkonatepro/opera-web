import { getHeatingEnergyTypes } from "@/queries/heatingEnergyTypes";
import { HeatingEnergyType } from "@/types/HeatingEnergyType";
import { MenuItem, Skeleton, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";

interface HeatingEnergyTypeSelectProps {
  value?: HeatingEnergyType;
  setValue: (value: HeatingEnergyType) => void;
}

const HeatingEnergyTypeSelect: FC<HeatingEnergyTypeSelectProps> = ({
  value,
  setValue,
}) => {
  const {
    isLoading,
    error,
    data: heatingEnergyTypes,
  } = useQuery({
    queryKey: ["heatingEnergyTypes"],
    queryFn: getHeatingEnergyTypes,
  });

  if (isLoading) {
    return (
      <Skeleton>
        <TextField fullWidth />
      </Skeleton>
    );
  }

  if (error || !heatingEnergyTypes) {
    return <p>Erreur</p>;
  }

  return (
    <TextField
      id="heating-energy-type"
      label="Énergie utilisée"
      color="secondary"
      select
      fullWidth
      value={value?.id?.toString() ?? ""}
      onChange={(event) => {
        const value = event.target.value.toString();
        const heatingEnergyType = heatingEnergyTypes.find((heatingEnergyType) => heatingEnergyType.id.toString() === value) as HeatingEnergyType;
        setValue(heatingEnergyType);
      }}
    >
      {heatingEnergyTypes.map((heatingEnergyType) => (
        <MenuItem
          key={heatingEnergyType.id}
          value={heatingEnergyType.id}
          color="secondary"
        >
          {heatingEnergyType.name}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default HeatingEnergyTypeSelect;
