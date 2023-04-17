import { getFamilies } from "@/queries/families";
import { RadioButtonChecked, RadioButtonUnchecked } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import SelectServicesForm from "./SelectServicesForm";

const SelectServices: FC = () => {
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

  return <SelectServicesForm families={families} />;
};

export default SelectServices;
