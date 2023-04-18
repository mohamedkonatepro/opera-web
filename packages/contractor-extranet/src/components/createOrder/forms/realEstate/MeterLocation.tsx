import InfoIcon from "@mui/icons-material/Info";
import { Stack, Typography, Unstable_Grid2 as Grid, TextField } from "@mui/material"

const MeterLocation = () => {
  return (
    <Stack spacing={2}>
      <Stack spacing={1} direction="row" alignItems='center'>
        <Typography variant="subtitle1">Emplacement des compteurs</Typography>
        <InfoIcon sx={{ color: 'text.secondary' }} />
      </Stack>
      <Grid container spacing={2}>
        <Grid sm={6}>
          <TextField
            label="Eau chaude sanitaire"
            color="secondary"
            fullWidth
          />
        </Grid>
        <Grid sm={6}>
          <TextField
            label="Électricité"
            color="secondary"
            fullWidth
          />
        </Grid>
        <Grid sm={6}>
          <TextField
            label="Eau froide"
            color="secondary"
            fullWidth
          />
        </Grid>
        <Grid sm={6}>
          <TextField
            label="Gaz"
            color="secondary"
            fullWidth
          />
        </Grid>
        <Grid sm={12}>
          <TextField
            label="Point de livraison"
            color="secondary"
            fullWidth
          />
        </Grid>
      </Grid>
    </Stack>
  )
}

export default MeterLocation
