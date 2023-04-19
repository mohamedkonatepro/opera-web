import { getWaterHeatingEnergyTypes } from "@/queries/waterHeatingEnergyTypes";
import { MenuItem, Skeleton, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

const WaterHeatingEnergyTypeSelect = () => {
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
      id="waterHeatingEnergyType"
      label="Énergie Utilisée"
      color="secondary"
      select
      fullWidth
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
