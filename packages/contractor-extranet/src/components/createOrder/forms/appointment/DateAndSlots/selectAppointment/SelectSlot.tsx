import Slot from "@/types/Slot";
import { useQuery } from "@tanstack/react-query";
import { Button, Skeleton } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { DateTime } from "luxon";
import { getOperaSlots } from "@/queries/operaSlots";
import OutlinedButton from "@/components/common/buttons/OutlinedButton";

interface SelectSlotProps {
  selectedDate: DateTime;
  selectedSlot?: Slot;
  disabled?: boolean;
  onSelectSlot: (slot: Slot) => void;
}

const SelectSlot: React.FC<SelectSlotProps> = ({
  selectedDate,
  selectedSlot,
  onSelectSlot,
  disabled,
}) => {
  const { isFetching, isLoading, isSuccess, data } = useQuery<Slot[]>({
    queryKey: ["operaSlots", selectedDate],
    queryFn: ({ queryKey }) =>
      getOperaSlots(queryKey[1] as string, queryKey[2] as DateTime),
  });

  const handleOnClickSlot = (slot: Slot) => {
    onSelectSlot(slot);
  };

  if (isFetching || isLoading) {
    return (
      <Grid container spacing={1}>
        {Array.from({ length: 5 }).map((_, index) => (
          <Grid key={index} sm={2.4}>
            <Skeleton variant="rectangular" width="100%">
              <Button fullWidth>...</Button>
            </Skeleton>
          </Grid>
        ))}
      </Grid>
    );
  }

  const operaSlots = isSuccess ? data : [];

  return (
    <Grid container spacing={1}>
      {operaSlots.map((slot) => (
        <Grid sm={2.4} key={slot.id}>
          <OutlinedButton
            disabled={disabled}
            selected={selectedSlot?.id === slot.id}
            padding="small"
            onClick={() => {
              handleOnClickSlot(slot);
            }}
            fullWidth
          >
            {slot.startTimeSlotOfAppointment}
          </OutlinedButton>
        </Grid>
      ))}
    </Grid>
  );
};

export default SelectSlot;
