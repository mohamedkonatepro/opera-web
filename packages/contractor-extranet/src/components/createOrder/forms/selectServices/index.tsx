import { getFamilies } from "@/queries/families";
import { Typography, useTheme } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import SelectServicesForm from "./SelectServicesForm";
import { SelectServicesProps } from "./types";

const SelectServices: FC<SelectServicesProps> = (props) => {
  const theme = useTheme();

  const {
    isFetching,
    isLoading,
    isSuccess,
    data: families,
  } = useQuery({
    queryKey: ["families"],
    queryFn: () => getFamilies(),
  });

  if (isFetching || isLoading) {
    return (
      <Typography sx={{ ...theme.typography.subtitle1 }}>
        Chargement...
      </Typography>
    );
  }

  if (!isSuccess || !families) {
    return (
      <Typography sx={{ ...theme.typography.subtitle1 }}>Erreur</Typography>
    );
  }

  return <SelectServicesForm families={families} {...props} />;
};

export default SelectServices;
