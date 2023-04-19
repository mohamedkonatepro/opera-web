import { getHeatingEnergyTypes } from "@/queries/heatingEnergyTypes";
import { MenuItem, Skeleton, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

const HeatingEnergyTypeSelect = () => {
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
      id="heatingEnergyType"
      label="Énergie utilisée"
      color="secondary"
      select
      fullWidth
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
