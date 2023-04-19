import { getPurposes } from "@/queries/purposes";
import { MenuItem, Skeleton, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";

interface PurposeSelectProps {
  value: string;
  setValue: (value: string) => void;
}

const PurposeSelect: FC<PurposeSelectProps> = ({ value, setValue }) => {
  const {
    isLoading,
    error,
    data: purposes,
  } = useQuery({ queryKey: ["purposes"], queryFn: getPurposes });

  if (isLoading) {
    return (
      <Skeleton>
        <TextField fullWidth />
      </Skeleton>
    );
  }

  if (error || !purposes) {
    return <p>Erreur</p>;
  }

  return (
    <TextField
      id="purpose"
      label="Usage"
      color="secondary"
      select
      fullWidth
      value={value}
      onChange={(event) => setValue(event.target.value)}
    >
      {purposes.map((purpose) => (
        <MenuItem key={purpose.id} value={purpose.id} color="secondary">
          {purpose.name}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default PurposeSelect;
