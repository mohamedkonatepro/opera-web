import { AssignmentOutlined, FiberManualRecord } from "@mui/icons-material";
import { Link, Stack, Typography, useTheme } from "@mui/material";
import { DateTime, Duration } from "luxon";
import CalendarEditOutlined from "@/components/common/icons/CalendarEditOutlined";
import AgendaView from "./AgendaView";
import { AppointmentInformationProps } from "./types";
import Slot from "@/types/slot";
import appointmentDateIsTooLate from "@/utils/appointmentDateIsTooLate";
import Appointment from "@/types/appointment";

const AppointmentInformation: React.FC<AppointmentInformationProps> = ({
  appointmentBooking,
}) => {
  const { id, order } = appointmentBooking;
  const appointment = appointmentBooking.appointment as Appointment;
  const { slot } = appointment;
  const appointmentSlot = slot as Slot;
  const appointmentDatetime = DateTime.fromISO(appointmentSlot.datetime);

  const theme = useTheme();

  const isTooLate = appointmentDateIsTooLate(
    appointmentSlot.appointment_date,
    order.type
  );

  return (
    <Stack
      direction={{ sm: "column", md: "row" }}
      spacing={3}
      alignItems="flex-start"
    >
      <AgendaView appointmentDatetime={appointmentDatetime} />
      <Stack spacing={1}>
        <Stack spacing={0.5}>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <AssignmentOutlined sx={{ color: "text.secondary" }} />
            <Typography variant="body2" color="text.secondary">
              {order.familleLongue}
            </Typography>
          </Stack>
          <Typography variant="h6">Votre rendez-vous est confirmé !</Typography>
          <Typography variant="body2" color="text.secondary">
            {appointmentDatetime.toFormat("cccc, dd LLLL yyyy à HH:mm")} pour{" "}
            {order.commercialName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            La durée de votre rendez-vous est estimée à{" "}
            {Duration.fromObject({
              minute: appointmentSlot.duration,
            }).toHuman()}
            .
          </Typography>
        </Stack>
        {!isTooLate && (
          <Stack
            spacing={1}
            divider={<FiberManualRecord sx={{ width: 4 }} />}
            justifyContent="center"
          >
            <Stack
              spacing={0.5}
              component={Link}
              href={`/?appointmentBookingId=${id}&isEdit=true`}
              color="secondary.main"
              variant="body2"
              direction="row"
              sx={{ textDecorationColor: theme.palette.secondary.main }}
            >
              <CalendarEditOutlined />
              <span>Déplacer le rendez-vous</span>
            </Stack>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default AppointmentInformation;
