import { getFloors } from "@/queries/floors";
import { MenuItem, Skeleton, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";

interface FloorSelectProps {
  value: string;
  setValue: (value: string) => void;
}

const FloorSelect: FC<FloorSelectProps> = ({ value, setValue }) => {
  const {
    isLoading,
    error,
    data: floors,
  } = useQuery({ queryKey: ["floors"], queryFn: getFloors });

  if (isLoading) {
    return (
      <Skeleton>
        <TextField fullWidth />
      </Skeleton>
    );
  }

  if (error || !floors) {
    return <p>Erreur</p>;
  }

  return (
    <TextField
      id="floor"
      label="Étage"
      color="secondary"
      required
      select
      fullWidth
      value={value}
      onChange={(event) => setValue(event.target.value)}
    >
      {floors.map((floor) => (
        <MenuItem key={floor.id} value={floor.id} color="secondary">
          {floor.name}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default FloorSelect;
