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

  const handleOnCloseContactDialog = () => {
    setContactDialogOpen(false);
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
      />
    </>
  );
};

export default Contact;
