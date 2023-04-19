import { getRealEstateTypes } from "@/queries/realEstateTypes";
import {
  MenuItem,
  SelectProps,
  Skeleton,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";

interface RealEstateTypeProps {
  value: string;
  setValue: (value: string) => void;
}

const RealEstateTypeSelect: FC<RealEstateTypeProps> = ({ value, setValue }) => {
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
    <TextField
      id="real-estate-type"
      label="Type"
      color="secondary"
      fullWidth
      select
      value={value}
      required
      onChange={(event) => setValue(event.target.value)}
    >
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
