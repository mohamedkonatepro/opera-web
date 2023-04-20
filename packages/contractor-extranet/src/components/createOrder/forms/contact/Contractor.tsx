import { Alert, Stack, TextField, Typography } from "@mui/material";
import { FC } from "react";
import { ContractorFormProps } from "./types";

const Contractor: FC<ContractorFormProps> = ({
  firstname,
  setFirstname,
  lastname,
  setLastname,
  email,
  setEmail,
}) => {
  return (
    <Stack spacing={2}>
      <Typography variant="subtitle1">Donneur d'ordre</Typography>
      <Stack spacing={2}>
        <Stack direction="row" spacing={2}>
          <TextField
            id="contractor-firstname"
            label="Prénom du gestionnaire"
            color="secondary"
            fullWidth
            value={firstname}
            onChange={(event) => {
              setFirstname(event.target.value);
            }}
          />
          <TextField
            id="contractor-lastname"
            label="Nom du gestionnaire"
            color="secondary"
            fullWidth
            value={lastname}
            onChange={(event) => {
              setLastname(event.target.value);
            }}
          />
        </Stack>
        <TextField
          id="contractor-email"
          label="Adresse email"
          color="secondary"
          fullWidth
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      </Stack>
      <Alert severity="info">
        <Typography variant="subtitle2">
          La personne renseignée recevra les mails de suivi et de gestion de
          RDV.
        </Typography>
      </Alert>
    </Stack>
  );
};

export default Contractor;
