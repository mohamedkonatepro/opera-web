import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  useTheme,
} from "@mui/material";
import { SelectServiceProps } from "./types";
import React, { FC } from "react";
import { ServiceType } from "@/types/ServiceType";

const SelectServiceType: FC<SelectServiceProps> = ({
  selectedServiceType,
  setSelectedServiceType,
  serviceTypes,
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
        value={selectedServiceType.code}
        onChange={(e) => {
          const serviceType = serviceTypes.find(
            (serviceType) => serviceType.code === e.target.value
          );
          setSelectedServiceType(serviceType as ServiceType);
        }}
      >
        {serviceTypes
          .map((serviceType) => (
            <FormControlLabel
              value={serviceType.code}
              control={<Radio color="secondary" />}
              label={serviceType.name}
              disableTypography
              sx={{ ...theme.typography.subtitle2 }}
              key={serviceType.id}
            />
          ))}
      </RadioGroup>
    </FormControl>
  );
};

export default SelectServiceType;
