import CancelButton from "@/components/common/buttons/CancelButton";
import ValidateButton from "@/components/common/buttons/ValidateButton";
import HelpDialog from "@/components/common/dialogs/HelpDialog";
import { Divider, Stack } from "@mui/material";
import ContactForm from "./form";
import ContractorSummary from "./ContractorSummary";
import { ContactDialogProps } from "./types";
import { useState } from "react";
import orderIsEDL from "@/utils/orderIsEDL";

const formId = "contact-form";

const ContactDialog: React.FC<ContactDialogProps> = ({
  open,
  onClose,
  appointmentBooking,
  onSubmit,
  disabled,
}) => {
  const contractor = {
    commercialName: appointmentBooking.order.commercialName,
    phoneNumber: appointmentBooking.order.commercialPhoneNumber,
    emails: appointmentBooking.order.emails,
  };

  const [formIsValid, setFormIsValid] = useState(false);

  const canChangeDate =
    orderIsEDL(appointmentBooking.order.type) &&
    !appointmentBooking.appointment;
  const canCancelAppointment = !appointmentBooking.appointment;

  return (
    <HelpDialog
      open={open}
      onClose={onClose}
      title="Un problème avec la prise de rendez-vous ?"
      text="Contactez votre conseiller d’agence par téléphone, ou remplissez le formulaire de contact."
      maxWidth={600}
      actions={
        (canChangeDate || canCancelAppointment) && (
          <>
            <CancelButton fullWidth onClick={onClose} disabled={disabled}>
              Annuler
            </CancelButton>
            <ValidateButton
              fullWidth
              form={formId}
              disabled={disabled || !formIsValid}
            >
              Envoyer
            </ValidateButton>
          </>
        )
      }
    >
      <Stack
        spacing={3}
        divider={<Divider orientation="horizontal" flexItem />}
      >
        <ContractorSummary contractor={contractor} />
        {(canChangeDate || canCancelAppointment) && (
          <ContactForm
            id={formId}
            appointmentBooking={appointmentBooking}
            onSubmit={onSubmit}
            setFormIsValid={setFormIsValid}
            disabled={disabled}
            canChangeDate={canChangeDate}
            canCancelAppointment={canCancelAppointment}
          />
        )}
      </Stack>
    </HelpDialog>
  );
};

export default ContactDialog;
