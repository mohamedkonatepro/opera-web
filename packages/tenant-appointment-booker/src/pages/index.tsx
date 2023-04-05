import Head from "next/head";
import {
  Box,
  Link,
  Paper,
  Stack,
  Theme,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { NextPageContext } from "next";
import AppointmentBookingDesktop from "@/components/home/desktop";
import AppointmentBookingMobile from "@/components/home/mobile";
import * as appointmentBookingApi from "./api/appointment-bookings/[id]";
import * as hasOperaSlotsApi from "@/pages/api/opera-slots/has-slots-between-dates";
import * as appointmentBookingClient from "@/queries/appointmentBookings";
import { DateTime } from "luxon";
import { useRouter } from "next/router";
import { ChevronRight } from "@mui/icons-material";

export const getServerSideProps = async (context: NextPageContext) => {
  const { appointmentBookingId, isEdit } = context.query;
  if (!appointmentBookingId) {
    return {
      notFound: true,
    };
  }
  const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } },
  });

  const appointmentBooking = await queryClient.fetchQuery({
    queryKey: ["appointmentBookings", appointmentBookingId],
    queryFn: ({ queryKey }) =>
      appointmentBookingApi.getAppointmentBooking(queryKey[1] as string),
  });

  if (appointmentBooking.appointment !== null && !isEdit) {
    return {
      redirect: {
        destination: `/appointment-summary/${appointmentBookingId}`,
        permanent: false,
      },
    };
  }

  const minimumDate = appointmentBooking.order.minimumDate
    ? DateTime.fromISO(appointmentBooking.order.minimumDate)
    : DateTime.fromISO(appointmentBooking.order.desiredDateByContractor).minus({
        months: 1,
      });

  const tomorrow = DateTime.local().plus({ days: 1 });

  const minDate = DateTime.max(tomorrow, minimumDate).toISODate();

  const maxDate = (
    appointmentBooking.order.maximumDate
      ? DateTime.fromISO(appointmentBooking.order.maximumDate)
      : DateTime.fromISO(appointmentBooking.order.desiredDateByContractor).plus(
          { months: 1 }
        )
  ).toISODate();

  await queryClient.prefetchQuery({
    queryKey: [
      "hasSlotsBetweenDates",
      appointmentBooking.order.orderId,
      minDate,
      maxDate,
    ],
    queryFn: ({ queryKey }) =>
      hasOperaSlotsApi.hasOperaSlotsBetweenDates(
        queryKey[1] as string,
        queryKey[2] as string,
        queryKey[3] as string
      ),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      appointmentBookingId,
      minDate,
      maxDate,
    },
  };
};

const Home = ({
  appointmentBookingId,
  minDate,
  maxDate,
}: {
  appointmentBookingId: string;
  minDate: string;
  maxDate: string;
}) => {
  const router = useRouter();
  const { isEdit } = router.query;

  const { data, isFetching, isLoading, isSuccess } = useQuery({
    queryKey: ["appointmentBookings", appointmentBookingId],
    queryFn: ({ queryKey }) =>
      appointmentBookingClient.getAppointmentBooking(queryKey[1] as string),
    onSuccess: (appointmentBooking) => {
      if (appointmentBooking.appointment !== null && !isEdit) {
        router.push(`/appointment-summary/${appointmentBookingId}`);
      }
    },
  });

  const theme = useTheme();
  const matchesMD = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));

  if (isFetching || isLoading || !isSuccess) return null;

  if (!data) return null;

  const appointmentBooking = data;
  const appointment = appointmentBooking.appointment;

  return (
    <>
      <Head>
        <title>Prise RDV locataire</title>
        <meta name="description" content="Prise de RDV locataire" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack spacing={6} justifyContent="center">
        <Paper variant="outlined">
          {matchesMD && (
            <AppointmentBookingDesktop
              appointmentBooking={appointmentBooking}
              minDate={minDate}
              maxDate={maxDate}
            />
          )}
          {!matchesMD && (
            <AppointmentBookingMobile
              appointmentBooking={appointmentBooking}
              minDate={minDate}
              maxDate={maxDate}
            />
          )}
        </Paper>
        {isEdit && appointment && (
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={0.5}
            component={Link}
            href={`/appointment-summary/${appointmentBookingId}`}
            variant="body2"
            color="text.secondary"
            sx={{ textDecorationColor: theme.palette.text.secondary }}
          >
            <span>
              Je souhaite conserver mon rendez-vous du{" "}
              {DateTime.fromISO(appointment.slot.datetime).toFormat(
                "EEEE d LLLL à HH:mm"
              )}
            </span>
            <ChevronRight />
          </Stack>
        )}
      </Stack>
    </>
  );
};

export default Home;
