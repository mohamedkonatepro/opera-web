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
  InputAdornment,
  OutlinedInput,
  Radio,
  RadioGroup,
  Stack,
  useTheme,
} from "@mui/material";
import React, { FC, useEffect, useMemo, useState } from "react";
import SelectServiceType from "./SelectServiceType";
import { RadioButtonChecked, RadioButtonUnchecked } from "@mui/icons-material";
import { SelectServicesFormProps } from "./types";
import { ServiceOption } from "@/types/ServiceOption";
import { Family } from "@/types/Family";
import { ServiceType } from "@/types/ServiceType";
import { Service } from "@/types/Service";

const getProposedOptions = (
  families: Family[],
  selectedServices: number[],
  selectedFamily: number | null
) => {
  if (!selectedFamily) return [];
  const family = families.find((family) => family.id === selectedFamily);
  if (!family) return [];
  const services = family.services.filter((service) =>
    selectedServices.includes(service.id)
  );

  return services.reduce((acc, service) => {
    return [...acc, ...service.options];
  }, [] as ServiceOption[]);
};

const serviceHasServiceType = (
  service: Service,
  selectedServiceType: ServiceType
) => {
  return service.serviceTypes.some((serviceType) => {
    return serviceType.id === selectedServiceType.id;
  });
};

const SelectServicesForm: FC<SelectServicesFormProps> = ({
  families,
  formId,
  onSubmit,
  initialValues,
  contextValues,
  setSubmitButtonDisabled,
}) => {
  const theme = useTheme();

  const [selectedServiceType, setSelectedServiceType] = useState<ServiceType>(
    initialValues.serviceType
  );

  const [selectedFamily, setSelectedFamily] = useState<number | null>(
    initialValues?.family?.id ?? null
  );

  const [selectedServices, setSelectedServices] = useState<number[]>(
    initialValues?.services?.map((service) => service.id) ?? []
  );

  const [selectedOptions, setSelectedOptions] = useState<number[]>(
    initialValues?.options?.map((option) => option.id) ?? []
  );

  const [surface, setSurface] = useState<string>(
    initialValues?.surface?.toString() ?? ""
  );

  const handleOnChangeServiceType = (serviceType: ServiceType): void => {
    setSelectedServiceType(serviceType);
    setSelectedFamily(null);
    setSelectedServices([]);
    setSurface(initialValues?.surface?.toString() ?? "");
  };

  const handleOnChangeAccordion = (family: number) => () => {
    setSelectedFamily(family);
    setSelectedServices([]);
  };

  const handleOnChangeService = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const serviceId = parseInt(event.target.value);
    setSelectedServices([serviceId]);
    setSelectedOptions([]);
  };

  const handleOnChangeServiceDiag = (service: number) => () => {
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

  const proposedOptions = useMemo(
    () => getProposedOptions(families, selectedServices, selectedFamily),
    [selectedFamily, selectedServices, families]
  );

  useEffect(() => {
    const initialOptionsIds =
      initialValues?.options?.map((option) => option.id) ?? [];
    setSelectedOptions(
      proposedOptions
        .filter((option) => initialOptionsIds.includes(option.id))
        .map((option) => option.id)
    );
  }, [proposedOptions, initialValues?.options]);

  useEffect(() => {
    if (selectedServices.length === 0) {
      setSubmitButtonDisabled(true);
    } else {
      setSubmitButtonDisabled(false);
    }
  }, [selectedServices, setSubmitButtonDisabled]);

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
      serviceType: selectedServiceType,
      surface,
    });
  };

  const familiesToShow = useMemo(() => {
    return families.filter((family) => {
      return (
        family.services.filter((service) => {
          return serviceHasServiceType(service, selectedServiceType);
        }).length > 0
      );
    });
  }, [families, selectedServiceType]);

  return (
    <Stack spacing={5} component="form" onSubmit={handleOnSubmit} id={formId}>
      <SelectServiceType
        selectedServiceType={selectedServiceType}
        setSelectedServiceType={handleOnChangeServiceType}
        serviceTypes={contextValues.serviceTypes}
      />
      {selectedServiceType.code === "tertiary" && (
        <FormControl>
          <FormLabel
            id="surface-label"
            sx={{ ...theme.typography.subtitle1, marginBottom: 2 }}
            focused={false}
          >
            Surface du bien
          </FormLabel>
          <OutlinedInput
            id="surface"
            name="surface"
            size="small"
            color="secondary"
            value={surface}
            endAdornment={<InputAdornment position="end">m²</InputAdornment>}
            onChange={(e) => {
              let value = e.target.value;
              if (/^\d*\.?\d*$/.test(value)) {
                setSurface(value);
              }
            }}
            inputProps={{
              inputMode: "numeric",
              pattern: "^\\d*\\.?\\d*$",
            }}
            sx={{ maxWidth: 122 }}
          />
        </FormControl>
      )}
      <FormControl>
        <FormLabel
          id="services-options-label"
          sx={{ ...theme.typography.subtitle1, marginBottom: 2 }}
          focused={false}
        >
          Sélectionner le(s) service(s) et ajouter des options
        </FormLabel>
        <Stack spacing={1}>
          {familiesToShow.map((family) => {
            const isDiag = family?.code === "DIAG";
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
                      {isDiag ? (
                        <FormGroup>
                          {family.services
                            .filter((service) =>
                              serviceHasServiceType(
                                service,
                                selectedServiceType
                              )
                            )
                            .map((service) => (
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    color="secondary"
                                    size="small"
                                    checked={selectedServices.includes(
                                      service.id
                                    )}
                                    onChange={handleOnChangeServiceDiag(
                                      service.id
                                    )}
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
                      ) : (
                        <RadioGroup
                          aria-label="services-group"
                          name="services-group"
                          onChange={handleOnChangeService}
                        >
                          {family.services
                            .filter((service) =>
                              serviceHasServiceType(
                                service,
                                selectedServiceType
                              )
                            )
                            .map((service) => (
                              <FormControlLabel
                                control={
                                  <Radio
                                    color="secondary"
                                    size="small"
                                    name={service.code}
                                    checked={selectedServices.includes(
                                      service.id
                                    )}
                                  />
                                }
                                value={service.id}
                                label={service.name}
                                disableTypography
                                sx={{ ...theme.typography.body2 }}
                                key={service.id}
                              />
                            ))}
                        </RadioGroup>
                      )}
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
