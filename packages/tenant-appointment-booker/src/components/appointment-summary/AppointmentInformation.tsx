import { Assignment, AssignmentOutlined } from "@mui/icons-material";
import { Box, Paper, Stack, Typography } from "@mui/material";
import AgendaView from "./AgendaView";

const AppointmentInformation = () => {
  return (
    <Stack direction="row" spacing={3}>
      <AgendaView />
      <Stack spacing={0.5}>
        <Stack direction="row" spacing={0.5} alignItems="center">
          <AssignmentOutlined />
          <Typography variant="body2" color="text.secondary">
            État des lieux de sortie
          </Typography>
        </Stack>
        <Typography variant="h5" fontWeight="500" fontSize="18px">
          Votre rendez-vous est confirmé !
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Jeudi, 23 février 2023 à 15:30 pour Régie Lyon Métropole
        </Typography>
      </Stack>
    </Stack>
  );
};

export default AppointmentInformation;
