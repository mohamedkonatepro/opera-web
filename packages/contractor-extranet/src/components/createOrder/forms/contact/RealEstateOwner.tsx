import { InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { FC } from "react";
import { RealEstateOwnerFormProps } from "./types";
import HelpIcon from "@mui/icons-material/Help";

const RealEstateOwner: FC<RealEstateOwnerFormProps> = ({
  firstname,
  setFirstname,
  lastname,
  setLastname,
  fiscalInvariant,
  setFiscalInvariant,
  socialReason,
  setSocialReason,
}) => {
  return (
    <Stack spacing={2}>
      <Typography variant="subtitle1">Propriétaire du bien</Typography>
      <Stack spacing={2}>
        <Stack direction="row" spacing={2}>
          <TextField
            id="real-estate-owner-firstname"
            label="Prénom du propriétaire"
            color="secondary"
            fullWidth
            value={firstname}
            onChange={(event) => {
              setFirstname(event.target.value);
            }}
          />
          <TextField
            id="real-estate-owner-lastname"
            label="Nom du propriétaire"
            color="secondary"
            fullWidth
            value={lastname}
            onChange={(event) => {
              setLastname(event.target.value);
            }}
          />
        </Stack>
        <Stack direction="row" spacing={2}>
          <TextField
            id="real-estate-owner-fiscal-invariant"
            label="Invariant fiscal"
            color="secondary"
            fullWidth
            value={fiscalInvariant}
            onChange={(event) => {
              setFiscalInvariant(event.target.value);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <HelpIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="real-estate-owner-social-reason"
            label="Raison sociale"
            color="secondary"
            fullWidth
            value={socialReason}
            onChange={(event) => {
              setSocialReason(event.target.value);
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default RealEstateOwner;
