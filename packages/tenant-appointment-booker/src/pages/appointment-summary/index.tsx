import AppointmentInformation from "@/components/appointment-summary/AppointmentInformation";
import AppointmentModalities from "@/components/appointment-summary/AppointmentModalities";
import RealEstateAndTenantInformation from "@/components/appointment-summary/RealEstateAndTenantInformation";
import { Box, Divider, Paper, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";

export const getStaticProps = async () => {
  return {
    props: {},
  };
};

const SummaryAppointment = () => {
  return (
    <>
      <Head>
        <title>Prise RDV locataire</title>
        <meta name="description" content="Prise de RDV locataire" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Paper variant="outlined">
        <Stack
          divider={<Divider orientation="horizontal" flexItem />}
          spacing={3}
          p={3}
        >
          <AppointmentInformation />
          <RealEstateAndTenantInformation />
          <AppointmentModalities />
        </Stack>
      </Paper>
    </>
  );
};

export default SummaryAppointment;
