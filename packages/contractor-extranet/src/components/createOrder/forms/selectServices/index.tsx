import { getFamilies } from "@/queries/families";
import { Typography, useTheme } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import SelectServicesForm from "./SelectServicesForm";
import { SelectServicesProps } from "./types";
import { getServiceTypes } from "@/queries/serviceTypes";

const SelectServices: FC<SelectServicesProps> = (props) => {
  const theme = useTheme();

  const {
    isLoading: isLoadingFamilies,
    isSuccess: isSuccessFamilies,
    data: families,
  } = useQuery({
    queryKey: ["families"],
    queryFn: () => getFamilies(),
  });

  if (isLoadingFamilies) {
    return (
      <Typography sx={{ ...theme.typography.subtitle1 }}>
        Chargement...
      </Typography>
    );
  }

  if (!isSuccessFamilies || !families) {
    return (
      <Typography sx={{ ...theme.typography.subtitle1 }}>Erreur</Typography>
    );
  }

  return <SelectServicesForm families={families} {...props} />;
};

export default SelectServices;
