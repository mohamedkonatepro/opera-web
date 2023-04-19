import { getBuildingAnnexTypes } from "@/queries/buildingAnnexTypes";
import { MenuItem, Skeleton, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

const BuildingAnnexTypeSelect = () => {
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
      id="buildingAnnexType"
      label="Type"
      color="secondary"
      required
      select
      fullWidth
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
