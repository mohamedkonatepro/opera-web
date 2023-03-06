import Appointment from "@/types/appointment";
import { Assignment, AssignmentOutlined } from "@mui/icons-material";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { DateTime } from "luxon";
import AgendaView from "./AgendaView";

interface AppointmentInformationProps {
  appointment: Appointment;
}

const AppointmentInformation: React.FC<AppointmentInformationProps> = ({
  appointment,
}) => {
  const { slot, order } = appointment;

  const appointmentDatetime = DateTime.fromISO(slot.datetime);

  return (
    <Stack direction={{ sm: "column", md: "row" }} spacing={3}>
      <AgendaView appointmentDatetime={appointmentDatetime} />
      <Stack spacing={0.5}>
        <Stack direction="row" spacing={0.5} alignItems="center">
          <AssignmentOutlined />
          <Typography variant="body2" color="text.secondary">
            {order.familleLongue}
          </Typography>
        </Stack>
        <Typography variant="h5" fontWeight="500" fontSize="18px">
          Votre rendez-vous est confirmé !
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {appointmentDatetime.toFormat("cccc, dd LLLL yyyy à hh:mm")} pour{" "}
          {order.commercialName}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default AppointmentInformation;
