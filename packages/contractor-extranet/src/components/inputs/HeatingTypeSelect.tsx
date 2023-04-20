import { getHeatingTypes } from "@/queries/heatingTypes";
import { HeatingType } from "@/types/HeatingType";
import { MenuItem, Skeleton, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";

interface HeatingTypeSelectProps {
  value?: HeatingType;
  setValue: (value: HeatingType) => void;
  required?: boolean;
}

const HeatingTypeSelect: FC<HeatingTypeSelectProps> = ({ value, setValue, required }) => {
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
      id="heating-type"
      label="Type de compteur"
      color="secondary"
      required={required}
      select
      fullWidth
      value={value?.id?.toString() ?? ""}
      onChange={(event) => {
        const value = event.target.value.toString();
        const heatingType = heatingTypes.find((heatingType) => heatingType.id.toString() === value) as HeatingType;
        setValue(heatingType);
      }}
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
