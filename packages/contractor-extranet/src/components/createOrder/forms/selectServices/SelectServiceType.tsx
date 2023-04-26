import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  useTheme,
} from "@mui/material";

const SelectServiceType = () => {
  const theme = useTheme();
  return (
    <FormControl>
      <FormLabel
        id="real-estate-type-group-label"
        sx={{ ...theme.typography.subtitle1, marginBottom: 2 }}
      >
        Quel est le type du bien ?
      </FormLabel>
      <RadioGroup
        aria-labelledby="real-estate-type-group-label"
        defaultValue="living"
        name="real-estate-type-group"
      >
        <FormControlLabel
          value="living"
          control={<Radio color="secondary" />}
          label="Habitation"
          disableTypography
          sx={{ ...theme.typography.subtitle2 }}
        />
      </RadioGroup>
    </FormControl>
  );
};

export default SelectServiceType;
