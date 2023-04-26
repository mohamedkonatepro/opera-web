import ErrorDialog from "@/components/common/dialogs/ErrorDialog";
import { sendNoSlotsAvailableEmail } from "@/queries/operaSlots";
import { DialogContentText } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

interface NoSlotsAvailableDialogProps {
  orderId: string;
  appointmentBookingId: string;
  open: boolean;
  setOpenedState: (state: boolean) => void;
}

const NoSlotsAvailableDialog: React.FC<NoSlotsAvailableDialogProps> = ({
  appointmentBookingId,
  open,
  setOpenedState,
}) => {
  const { mutate } = useMutation({
    mutationFn: sendNoSlotsAvailableEmail,
  });

  useEffect(() => {
    if (open) {
      mutate({ appointmentBookingId });
    }
  }, [open, appointmentBookingId, mutate]);

  const onClose = () => {
    setOpenedState(false);
  };

  return (
    <ErrorDialog
      open={open}
      maxWidth={456}
      onClose={onClose}
      title="Pas de créneau disponible pour le moment"
      text={
        <>
          <DialogContentText variant="body2">
            En raison d’une forte demande, il n’y a plus de créneau disponible
            pour le moment. Nos agents se mobilisent pour trouver des
            disponibilités.
          </DialogContentText>
          <br />
          <DialogContentText variant="body2">
            Nous vous recontactons au plus vite.
          </DialogContentText>
        </>
      }
    />
  );
};

export default NoSlotsAvailableDialog;
