import UnderlinedButton from "@/components/common/buttons/UnderlinedButton";
import SuccessDialog from "@/components/common/dialogs/SuccessDialog";
import { processContactForm } from "@/queries/operaAppointments";
import appointmentDateIsTooLate from "@/utils/appointmentDateIsTooLate";
import { Stack, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import ErrorDialog from "../dialogs/ErrorDialog";
import AppointmentTooLateDialog from "./AppointmentTooLateDialog";
import ContactDialog from "./ContactDialog";
import { ContactFormSubmitValuesWithType } from "./form/types";
import { ContactProps } from "./types";

const Contact: React.FC<ContactProps> = ({ appointmentBooking }) => {
  const queryClient = useQueryClient();

  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [appointmentTooLateDialogOpen, setAppointmentTooLateDialogOpen] =
    useState(false);

  const handleClickContactButton = () => {
    if (
      appointmentDateIsTooLate(
        appointmentBooking.order.desiredDateByContractor,
        appointmentBooking.order.type
      )
    ) {
      setAppointmentTooLateDialogOpen(true);
    } else {
      setContactDialogOpen(true);
    }
  };

  const handleOnCloseContactDialog = () => {
    setContactDialogOpen(false);
  };

  const handleOnCloseSuccessDialog = () => {
    setSuccessDialogOpen(false);
  };

  const handleOnCloseAppointmentTooLateDialog = () => {
    setAppointmentTooLateDialogOpen(false);
  };

  const mutation = useMutation({
    mutationFn: processContactForm,
    onSuccess: async () => {
      setContactDialogOpen(false);
      setSuccessDialogOpen(true);
      await queryClient.invalidateQueries([
        "appointmentBookings",
        appointmentBooking.id,
      ]);
    },
    onError: () => {
      setContactDialogOpen(false);
      setErrorDialogOpen(true);
    },
  });

  const handleOnSubmitContactForm = (
    values: ContactFormSubmitValuesWithType
  ) => {
    mutation.mutate({ ...values, appointmentBookingId: appointmentBooking.id });
  };

  return (
    <>
      <Stack
        direction={{ sm: "column", md: "row" }}
        alignItems="flex-start"
        spacing={1}
      >
        <Typography variant="body2">Un empêchement, un problème ?</Typography>
        <UnderlinedButton onClick={handleClickContactButton} variant="body2">
          Contactez-nous
        </UnderlinedButton>
      </Stack>
      <ContactDialog
        open={contactDialogOpen}
        onClose={handleOnCloseContactDialog}
        appointmentBooking={appointmentBooking}
        onSubmit={handleOnSubmitContactForm}
        disabled={mutation.isLoading}
      />
      <AppointmentTooLateDialog
        open={appointmentTooLateDialogOpen}
        onClose={handleOnCloseAppointmentTooLateDialog}
        appointmentBooking={appointmentBooking}
      />

      <SuccessDialog
        open={successDialogOpen}
        onClose={handleOnCloseSuccessDialog}
        title="Votre message a été envoyé !"
        text="Votre message a été transmis à l’agence. Vous serez contacté au plus vite pour confirmer votre nouveau rendez-vous."
        maxWidth={456}
      />
      <ErrorDialog
        title="Une erreur est survenue"
        text="Une erreur est survenue lors de l’envoi de votre demande. Veuillez réessayer ultérieurement."
        open={errorDialogOpen}
        onClose={() => setErrorDialogOpen(false)}
      />
    </>
  );
};

export default Contact;
