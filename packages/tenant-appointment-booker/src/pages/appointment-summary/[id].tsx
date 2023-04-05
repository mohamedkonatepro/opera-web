import AppointmentInformation from "@/components/appointment-summary/AppointmentInformation";
import AppointmentModalities from "@/components/appointment-summary/AppointmentModalities";
import RealEstateAndTenantInformation from "@/components/appointment-summary/RealEstateAndTenantInformation";
import { Divider, Paper, Stack, Typography } from "@mui/material";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { NextPageContext } from "next";
import Head from "next/head";
import * as appointmentBookingApi from "@/pages/api/appointment-bookings/[id]";
import * as appointmentBookingClient from "@/queries/appointmentBookings";
import { useRouter } from "next/router";
import ErrorDialog from "@/components/common/dialogs/ErrorDialog";
import Contact from "@/components/common/contact";

export const getServerSideProps = async (ctx: NextPageContext) => {
  const appointmentBookingId = ctx.query.id as string;
  const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } },
  });

  await queryClient.prefetchQuery({
    queryKey: ["appointmentBookings", appointmentBookingId],
    queryFn: ({ queryKey }) =>
      appointmentBookingApi.getAppointmentBooking(queryKey[1] as string),
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
  const router = useRouter();
  const { isFetching, isLoading, isSuccess, data } = useQuery({
    queryKey: ["appointmentBookings", appointmentBookingId],
    queryFn: ({ queryKey }) =>
      appointmentBookingClient.getAppointmentBooking(appointmentBookingId),
  });

  if (isFetching || isLoading || !isSuccess) return null;

  if (!data) return null;

  const appointmentBooking = data;
  const tenantRequest = appointmentBooking.tenant_request;

  if (!appointmentBooking.appointment) {
    return (
      <>
        <Head>
          <title>Confirmation RDV Locataire</title>
          <meta name="description" content="Confirmation RDV locataire" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ErrorDialog
          open
          title="RDV non pris"
          text="Vous n'avez pas encore pris de RDV, veuillez en prendre un avant de continuer."
          onClose={() =>
            router.push(`/?appointmentBookingId=${appointmentBookingId}`)
          }
        />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Confirmation RDV Locataire</title>
        <meta name="description" content="Confirmation RDV locataire" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Paper variant="outlined">
        <Stack
          divider={<Divider orientation="horizontal" flexItem />}
          spacing={3}
          p={3}
        >
          <AppointmentInformation appointmentBooking={appointmentBooking} />
          <RealEstateAndTenantInformation
            order={appointmentBooking.order}
            appointmentBookingId={appointmentBookingId}
          />
          <AppointmentModalities orderType={appointmentBooking.order.type} />
          {!tenantRequest && (
            <Contact appointmentBooking={appointmentBooking} />
          )}
        </Stack>
      </Paper>
    </>
  );
};

export default SummaryAppointment;
