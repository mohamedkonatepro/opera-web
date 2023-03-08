import AppointmentInformation from "@/components/appointment-summary/AppointmentInformation";
import AppointmentModalities from "@/components/appointment-summary/AppointmentModalities";
import RealEstateAndTenantInformation from "@/components/appointment-summary/RealEstateAndTenantInformation";
import { Divider, Paper, Stack } from "@mui/material";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { NextPageContext } from "next";
import Head from "next/head";
import * as appointmentBookingApi from "@/pages/api/appointment-bookings/[id]";
import * as appointmentBookingClient from "@/queries/appointmentBookings";

export const getServerSideProps = async (ctx: NextPageContext) => {
  const appointmentBookingId = ctx.query.id as string;
  const queryClient = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } });

  await queryClient.fetchQuery({
    queryKey: ["appointmentBookings", appointmentBookingId],
    queryFn: ({ queryKey }) => appointmentBookingApi.getAppointmentBooking(queryKey[1] as string),
  });

  return {
    props: {
      appointmentBookingId,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const SummaryAppointment = ({
  appointmentBookingId,
}: {
  appointmentBookingId: string;
}) => {
  const { isFetching, isLoading, isSuccess, data } = useQuery({
    queryKey: ["appointmentBookings", appointmentBookingId],
    queryFn: ({ queryKey }) => appointmentBookingClient.getAppointmentBooking(queryKey[1] as string),
  });

  if (isFetching || isLoading || !isSuccess) return null;

  if (!data) return null;

  const appointmentBooking = data;

  return (
    <>
      <Head>
        <title>Confirmation RDV Locataire</title>
        <meta name="description" content="Prise de RDV locataire" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Paper variant="outlined">
        <Stack
          divider={<Divider orientation="horizontal" flexItem />}
          spacing={3}
          p={3}
        >
          <AppointmentInformation
            appointment={appointmentBooking.appointment}
          />
          <RealEstateAndTenantInformation
            order={appointmentBooking.appointment.order}
          />
          <AppointmentModalities />
        </Stack>
      </Paper>
    </>
  );
};

export default SummaryAppointment;
