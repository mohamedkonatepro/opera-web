import HelpDialog from "@/components/common/dialogs/HelpDialog";

interface ContactDialogProps {
  open: boolean;
  onClose: () => void;
}

const ContactDialog: React.FC<ContactDialogProps> = ({ open, onClose }) => {
  return (
    <HelpDialog
      open={open}
      onClose={onClose}
      title="Un problème avec la prise de rendez-vous ?"
      text="Contactez votre conseiller d’agence par téléphone, ou remplissez le formulaire de contact."
    />
  )
}

export default ContactDialog;
