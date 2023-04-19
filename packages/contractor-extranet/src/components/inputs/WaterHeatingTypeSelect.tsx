import { getWaterHeatingTypes } from "@/queries/waterHeatingTypes";
import { MenuItem, Skeleton, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";

interface WaterHeatingTypeSelectProps {
  value: string;
  setValue: (value: string) => void;
}

const WaterHeatingTypeSelect: FC<WaterHeatingTypeSelectProps> = ({
  value,
  setValue,
}) => {
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
      id="water-heating-type"
      label="Type de compteur"
      color="secondary"
      select
      fullWidth
      value={value}
      onChange={(event) => setValue(event.target.value)}
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
