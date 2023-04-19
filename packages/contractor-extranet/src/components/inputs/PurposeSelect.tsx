import { getPurposes } from "@/queries/purposes";
import { MenuItem, Skeleton, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

const PurposeSelect = () => {
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
    <TextField id="purpose" label="Usage" color="secondary" select fullWidth>
      {purposes.map((purpose) => (
        <MenuItem key={purpose.id} value={purpose.id} color="secondary">
          {purpose.name}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default PurposeSelect;
