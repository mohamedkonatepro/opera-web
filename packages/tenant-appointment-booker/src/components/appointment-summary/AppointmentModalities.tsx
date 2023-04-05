import { ArrowRight } from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

const appointmentModalities = {
  "EDL-S": [
    "Attendez l’opérateur en bas de l’immeuble.",
    "Localisez et identifiez tous les compteurs (électricité, gaz, eau).",
    "Veillez à avoir tous les jeux de clés du logement.",
    "Localisez les annexes (cave, garage, grenier...).",
    "Le logement doit être vidé et nettoyé.",
    "Si vous vous faites représenter, remettez à votre représentant une procuration manuscrite accompagnée d’une photocopie de votre pièce d’identité.",
    "Présentez à l’opérateur le certificat d’entretien de votre chaudière gaz si le logement est équipé d‘une chaudière de ce type.",
    "Pensez à apporter lors du rendez-vous, un exemplaire du bail et votre attestation d’assurance habitation.",
  ],
  "EDL-E": [
    "Être ponctuel et d’attendre l’opérateur au pied de votre immeuble",
    "De vous munir d’une copie de votre certificat d’assurance MRH",
    "Si vous vous faites représenter de remettre à votre représentant une procuration manuscrite accompagnée d’une photocopie de votre pièce d’identité",
  ],
  DIAG: [
    "Donner accès à l'ensemble des pièces, placards, annexes (cave, garage, grenier, ...) du bien",
    "Donner accès à toutes les prises et appareils de chauffe",
    "Le diagnostiqueur pourra être amené à couper le compteur électrique et la chaudière le cas échéant",
  ],
};

const getAppointmentModalities = (orderType: string) => {
  switch (orderType) {
    case "S":
    case "ES":
      return appointmentModalities["EDL-S"];
    case "E":
      return appointmentModalities["EDL-E"];
    case "D":
      return appointmentModalities["DIAG"];
    default:
      return [];
  }
};

const AppointmentModalities = ({ orderType }: { orderType: string }) => {
  const modalities = getAppointmentModalities(orderType);

  if (modalities.length === 0) return null;

  return (
    <Stack spacing={1.5}>
      <Typography variant="caption">Le jour de l’état des lieux</Typography>
      <List>
        {modalities.map((modality) => (
          <ListItem key={modality}>
            <ListItemIcon>
              <ArrowRight />
            </ListItemIcon>
            <ListItemText primary={modality} />
          </ListItem>
        ))}
      </List>
    </Stack>
  );
};

export default AppointmentModalities;
