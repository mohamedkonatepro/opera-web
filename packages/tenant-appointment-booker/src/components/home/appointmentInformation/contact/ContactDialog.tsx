import CancelButton from "@/components/common/buttons/CancelButton";
import ValidateButton from "@/components/common/buttons/ValidateButton";
import HelpDialog from "@/components/common/dialogs/HelpDialog";
import { Divider, Stack } from "@mui/material";
import ContactForm from "./form";
import ContractorSummary from "./ContractorSummary";
import { ContactDialogProps } from "./types";
import { useState } from "react";

const formId = "contact-form";

const ContactDialog: React.FC<ContactDialogProps> = ({
  open,
  onClose,
  order,
  onSubmit,
  disabled,
}) => {
  const contractor = {
    commercialName: order.commercialName,
    phoneNumber: order.commercialPhoneNumber,
    emails: order.emails,
  };

  const [formIsValid, setFormIsValid] = useState(false);

  return (
    <HelpDialog
      open={open}
      onClose={onClose}
      title="Un problème avec la prise de rendez-vous ?"
      text="Contactez votre conseiller d’agence par téléphone, ou remplissez le formulaire de contact."
      maxWidth={600}
      actions={
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
      }
    >
      <Stack
        spacing={3}
        divider={<Divider orientation="horizontal" flexItem />}
      >
        <ContractorSummary contractor={contractor} />
        <ContactForm
          id={formId}
          defaultValues={{
            desiredDateByContractor: order.desiredDateByContractor,
          }}
          onSubmit={onSubmit}
          setFormIsValid={setFormIsValid}
          disabled={disabled}
        />
      </Stack>
    </HelpDialog>
  );
};

export default ContactDialog;
