import Head from "next/head";
import { Box, Paper } from "@mui/material";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import axios from "axios";
import mockOrder from "@/mocks/order";
import { NextPageContext } from "next";
import AppointmentBookingDesktop from "@/components/home/desktop";
import AppointmentBookingMobile from "@/components/home/mobile";

const getOperaOrder = async (orderId: string) => {
  try {
    const response = await axios(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/opera-orders/${orderId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getServerSideProps = async (context: NextPageContext) => {
  const { oldOrderId, appointmentBookingId } = context.query;

  const queryClient = new QueryClient();

  await queryClient.fetchQuery({
    queryKey: ["operaOrder", oldOrderId],
    queryFn: ({ queryKey }) => getOperaOrder(queryKey[1] as string),
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
  const { data } = useQuery({
    queryKey: ["operaOrder", operaOrderId],
    queryFn: ({ queryKey }) => getOperaOrder(queryKey[1] as string),
  });

  const order = data?.order || mockOrder;

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
