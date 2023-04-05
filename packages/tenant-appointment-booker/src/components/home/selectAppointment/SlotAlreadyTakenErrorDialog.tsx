import ErrorDialog from "@/components/common/dialogs/ErrorDialog";
import { useQueryClient } from "@tanstack/react-query";
import { DateTime } from "luxon";

interface SlotAlreadyTakenErrorDialogProps {
  open: boolean;
  orderId: string;
  selectedDate: DateTime;
  minDate: DateTime;
  maxDate: DateTime;
  setOpenedState: (state: boolean) => void;
}

const SlotAlreadyTakenErrorDialog: React.FC<
  SlotAlreadyTakenErrorDialogProps
> = ({ open, setOpenedState, orderId, selectedDate, minDate, maxDate }) => {
  const queryClient = useQueryClient();

  const onCloseSlotAlreadyTakenDialog = async () => {
    setOpenedState(false);
    await queryClient.invalidateQueries({
      queryKey: ["operaSlots", orderId, selectedDate],
      exact: true,
    });
    await queryClient.invalidateQueries({
      queryKey: ["hasOperaSlotsBetweenDates", orderId, minDate, maxDate],
      exact: true,
    });
  };

  return (
    <ErrorDialog
      open={open}
      onClose={onCloseSlotAlreadyTakenDialog}
      title="Le créneau choisi est indisponible"
      text="Le créneau choisi n’est plus disponible. Veuillez en choisir un autre."
    />
  );
};

export default SlotAlreadyTakenErrorDialog;
