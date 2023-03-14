import CancelButton from "@/components/common/buttons/CancelButton";
import ValidateButton from "@/components/common/buttons/ValidateButton";
import HelpDialog from "@/components/common/dialogs/HelpDialog";
import Order from "@/types/order";
import { Button, Divider, Stack } from "@mui/material";
import ContactForm from "./form";
import ContractorSummary from "./ContractorSummary";

interface ContactDialogProps {
  open: boolean;
  onClose: () => void;
  order: Order;
}

const formId = "contact-form";

const ContactDialog: React.FC<ContactDialogProps> = ({
  open,
  onClose,
  order,
}) => {
  const contractor = {
    commercialName: order.commercialName,
    phoneNumber: order.commercialPhoneNumber,
    emails: order.emails,
  };

  return (
    <HelpDialog
      open={open}
      onClose={onClose}
      title="Un problème avec la prise de rendez-vous ?"
      text="Contactez votre conseiller d’agence par téléphone, ou remplissez le formulaire de contact."
      maxWidth={600}
      actions={
        <>
          <CancelButton fullWidth onClick={onClose}>
            Annuler
          </CancelButton>
          <ValidateButton fullWidth form={formId}>
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
        />
      </Stack>
    </HelpDialog>
  );
};

export default ContactDialog;
