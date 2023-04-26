import React, { useState } from "react";
import Head from "next/head";
import { Box, Divider, Paper, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import AppointmentInformation from "@/components/home/appointmentInformation";
import AppointmentResponseOptions from "@/components/common/AppointmentResponseOptions";
import { getAppointmentBooking } from "@/queries/appointmentBookings";

const TenantRequest = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: appointmentBooking,
    isLoading,
    isError,
  } = useQuery(
    ["appointmentBooking", id],
    () => getAppointmentBooking(id as string),
    {
      enabled: !!id,
    }
  );

  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event: any) => {
    setSelectedValue(event.target.value);
  };

  return (
    <>
      <Head>
        <title>Demande locataire</title>
        <meta name="description" content="Demande locataire" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper variant="outlined" sx={{ width: "656px" }}>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={3}
          >
            <Box m={3}>
              <Box>
                {isLoading ? (
                  <p>Chargement...</p>
                ) : isError ? (
                  <p>Erreur lors du chargement des données.</p>
                ) : (
                  <>
                    <AppointmentInformation
                      appointmentBooking={appointmentBooking}
                      tenantRequest={appointmentBooking.tenant_request}
                    />
                  </>
                )}
              </Box>
            </Box>
          </Stack>
        </Paper>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "16px",
        }}
      >
        {!appointmentBooking?.tenant_request?.treated && (
          <Paper variant="outlined" sx={{ width: "656px" }}>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              spacing={3}
            >
              <Box m={3} sx={{ width: "100%" }}>
                <Box sx={{ width: "100%" }}>
                  {isLoading ? (
                    <p>Chargement...</p>
                  ) : isError ? (
                    <p>Erreur lors du chargement des données.</p>
                  ) : (
                    <>
                      <AppointmentResponseOptions
                        selectedValue={selectedValue}
                        handleChange={handleChange}
                        orderId={appointmentBooking.order_id}
                        tenantRequest={appointmentBooking.tenant_request}
                        appointmentBookingId={appointmentBooking.id}
                      />
                    </>
                  )}
                </Box>
              </Box>
            </Stack>
          </Paper>
        )}
      </Box>
    </>
  );
};

export default TenantRequest;
