import { ErrorIcon } from "@/components/common/icons/Icons";
import { Paper, Stack, Typography } from "@mui/material";

const NoSlotsAvailable = () => {
  return (
    <Paper variant="outlined" sx={{ bgcolor: "error.light", padding: 1.5 }}>
      <Stack direction="row" spacing={1.5}>
        <ErrorIcon fontSize="small" />
        <Stack spacing={0.5}>
          <Typography variant="subtitle2">
            Pas de créneau disponible pour le moment
          </Typography>
          <Typography variant="body2">
            En raison d’une forte demande, il n’y a plus de créneau disponible
            pour le moment. Nos agents se mobilisent pour trouver des
            disponibilités. Nous vous recontactons au plus vite.
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default NoSlotsAvailable;
