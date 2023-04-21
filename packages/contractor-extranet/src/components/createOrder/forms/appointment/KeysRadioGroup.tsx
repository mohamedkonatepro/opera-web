import { Radio, RadioGroup, FormControl, FormControlLabel, Typography, useTheme, Stack} from "@mui/material";
import { FC } from "react";

export interface KeysRadioGroupProps {
  onChange: (newValue: string) => void;
}

const KeysRadioGroup: FC<KeysRadioGroupProps> = ({ onChange }) => {
  const theme = useTheme();
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <Stack spacing={1}>
      <FormControl component="fieldset">
        <Typography
          variant="subtitle1"
          sx={{ ...theme.typography.subtitle1, marginBottom: 1 }}
        >
          Gestion des clés
        </Typography>
        <RadioGroup aria-label="real-estate-type-group" name="real-estate-type-group" defaultValue="tenant" onChange={handleOnChange}>
          <FormControlLabel value="tenant" control={<Radio color="secondary" />} label="Clés avec locataire" />
          <FormControlLabel value="contractor" control={<Radio color="secondary" />} label="Clés chez le donneur d’ordre" />
          <FormControlLabel value="operator" control={<Radio color="secondary" />} label="Clés avec l’opérateur, récupérées lors de l’EDL sortant réalisé avant l’entrant" />
          <FormControlLabel value="keeper" control={<Radio color="secondary" />} label="Clés avec le gardien" />
        </RadioGroup>
      </FormControl>
    </Stack>
  );
};

export default KeysRadioGroup;
