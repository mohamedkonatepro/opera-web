import Head from 'next/head'
import { Box, Divider, Paper, Stack } from '@mui/material'
import AppointmentInformation from '@/components/home/appointmentInformation'
// import SelectAppointment from '@/components/home/SelectAppointment'

export default function Home() {
  return (
    <>
      <Head>
        <title>Prise RDV locataire</title>
        <meta name="description" content="Prise de RDV locataire" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Paper variant="outlined">
        <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={3}>
          <Box width="60%" p={3} pr={0}>
            <AppointmentInformation />
          </Box>
          <Box p={3} pl={0} width="40%">
            Select appointment
          </Box>
        </Stack>
      </Paper>
    </>
  )
}
