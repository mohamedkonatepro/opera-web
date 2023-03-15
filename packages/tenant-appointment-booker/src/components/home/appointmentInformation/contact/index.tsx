import UnderlinedButton from "@/components/common/buttons/UnderlinedButton";
import SuccessDialog from "@/components/common/dialogs/SuccessDialog";
import { sendNoteContactForm } from "@/queries/operaOrders";
import Order from "@/types/order";
import { Stack, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import ContactDialog from "./ContactDialog";
import {
  ContactFormSubmitValues,
  ContactFormSubmitValuesWithType,
} from "./form/types";
import { ContactProps } from "./types";

const Contact: React.FC<ContactProps> = ({ order }) => {
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  const handleClickContactButton = () => {
    setContactDialogOpen(true);
  };

  const handleOnCloseContactDialog = () => {
    setContactDialogOpen(false);
  };

  const handleOnCloseSuccessDialog = () => {
    setSuccessDialogOpen(false);
  };

  const mutation = useMutation({
    mutationFn: sendNoteContactForm,
    onSuccess: () => {
      setContactDialogOpen(false);
      setSuccessDialogOpen(true);
    },
  });

  const handleOnSubmitContactForm = (
    values: ContactFormSubmitValuesWithType
  ) => {
    mutation.mutate({ ...values, orderId: order.orderId });
  };

  return (
    <>
      <Stack
        direction={{ sm: "column", md: "row" }}
        alignItems="flex-start"
        spacing={1}
      >
        <Typography variant="body2">Un empêchement, un problème ?</Typography>
        <UnderlinedButton onClick={handleClickContactButton}>
          Contactez-nous
        </UnderlinedButton>
      </Stack>
      <ContactDialog
        open={contactDialogOpen}
        onClose={handleOnCloseContactDialog}
        order={order}
        onSubmit={handleOnSubmitContactForm}
        disabled={mutation.isLoading}
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
