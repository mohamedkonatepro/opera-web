import Head from "next/head";
import { Box, Paper } from "@mui/material";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import mockOrder from "@/mocks/order";
import { NextPageContext } from "next";
import AppointmentBookingDesktop from "@/components/home/desktop";
import AppointmentBookingMobile from "@/components/home/mobile";
import getAppointmentBooking from "@/queries/getAppointmentBooking";

export const getServerSideProps = async (context: NextPageContext) => {
  const { oldOrderId, appointmentBookingId } = context.query;

  const queryClient = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } }});

  await queryClient.fetchQuery({
    queryKey: ["appointmentBookings", appointmentBookingId],
    queryFn: ({ queryKey }) => getAppointmentBooking(queryKey[1] as string),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      operaOrderId: oldOrderId,
      appointmentBookingId: appointmentBookingId,
    },
  };
};

const Home = ({
  operaOrderId,
  appointmentBookingId,
}: {
  operaOrderId: string;
  appointmentBookingId: string;
}) => {
  const { data, isFetching, isLoading, isSuccess } = useQuery({
    queryKey: ["appointmentBooking", appointmentBookingId],
    queryFn: ({ queryKey }) => getAppointmentBooking(queryKey[1] as string),
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
