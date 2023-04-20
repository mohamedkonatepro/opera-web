import { getFloors } from "@/queries/floors";
import { Floor } from "@/types/Floor";
import { MenuItem, Skeleton, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";

interface FloorSelectProps {
  value?: Floor;
  setValue: (value: Floor) => void;
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
      value={value?.id?.toString() ?? ""}
      onChange={(event) => {
        const value = event.target.value.toString();
        const floor = floors.find(
          (floor) => floor.id.toString() === value
        ) as Floor;
        setValue(floor);
      }}
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
