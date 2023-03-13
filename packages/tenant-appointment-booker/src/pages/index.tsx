import Head from "next/head";
import { Box, Paper, Theme, useMediaQuery } from "@mui/material";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { NextPageContext } from "next";
import AppointmentBookingDesktop from "@/components/home/desktop";
import AppointmentBookingMobile from "@/components/home/mobile";
import * as appointmentBookingApi from "./api/appointment-bookings/[id]";
import * as hasOperaSlotsApi from "@/pages/api/opera-slots/has-slots-between-dates";
import * as appointmentBookingClient from "@/queries/appointmentBookings";
import { DateTime } from "luxon";

export const getServerSideProps = async (context: NextPageContext) => {
  const { appointmentBookingId } = context.query;

  const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } },
  });

  const appointmentBooking = await queryClient.fetchQuery({
    queryKey: ["appointmentBookings", appointmentBookingId],
    queryFn: ({ queryKey }) =>
      appointmentBookingApi.getAppointmentBooking(queryKey[1] as string),
  });

  const minDate = (
    appointmentBooking.order.minimumDate
      ? DateTime.fromISO(appointmentBooking.order.minimumDate)
      : DateTime.fromISO(
          appointmentBooking.order.desiredDateByContractor
        ).minus({ months: 1 })
  ).toISODate();
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
      appointmentBookingId: appointmentBookingId,
    },
  };
};

const Home = ({ appointmentBookingId }: { appointmentBookingId: string }) => {
  const { data, isFetching, isLoading, isSuccess } = useQuery({
    queryKey: ["appointmentBookings", appointmentBookingId],
    queryFn: ({ queryKey }) =>
      appointmentBookingClient.getAppointmentBooking(queryKey[1] as string),
  });

  const matchesMD = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));

  if (isFetching || isLoading || !isSuccess) return null;

  if (!data) return null;

  const appointmentBooking = data;
  const order = appointmentBooking.order;

  return (
    <>
      <Head>
        <title>Prise RDV locataire</title>
        <meta name="description" content="Prise de RDV locataire" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Paper variant="outlined">
        {matchesMD && (
          <AppointmentBookingDesktop
            order={order}
            appointmentBookingId={appointmentBookingId}
          />
        )}
        {!matchesMD && (
          <AppointmentBookingMobile
            order={order}
            appointmentBookingId={appointmentBookingId}
          />
        )}
      </Paper>
    </>
  );
};

export default Home;
