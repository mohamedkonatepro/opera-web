import { ArrowRight } from "@mui/icons-material";
import { List, ListItem, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";

const modalities = {
  EDL: [
    "Attendez l’opérateur en bas de l’immeuble.",
    "Localisez et identifiez tous les compteurs (électricité, gaz, eau).",
    "Veillez à avoir tous les jeux de clés du logement.",
    "Localisez les annexes (cave, garage, grenier...).",
    "Le logement doit être vidé et nettoyé.",
    "Si vous vous faites représenter, remettez à votre représentant une procuration manuscrite accompagnée d’une photocopie de votre pièce d’identité.",
    "Présentez à l’opérateur le certificat d’entretien de votre chaudière gaz si le logement est équipé d‘une chaudière de ce type.",
    "Pensez à apporter lors du rendez-vous, un exemplaire du bail et votre attestation d’assurance habitation.",
  ]
};

const AppointmentModalities = () => {
  return (
    <Stack spacing={1.5}>
      <Typography variant="caption" color="text.secondary">Le jour de l’état des lieux</Typography>
      <List>
        {modalities.EDL.map((modality) => (
          <ListItem key={modality}>
            <ListItemIcon>
              <ArrowRight  sx={{ color: "text.disabled" }} />
            </ListItemIcon>
            <ListItemText primary={modality} />
          </ListItem>
        ))}
      </List>
    </Stack>
  );
};

export default AppointmentModalities;
