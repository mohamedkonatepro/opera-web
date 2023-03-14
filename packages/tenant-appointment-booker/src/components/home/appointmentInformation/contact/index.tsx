import UnderlinedButton from "@/components/common/buttons/UnderlinedButton";
import Order from "@/types/order";
import { Stack, Typography } from "@mui/material";
import { useState } from "react";
import ContactDialog from "./ContactDialog";

interface ContactProps {
  order: Order;
}

const Contact: React.FC<ContactProps> = ({ order }) => {
  const [contactDialogOpen, setContactDialogOpen] = useState(false);

  const handleClickContactButton = () => {
    setContactDialogOpen(true);
  };


  return (
    <>
      <Stack direction="row" spacing={1}>
        <Typography variant="body2">Un empêchement, un problème ?</Typography>
        <UnderlinedButton onClick={handleClickContactButton}>Contactez-nous</UnderlinedButton>
      </Stack>
      <ContactDialog open={contactDialogOpen} onClose={() => setContactDialogOpen(false)} />
    </>
  );
};

export default Contact;
