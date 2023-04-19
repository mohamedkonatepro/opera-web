import { Stack, TextField, Typography } from "@mui/material";
import { FC } from "react";
import { AddressFormProps } from "./types";

const Address: FC<AddressFormProps> = ({
  address,
  additionalAddress,
  postalCode,
  city,
  setAddress,
  setAdditionalAddress,
  setPostalCode,
  setCity,
}) => {
  return (
    <Stack spacing={2}>
      <Typography variant="subtitle1">Adresse du bien</Typography>
      <TextField
        id="address"
        label="Adresse du bien"
        required
        inputProps={{ minLength: 1 }}
        color="secondary"
        fullWidth
        value={address}
        onChange={(event) => setAddress(event.target.value)}
      />
      <TextField
        id="additional-address"
        label="Complément d'adresse"
        color="secondary"
        fullWidth
        value={additionalAddress}
        onChange={(event) => setAdditionalAddress(event.target.value)}
      />
      <Stack spacing={2} direction="row">
        <TextField
          id="postal-code"
          label="Code Postal"
          color="secondary"
          required
          inputProps={{ minLength: 5, maxLength: 5, pattern: "^d{5}$" }}
          fullWidth
          value={postalCode}
          onChange={(event) => setPostalCode(event.target.value)}
        />
        <TextField
          id="city"
          label="Ville"
          color="secondary"
          required
          inputProps={{ minLength: 1 }}
          fullWidth
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
      </Stack>
    </Stack>
  );
};

export default Address;
