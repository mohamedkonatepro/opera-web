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
import { FC, useMemo, useState } from "react";
import SelectServiceType from "./SelectServiceType";
import {
  RadioButtonChecked,
  RadioButtonUnchecked,
} from "@mui/icons-material";

const SelectServicesForm: FC<{ families: any[] }> = ({ families }) => {
  const theme = useTheme();

  const [currentFamily, setCurrentFamily] = useState<number | null>(null);

  const [services, setServices] = useState<number[]>([]);

  const [options, setOptions] = useState<number[]>([]);

  const handleOnChangeAccordion = (family: number) => () => {
    setCurrentFamily(family);
    setServices([]);
  };

  const handleOnChangeService = (service: number) => () => {
    if (services.includes(service)) {
      setServices(services.filter((s) => s !== service));
    } else {
      setServices([...services, service]);
    }
    setOptions([]);
  };

  const handleOnChangeOption = (option: number) => () => {
    if (options.includes(option)) {
      setOptions(options.filter((o) => o !== option));
    } else {
      setOptions([...options, option]);
    }
  };

  const proposedOptions = useMemo(() => {
    const options: any[] = [];
    services.forEach((service) => {
      const serviceOptions = families
          .find((family) => family.id === currentFamily)
          .services.find((s: any) => s.id === service).options;
      options.push(...serviceOptions);
    });
    return options;
  }, [services, currentFamily]);


  return (
    <Stack spacing={5} component="form">
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
            const isExpanded = currentFamily === family.id;
            return (
              <Accordion
                expanded={isExpanded}
                onChange={handleOnChangeAccordion(family.id)}
                elevation={0}
                variant="outlined"
                disableGutters
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
                        {family.services.map((service: any) => (
                          <FormControlLabel
                            control={
                              <Checkbox
                                color="secondary"
                                size="small"
                                checked={services.includes(service.id)}
                                onChange={handleOnChangeService(service.id)}
                                value={service.id}
                                name={service.code}
                              />
                            }
                            label={service.name}
                            disableTypography
                            sx={{ ...theme.typography.body2 }}
                          />
                        ))}
                      </FormGroup>
                      {proposedOptions.length > 0 && (
                        <FormControl
                          focused={false}
                        >
                          <FormLabel sx={{ ...theme.typography.subtitle2, marginBottom: 1.5 }}>
                            Ajouter des options
                          </FormLabel>
                          <FormGroup>
                            {proposedOptions.map((option: any) => (
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    color="secondary"
                                    size="small"
                                    checked={options.includes(option.id)}
                                    onChange={handleOnChangeOption(option.id)}
                                    value={option.id}
                                    name={option.code}
                                  />
                                }
                                label={option.name}
                                disableTypography
                                sx={{ ...theme.typography.body2 }}
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
