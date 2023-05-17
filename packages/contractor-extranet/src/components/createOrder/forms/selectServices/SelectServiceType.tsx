import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  useTheme,
} from "@mui/material";
import { SelectServiceProps } from "./types";
import { FC } from "react";
import { SERVICE_TYPE_KEY_TO_LABEL } from "./constants";
import { ServiceType } from "@/types/ServiceType";

const SelectServiceType: FC<SelectServiceProps> = ({
  selectedServiceType,
  setSelectedServiceType,
}) => {
  const theme = useTheme();
  return (
    <FormControl>
      <FormLabel
        id="real-estate-type-group-label"
        focused={false}
        sx={{ ...theme.typography.subtitle1, marginBottom: 2 }}
      >
        Quel est le type du bien ?
      </FormLabel>
      <RadioGroup
        aria-labelledby="real-estate-type-group-label"
        name="real-estate-type-group"
        value={selectedServiceType}
        onChange={(e) => {
          setSelectedServiceType(
            ServiceType[e.target.value as keyof typeof ServiceType]
          );
        }}
      >
        {Object.keys(ServiceType).map((key) => (
          <FormControlLabel
            value={key}
            control={<Radio color="secondary" />}
            label={SERVICE_TYPE_KEY_TO_LABEL[key]}
            disableTypography
            sx={{ ...theme.typography.subtitle2 }}
            key={key}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default SelectServiceType;
