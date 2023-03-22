import UnderlinedButton from "@/components/common/buttons/UnderlinedButton";
import SuccessDialog from "@/components/common/dialogs/SuccessDialog";
import { processContactForm } from "@/queries/operaAppointments";
import AppointmentBooking from "@/types/appointmentBooking";
import dateIsBussinessDay from "@/utils/dateIsBussinessDay";
import orderIsEDL from "@/utils/orderIsEDL";
import { Stack, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { DateTime, Interval } from "luxon";
import { useEffect, useState } from "react";
import AppointmentTooLateDialog from "./AppointmentTooLateDialog";
import ContactDialog from "./ContactDialog";
import { ContactFormSubmitValuesWithType } from "./form/types";
import { ContactProps } from "./types";

const getDateToTest = (desiredDate: DateTime): DateTime => {
  const dateToTest = desiredDate.minus({ days: 1 }).set({ hour: 18 });
  if (!dateIsBussinessDay(dateToTest)) return getDateToTest(dateToTest);

  return dateToTest;
};

const desiredAppointmentDateIsTooLateToCancel = (
  appointmentBooking: AppointmentBooking
): boolean => {
  if (appointmentBooking.appointment) return false;
  const dateToTest = getDateToTest(
    DateTime.fromISO(appointmentBooking.order.desiredDateByContractor)
  );
  const today = DateTime.now();

  console.log(dateToTest, today);

  if (orderIsEDL(appointmentBooking.order.type)) {
    if (dateToTest < today) return true;
    return dateToTest.diff(today, "hours").hours < 48;
  }

  return false;
};

const Contact: React.FC<ContactProps> = ({ appointmentBooking }) => {
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [appointmentTooLateDialogOpen, setAppointmentTooLateDialogOpen] =
    useState(false);

  const handleClickContactButton = () => {
    if (desiredAppointmentDateIsTooLateToCancel(appointmentBooking)) {
      setAppointmentTooLateDialogOpen(true);
    } else {
      setContactDialogOpen(true);
    }
  };

  const today = DateTime.now();

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
    onSuccess: () => {
      setContactDialogOpen(false);
      setSuccessDialogOpen(true);
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
        order={appointmentBooking.order}
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
    </>
  );
};

export default Contact;
