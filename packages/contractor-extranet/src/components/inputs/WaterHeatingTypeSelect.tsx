import { getWaterHeatingTypes } from "@/queries/waterHeatingTypes";
import { WaterHeatingType } from "@/types/WaterHeatingType";
import { MenuItem, Skeleton, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";

interface WaterHeatingTypeSelectProps {
  value?: WaterHeatingType;
  setValue: (value: WaterHeatingType) => void;
  required?: boolean;
}

const WaterHeatingTypeSelect: FC<WaterHeatingTypeSelectProps> = ({
  value,
  setValue,
  required,
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
      required={required}
      select
      fullWidth
      value={value?.id?.toString() ?? ""}
      onChange={(event) => {
        const value = event.target.value.toString();
        const waterHeatingType = waterHeatingTypes.find(
          (waterHeatingType) => waterHeatingType.id.toString() === value
        ) as WaterHeatingType;
        setValue(waterHeatingType);
      }}
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
