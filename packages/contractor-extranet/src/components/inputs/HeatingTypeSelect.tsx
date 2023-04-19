import { getHeatingTypes } from "@/queries/heatingTypes";
import { MenuItem, Skeleton, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

const HeatingTypeSelect = () => {
  const {
    isLoading,
    error,
    data: heatingTypes,
  } = useQuery({ queryKey: ["heatingTypes"], queryFn: getHeatingTypes });

  if (isLoading) {
    return (
      <Skeleton>
        <TextField fullWidth />
      </Skeleton>
    );
  }

  if (error || !heatingTypes) {
    return <p>Erreur</p>;
  }

  return (
    <TextField
      id="heatingType"
      label="Énergie utilisée"
      color="secondary"
      select
      fullWidth
    >
      {heatingTypes.map((heatingType) => (
        <MenuItem key={heatingType.id} value={heatingType.id} color="secondary">
          {heatingType.name}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default HeatingTypeSelect;
