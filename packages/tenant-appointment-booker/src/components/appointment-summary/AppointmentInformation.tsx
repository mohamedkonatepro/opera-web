import Appointment from "@/types/appointment";
import { AssignmentOutlined, FiberManualRecord } from "@mui/icons-material";
import { Link, Stack, Typography, useTheme } from "@mui/material";
import { DateTime, Duration } from "luxon";
import CalendarEditOutlined from "@/components/common/icons/CalendarEditOutlined";
import AgendaView from "./AgendaView";
import { AppointmentInformationProps } from "./types";
import getPreviousNearestBusinessDay from "@/utils/getPreviousNearestBusinessDay";
import orderIsEDL from "@/utils/orderIsEDL";
import Slot from "@/types/slot";

const effectiveAppointmentDateTooLate = (appointment: Appointment): boolean => {
  const previousNearestBusinessDay = getPreviousNearestBusinessDay(
    DateTime.fromISO(appointment.order.desiredDateByContractor)
  );
  const today = DateTime.now();
  if (previousNearestBusinessDay < today) return true;

  if (orderIsEDL(appointment.order.type)) {
    return previousNearestBusinessDay.diff(today, "hours").hours < 48;
  } else if (appointment.order.type === "D") {
    return previousNearestBusinessDay.diff(today, "hours").hours < 24;
  }

  return false;
};

const AppointmentInformation: React.FC<AppointmentInformationProps> = ({
  appointment,
  appointmentBookingId,
}) => {
  const { slot, order } = appointment;
  const appointmentSlot = slot as Slot;
  const appointmentDatetime = DateTime.fromISO(appointmentSlot.datetime);

  const theme = useTheme();

  const appointmentDateIsTooLate = effectiveAppointmentDateTooLate(appointment);

  return (
    <Stack direction={{ sm: "column", md: "row" }} spacing={3}>
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
            {appointmentDatetime.toFormat("cccc, dd LLLL yyyy à hh:mm")} pour{" "}
            {order.commercialName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            La durée de votre rendez-vous est de{" "}
            {Duration.fromObject({ minute: appointmentSlot.duration }).toHuman()}.
          </Typography>
        </Stack>
        {!appointmentDateIsTooLate && (
          <Stack
            spacing={1}
            divider={<FiberManualRecord sx={{ width: 4 }} />}
            justifyContent="center"
          >
            <Stack
              spacing={0.5}
              component={Link}
              href={`/?appointmentBookingId=${appointmentBookingId}&isEdit=true`}
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
