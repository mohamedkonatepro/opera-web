import {
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Typography,
  useTheme,
  Stack,
} from "@mui/material";
import { FC } from "react";

export interface CurrentOccupationRadioGroupProps {
  onChange: (newValue: string) => void;
}

const CurrentOccupationRadioGroup: FC<CurrentOccupationRadioGroupProps> = ({
  onChange,
}) => {
  const theme = useTheme();
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <Stack spacing={2}>
      <FormControl component="fieldset">
        <Typography
          variant="subtitle1"
          sx={{ ...theme.typography.subtitle1, marginBottom: 1 }}
        >
          Occupation actuelle
        </Typography>
        <RadioGroup
          aria-label="occupation-group"
          name="occupation-group"
          defaultValue="busy"
          onChange={handleOnChange}
        >
          <FormControlLabel
            value="busy"
            control={<Radio color="secondary" />}
            label="Occupé"
          />
          <FormControlLabel
            value="available"
            control={<Radio color="secondary" />}
            label="Vacant"
          />
        </RadioGroup>
      </FormControl>
    </Stack>
  );
};

export default CurrentOccupationRadioGroup;
