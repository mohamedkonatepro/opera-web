import InfoIcon from "@mui/icons-material/Info";
import {
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
  TextField,
} from "@mui/material";
import { FC } from "react";

import { MeterLocationFormProps } from "./types";

const MeterLocation: FC<MeterLocationFormProps> = ({
  locationHotWater,
  locationColdWater,
  electricalReferenceMeasureLocation,
  locationElectricMeter,
  locationGasMeter,
  setLocationHotWater,
  setLocationColdWater,
  setElectricalReferenceMeasureLocation,
  setLocationElectricMeter,
  setLocationGasMeter,
}) => {
  return (
    <Stack spacing={2}>
      <Stack spacing={1} direction="row" alignItems="center">
        <Typography variant="subtitle1">Emplacement des compteurs</Typography>
        <InfoIcon sx={{ color: "text.secondary" }} />
      </Stack>
      <Grid container spacing={2}>
        <Grid sm={6}>
          <TextField
            label="Eau chaude sanitaire"
            color="secondary"
            fullWidth
            value={locationHotWater}
            onChange={(event) => setLocationHotWater(event.target.value)}
          />
        </Grid>
        <Grid sm={6}>
          <TextField
            label="Électricité"
            color="secondary"
            fullWidth
            value={locationElectricMeter}
            onChange={(event) => setLocationElectricMeter(event.target.value)}
          />
        </Grid>
        <Grid sm={6}>
          <TextField
            label="Eau froide"
            color="secondary"
            fullWidth
            value={locationColdWater}
            onChange={(event) => setLocationColdWater(event.target.value)}
          />
        </Grid>
        <Grid sm={6}>
          <TextField
            label="Gaz"
            color="secondary"
            fullWidth
            value={locationGasMeter}
            onChange={(event) => setLocationGasMeter(event.target.value)}
          />
        </Grid>
        <Grid sm={12}>
          <TextField
            label="Point de livraison"
            color="secondary"
            fullWidth
            value={electricalReferenceMeasureLocation}
            onChange={(event) =>
              setElectricalReferenceMeasureLocation(event.target.value)
            }
          />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default MeterLocation;
