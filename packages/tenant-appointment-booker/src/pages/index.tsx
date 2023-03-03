import Head from "next/head";
import { Box, Divider, Paper, Stack } from "@mui/material";
import AppointmentInformation from "@/components/home/appointmentInformation";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import axios from "axios";
import mockOrder from "@/mocks/order";
import { NextPageContext } from "next";
import SelectAppointment from "@/components/home/selectAppointment";

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
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={3}
        >
          <Box m={3} mr={0}>
            <Box width={540}>
              <AppointmentInformation order={order} />
            </Box>
          </Box>
          <Box width={1}>
            <Box m={3} ml={0}>
              <Box width={356}>
                <SelectAppointment
                  order={order}
                  appointmentBookingId={appointmentBookingId}
                />
              </Box>
            </Box>
          </Box>
        </Stack>
      </Paper>
    </>
  );
};

export default Home;
