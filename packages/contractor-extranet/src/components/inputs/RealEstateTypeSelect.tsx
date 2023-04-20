import { getRealEstateTypes } from "@/queries/realEstateTypes";
import { RealEstateType } from "@/types/RealEstateType";
import {
  MenuItem,
  Skeleton,
  TextField,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";

interface RealEstateTypeProps {
  value?: RealEstateType;
  setValue: (value: RealEstateType) => void;
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
      value={value?.id?.toString() ?? ""}
      required
      onChange={
        (event) => {
          const value = event.target.value.toString();
          const realEstateType = realEstateTypes.find((realEstateType) => realEstateType.id.toString() === value) as RealEstateType;
          setValue(realEstateType);
        }
      }
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
