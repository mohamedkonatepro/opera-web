import { getPurposes } from "@/queries/purposes";
import { Purpose } from "@/types/Purpose";
import { ServiceType } from "@/types/ServiceType";
import { MenuItem, Skeleton, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";

interface PurposeSelectProps {
  value?: Purpose;
  setValue: (value: Purpose) => void;
  disabled?: boolean;
  serviceType: ServiceType;
}

const PurposeSelect: FC<PurposeSelectProps> = ({
  value,
  setValue,
  disabled,
  serviceType,
}) => {
  const {
    isLoading,
    error,
    data: purposes,
  } = useQuery({
    queryKey: ["purposes", serviceType],
    queryFn: ({ queryKey: [, serviceType] }) => getPurposes({ serviceType }),
  });

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
      value={value?.id?.toString() ?? ""}
      disabled={disabled}
      onChange={(event) => {
        const value = event.target.value.toString();
        const purpose = purposes.find(
          (purpose) => purpose.id.toString() === value
        ) as Purpose;
        setValue(purpose);
      }}
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
