import { getRealEstateTypes } from "@/queries/realEstateTypes";
import { MenuItem, Skeleton, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

const RealEstateTypeSelect = () => {
  const {
    isLoading,
    error,
    data: realEstateTypes,
  } = useQuery({ queryKey: ["realEstateTypes"], queryFn: getRealEstateTypes });

  if (isLoading) {
    return (
      <Skeleton>
        <TextField fullWidth />
      </Skeleton>
    );
  }

  if (error || !realEstateTypes) {
    return <p>Erreur</p>;
  }

  return (
    <TextField label="Type" color="secondary" select fullWidth>
      {realEstateTypes.map((realEstateType) => (
        <MenuItem
          key={realEstateType.id}
          value={realEstateType.id}
          color="secondary"
        >
          {realEstateType.name}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default RealEstateTypeSelect;
