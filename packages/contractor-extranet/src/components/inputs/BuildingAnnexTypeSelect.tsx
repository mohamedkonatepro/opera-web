import { getBuildingAnnexTypes } from "@/queries/buildingAnnexTypes";
import { BuildingAnnexType } from "@/types/BuildingAnnexType";
import { MenuItem, Skeleton, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";

interface BuildingAnnexTypeSelectProps {
  value?: BuildingAnnexType;
  setValue: (value: BuildingAnnexType) => void;
  id?: string;
}

const BuildingAnnexTypeSelect: FC<BuildingAnnexTypeSelectProps> = ({
  value,
  setValue,
  id = "building-annex-type",
}) => {
  const {
    isLoading,
    error,
    data: buildingAnnexTypes,
  } = useQuery({
    queryKey: ["buildingAnnexTypes"],
    queryFn: getBuildingAnnexTypes,
  });

  if (isLoading) {
    return (
      <Skeleton>
        <TextField fullWidth />
      </Skeleton>
    );
  }

  if (error || !buildingAnnexTypes) {
    return <p>Erreur</p>;
  }

  return (
    <TextField
      id={id}
      label="Type"
      color="secondary"
      required={value !== undefined}
      select
      fullWidth
      sx={{ minWidth: "150px" }}
      value={value?.id?.toString() ?? ""}
      onChange={(event) => {
        const value = event.target.value.toString();
        const buildingAnnexType = buildingAnnexTypes.find(
          (buildingAnnexType) => buildingAnnexType.id.toString() === value
        ) as BuildingAnnexType;
        setValue(buildingAnnexType);
      }}
    >
      {buildingAnnexTypes.map((buildingAnnexType) => (
        <MenuItem
          key={buildingAnnexType.id}
          value={buildingAnnexType.id}
          color="secondary"
        >
          {buildingAnnexType.name}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default BuildingAnnexTypeSelect;
