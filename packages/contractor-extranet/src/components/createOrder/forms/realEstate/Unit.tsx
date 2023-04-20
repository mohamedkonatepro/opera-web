import { Stack, TextField, Typography } from "@mui/material";
import { FC } from "react";
import { UnitFormProps } from "./types";

const Unit: FC<UnitFormProps> = ({
  buildingReference,
  unitReference,
  mandateReference,
  leaseReference,
  buildingYear,
  setBuildingReference,
  setUnitReference,
  setMandateReference,
  setLeaseReference,
  setBuildingYear,
}) => {
  return (
    <Stack spacing={2}>
      <Typography variant="subtitle1">Informations du lot</Typography>
      <Stack spacing={2} direction="row">
        <TextField
          id="building-reference"
          label="Référence immeuble"
          color="secondary"
          fullWidth
          value={buildingReference}
          onChange={(event) => setBuildingReference(event.target.value)}
        />
        <TextField
          id="unit-reference"
          label="N° de lot"
          color="secondary"
          fullWidth
          value={unitReference}
          onChange={(event) => setUnitReference(event.target.value)}
        />
        <TextField
          id="mandate-reference"
          label="Mandat"
          color="secondary"
          fullWidth
          value={mandateReference}
          onChange={(event) => setMandateReference(event.target.value)}
        />
      </Stack>
      <Stack direction="row" spacing={2}>
        <TextField
          id="lease-reference"
          label="Code bail"
          color="secondary"
          fullWidth
          value={leaseReference}
          onChange={(event) => setLeaseReference(event.target.value)}
        />
        <TextField
          id="building-year"
          label="Année construction"
          color="secondary"
          fullWidth
          value={buildingYear}
          onChange={(event) => setBuildingYear(event.target.value)}
        />
      </Stack>
    </Stack>
  );
};

export default Unit;
