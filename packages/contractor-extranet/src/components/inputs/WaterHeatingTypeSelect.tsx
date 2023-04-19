import { getWaterHeatingTypes } from "@/queries/waterHeatingTypes";
import { MenuItem, Skeleton, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

const WaterHeatingTypeSelect = () => {
  const {
    isLoading,
    error,
    data: waterHeatingTypes,
  } = useQuery({
    queryKey: ["waterHeatingTypes"],
    queryFn: getWaterHeatingTypes,
  });

  if (isLoading) {
    return (
      <Skeleton>
        <TextField fullWidth />
      </Skeleton>
    );
  }

  if (error || !waterHeatingTypes) {
    return <p>Erreur</p>;
  }

  return (
    <TextField
      id="waterHeatingType"
      label="Énergie Utilisée"
      color="secondary"
      select
      fullWidth
    >
      {waterHeatingTypes.map((waterHeatingType) => (
        <MenuItem
          key={waterHeatingType.id}
          value={waterHeatingType.id}
          color="secondary"
        >
          {waterHeatingType.name}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default WaterHeatingTypeSelect;
