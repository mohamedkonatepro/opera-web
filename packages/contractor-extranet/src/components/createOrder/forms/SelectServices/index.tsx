import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, Typography } from "@mui/material";
import { FC } from "react";

const SelectServices: FC = () => {
  return (
    <Stack spacing={5}>
      <FormControl>
        <FormLabel id="real-estate-type-group-label" >Quel est le type du bien ?</FormLabel>
        <RadioGroup
          aria-labelledby="real-estate-type-group-label"
          defaultValue="living"
          name="real-estate-type-group"
        >
          <FormControlLabel value="living" control={<Radio color="secondary" />} label="Habitation" />
        </RadioGroup>
      </FormControl>
    </Stack>
  )
};


export default SelectServices;
