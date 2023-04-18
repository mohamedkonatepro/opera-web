import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Stack,
  useTheme,
} from "@mui/material";
import React, { FC, useMemo, useState } from "react";
import SelectServiceType from "./SelectServiceType";
import { RadioButtonChecked, RadioButtonUnchecked } from "@mui/icons-material";
import { SelectServicesFormProps } from "./types";
import { ServiceOption } from "@/types/ServiceOption";
import { Family } from "@/types/Family";

const SelectServicesForm: FC<SelectServicesFormProps> = ({
  families,
  formId,
  onSubmit,
}) => {
  const theme = useTheme();

  const [selectedFamily, setSelectedFamily] = useState<number | null>(null);

  const [selectedServices, setSelectedServices] = useState<number[]>([]);

  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  const handleOnChangeAccordion = (family: number) => () => {
    setSelectedFamily(family);
    setSelectedServices([]);
  };

  const handleOnChangeService = (service: number) => () => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter((s) => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
    setSelectedOptions([]);
  };

  const handleOnChangeOption = (option: number) => () => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((o) => o !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const proposedOptions = useMemo(() => {
    const options: ServiceOption[] = [];
    const family = families.find((family) => family.id === selectedFamily);
    if (!family) return [];
    const services = family.services.filter((service) =>
      selectedServices.includes(service.id)
    );

    return services.reduce((acc, service) => {
      return [...acc, ...service.options];
    }, options);
  }, [selectedFamily, selectedServices, families]);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const family = families.find(
      (family: any) => family.id === selectedFamily
    ) as Family;
    const services = family.services.filter((service) =>
      selectedServices.includes(service.id)
    );
    const options = proposedOptions.filter((option) =>
      selectedOptions.includes(option.id)
    );

    onSubmit({
      family,
      services,
      options,
    });
  };
  return (
    <Stack spacing={5} component="form" onSubmit={handleOnSubmit} id={formId}>
      <SelectServiceType />
      <FormControl>
        <FormLabel
          id="services-options-label"
          sx={{ ...theme.typography.subtitle1, marginBottom: 2 }}
          focused={false}
        >
          Sélectionner le(s) service(s) et ajouter des options
        </FormLabel>
        <Stack spacing={1}>
          {families.map((family) => {
            const isExpanded = selectedFamily === family.id;
            return (
              <Accordion
                expanded={isExpanded}
                onChange={handleOnChangeAccordion(family.id)}
                elevation={0}
                variant="outlined"
                disableGutters
                key={family.id}
              >
                <AccordionSummary
                  sx={{
                    ...theme.typography.subtitle2,
                    borderBottom: "1px solid",
                    borderColor: "border.default",
                    flexDirection: "row-reverse",
                    "& .MuiAccordionSummary-expandIconWrapper": {
                      marginRight: theme.spacing(1.5),
                    },
                  }}
                  expandIcon={
                    isExpanded ? (
                      <RadioButtonChecked color="secondary" />
                    ) : (
                      <RadioButtonUnchecked color="disabled" />
                    )
                  }
                >
                  {family.name}
                </AccordionSummary>
                <AccordionDetails>
                  {isExpanded && (
                    <Stack spacing={2} divider={<Divider flexItem />}>
                      <FormGroup>
                        {family.services.map((service) => (
                          <FormControlLabel
                            control={
                              <Checkbox
                                color="secondary"
                                size="small"
                                checked={selectedServices.includes(service.id)}
                                onChange={handleOnChangeService(service.id)}
                                value={service.id}
                                name={service.code}
                              />
                            }
                            label={service.name}
                            disableTypography
                            sx={{ ...theme.typography.body2 }}
                            key={service.id}
                          />
                        ))}
                      </FormGroup>
                      {proposedOptions.length > 0 && (
                        <FormControl focused={false}>
                          <FormLabel
                            sx={{
                              ...theme.typography.subtitle2,
                              marginBottom: 1.5,
                            }}
                          >
                            Ajouter des options
                          </FormLabel>
                          <FormGroup>
                            {proposedOptions.map((option: any) => (
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    color="secondary"
                                    size="small"
                                    checked={selectedOptions.includes(
                                      option.id
                                    )}
                                    onChange={handleOnChangeOption(option.id)}
                                    value={option.id}
                                    name={option.code}
                                  />
                                }
                                label={option.name}
                                disableTypography
                                sx={{ ...theme.typography.body2 }}
                                key={option.id}
                              />
                            ))}
                          </FormGroup>
                        </FormControl>
                      )}
                    </Stack>
                  )}
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Stack>
      </FormControl>
    </Stack>
  );
};

export default SelectServicesForm;
