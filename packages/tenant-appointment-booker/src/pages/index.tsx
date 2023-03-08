import Head from "next/head";
import { Box, Paper } from "@mui/material";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import mockOrder from "@/mocks/order";
import { NextPageContext } from "next";
import AppointmentBookingDesktop from "@/components/home/desktop";
import AppointmentBookingMobile from "@/components/home/mobile";
import * as appointmentBookingApi from "./api/appointment-bookings/[id]";
import * as appointmentBookingClient from '@/queries/appointmentBookings'

export const getServerSideProps = async (context: NextPageContext) => {
  const { appointmentBookingId } = context.query;

  const queryClient = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } }});

  await queryClient.prefetchQuery({
    queryKey: ["appointmentBookings", appointmentBookingId],
    queryFn: ({ queryKey }) => appointmentBookingApi.getAppointmentBooking(queryKey[1] as string),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      appointmentBookingId: appointmentBookingId,
    },
  };
};

const Home = ({
  appointmentBookingId,
}: {
  appointmentBookingId: string;
}) => {
  const { data, isFetching, isLoading, isSuccess } = useQuery({
    queryKey: ["appointmentBookings", appointmentBookingId],
    queryFn: ({ queryKey }) => appointmentBookingClient.getAppointmentBooking(queryKey[1] as string),
  });

  if (isFetching || isLoading || !isSuccess) return null;

  if (!data) return null;

  const appointmentBooking = data
  const order = !appointmentBooking.order && process.env.NODE_ENV === "development" ? mockOrder : appointmentBooking.order;

  return (
    <>
      <Head>
        <title>Prise RDV locataire</title>
        <meta name="description" content="Prise de RDV locataire" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Paper variant="outlined">
        <Box display={{ sm: "none", md: "block" }}>
          <AppointmentBookingDesktop
            order={order}
            appointmentBookingId={appointmentBookingId}
          />
        </Box>
        <Box display={{ sm: "block", md: "none" }}>
          <AppointmentBookingMobile
            order={order}
            appointmentBookingId={appointmentBookingId}
          />
        </Box>
      </Paper>
    </>
  );
};

export default Home;
