import { getHeatingTypes } from "@/queries/heatingTypes";
import { MenuItem, Skeleton, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";

interface HeatingTypeSelectProps {
  value: string;
  setValue: (value: string) => void;
}

const HeatingTypeSelect: FC<HeatingTypeSelectProps> = ({ value, setValue }) => {
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
      select
      fullWidth
      value={value}
      onChange={(event) => setValue(event.target.value)}
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
