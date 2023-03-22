import HelpDialog from "@/components/common/dialogs/HelpDialog";
import orderIsEDL from "@/utils/orderIsEDL";
import { PhoneOutlined } from "@mui/icons-material";
import {
  Alert,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { parsePhoneNumber } from "libphonenumber-js";
import { AppointmentTooLateDialogProps } from "./types";

const getTitle = (orderType: string) => {
  if (orderIsEDL(orderType))
    return "Votre état des lieux a initialement lieu dans moins de 48h (jours ouvrés), vous ne pouvez pas demander de nouvelle date.";
  return "Votre RDV a lieu dans moins de 48h (jours ouvrés), vous ne pouvez pas l’annuler.";
};

const AppointmentTooLateDialog: React.FC<AppointmentTooLateDialogProps> = ({
  open,
  onClose,
  appointmentBooking,
}) => {
  const phoneNumber = parsePhoneNumber(
    appointmentBooking.order.operaGroupePhoneNumber,
    "FR"
  );
  const formattedPhoneNumber = phoneNumber && phoneNumber.formatInternational();
  const phoneNumberUri = phoneNumber && phoneNumber.getURI();

  return (
    <HelpDialog
      open={open}
      onClose={onClose}
      maxWidth={600}
      title="Un problème avec la prise de rendez-vous ?"
      text="Contactez votre conseiller d’agence par téléphone, ou remplissez le formulaire de contact."
    >
      <Stack spacing={3}>
        <Alert severity="error">
          <Stack spacing={0.5}>
            <Typography variant="subtitle2">
              {getTitle(appointmentBooking.order.type)}
            </Typography>
            <Typography variant="body2">
              Si vous ne pouvez pas vous rendre disponible sur les dates
              proposées, contactez rapidement Opéra Groupe.
            </Typography>
          </Stack>
        </Alert>
        <Stack spacing={1.5}>
          <Typography variant="caption">Coordonnées d’Opéra Groupe</Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <PhoneOutlined sx={{ color: "text.secondary" }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Link
                    color="inherit"
                    href={phoneNumberUri}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {formattedPhoneNumber}
                  </Link>
                }
              />
            </ListItem>
          </List>
        </Stack>
      </Stack>
    </HelpDialog>
  );
};

export default AppointmentTooLateDialog;
