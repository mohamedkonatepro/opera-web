import Order from "@/types/order";
import { Button, Stack, Typography } from "@mui/material";
import AppointmentInitialDateAlertText from "./AppointmentInitialDateAlertText";
import SelectAppointmentDayCalendar from "./SelectAppointmentDayCalendar";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import Slot from "@/types/slot";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { updateAppointmentBooking } from "@/queries/appointmentBookings";
import * as operaSlotsClient from "@/queries/operaSlots";
import SlotAlreadyTakenErrorDialog from "./SlotAlreadyTakenErrorDialog";
import NoSlotsAvailableDialog from "./NoSlotsAvailableDialog";
import ValidateButton from "@/components/common/buttons/ValidateButton";
import getFamilyLongName from "@/utils/getFamilyLongName";
import Appointment from "@/types/appointment";
interface SelectAppointmentProps {
  order: Order;
  appointment?: Appointment;
  appointmentBookingId: string;
  minDate: string;
  maxDate: string;
  isEdit?: boolean;
}

const SelectAppointment: React.FC<SelectAppointmentProps> = ({
  order,
  appointment,
  appointmentBookingId,
  minDate: minDateString,
  maxDate: maxDateString,
  isEdit,
}) => {
  const desiredDateByContractor = DateTime.fromISO(
    order.desiredDateByContractor
  );

  const [selectedDate, setSelectedDate] = useState<DateTime>(
    appointment && appointment.slot
      ? DateTime.fromISO(appointment.slot.appointment_date)
      : desiredDateByContractor
  );
  const initialSlot = appointment && appointment.slot;
  const [selectedSlot, setSelectedSlot] = useState<Slot | undefined>(
    initialSlot
  );

  const [slotAlreadyTakenDialogOpened, setSlotAlreadyTakenDialogOpened] =
    useState(false);
  const [noSlotsAvailableDialogOpened, setNoSlotsAvailableDialogOpened] =
    useState(false);

  const minDate = DateTime.fromISO(minDateString);
  const maxDate = DateTime.fromISO(maxDateString);

  const hasSlotsBetweenDatesQueryRes = useQuery({
    queryKey: [
      "hasSlotsBetweenDates",
      order.orderId,
      minDate.toISODate(),
      maxDate.toISODate(),
    ],
    queryFn: ({ queryKey }) =>
      operaSlotsClient.hasOperaSlotsBetweenDates(
        queryKey[1] as string,
        queryKey[2] as string,
        queryKey[3] as string
      ),
    onSuccess: (data) => {
      if (!data && !noSlotsAvailableDialogOpened) {
        setNoSlotsAvailableDialogOpened(true);
      }
    },
  });

  const router = useRouter();
  const mutation = useMutation({
    mutationFn: updateAppointmentBooking,
    onSuccess: () => {
      router.push(`/appointment-summary/${appointmentBookingId}`);
    },
    onError: (error: any) => {
      switch (error.response.status) {
        case 409: {
          return router.push(`/appointment-summary/${appointmentBookingId}`);
        }
        case 410: {
          return setSlotAlreadyTakenDialogOpened(true);
        }
        default: {
          console.error(error);
          return;
        }
      }
    },
  });

  const handleOnSelectDate = (date: DateTime) => {
    setSelectedDate(date);
    setSelectedSlot(undefined);
  };

  const handleOnSelectSlot = (slot: Slot) => {
    setSelectedSlot(slot);
  };

  const handleOnClickValidate = () => {
    mutation.mutate({
      appointmentBookingId,
      selectedSlot: selectedSlot as Slot,
    });
  };

  const hasSlotsBetweenDates: boolean = hasSlotsBetweenDatesQueryRes.data;
  const isDisabled =
    !hasSlotsBetweenDates ||
    mutation.isLoading ||
    hasSlotsBetweenDatesQueryRes.isLoading;

  const isInitialSlotSelected =
    initialSlot && initialSlot.id === selectedSlot?.id;

  return (
    <div>
      <Stack spacing={3}>
        <Typography variant="subtitle1">
          Choisissez une date et une heure
        </Typography>
        <SelectAppointmentDayCalendar
          orderId={order.orderId}
          desiredDateByContractor={desiredDateByContractor}
          minDate={minDate}
          maxDate={maxDate}
          onSelectSlot={handleOnSelectSlot}
          onSelectDate={handleOnSelectDate}
          selectedDate={selectedDate}
          selectedSlot={selectedSlot}
          disabled={isDisabled}
          hasSlotsBetweenDates={hasSlotsBetweenDatesQueryRes.data}
        />
        {hasSlotsBetweenDates && (
          <AppointmentInitialDateAlertText
            desiredDateByContractor={desiredDateByContractor}
            selectedDate={selectedDate}
            orderType={order.type}
            orderFamily={order.familleInitial}
            orderFamilyLongName={getFamilyLongName(
              order.type,
              order.familleLongue
            )}
          />
        )}
        {hasSlotsBetweenDates && (
          <ValidateButton
            color="secondary"
            onClick={handleOnClickValidate}
            disabled={
              !selectedSlot || mutation.isLoading || isInitialSlotSelected
            }
          >
            {selectedDate && selectedSlot ? (
              <>
                {isEdit && !isInitialSlotSelected ? "Changer" : "Valider"} pour
                le&nbsp;
                <Typography
                  variant="button"
                  sx={{ ":first-letter": { textTransform: "uppercase" } }}
                >
                  {" "}
                  {selectedDate.toFormat("EEEE d LLLL")}
                </Typography>
                &nbsp;à {selectedSlot.startTimeSlotOfAppointment}
              </>
            ) : (
              `Valider`
            )}
          </ValidateButton>
        )}
      </Stack>
      <SlotAlreadyTakenErrorDialog
        open={slotAlreadyTakenDialogOpened}
        setOpenedState={setSlotAlreadyTakenDialogOpened}
        orderId={order.orderId}
        selectedDate={selectedDate}
        minDate={minDate}
        maxDate={maxDate}
      />
      <NoSlotsAvailableDialog
        orderId={order.orderId}
        open={noSlotsAvailableDialogOpened}
        setOpenedState={setNoSlotsAvailableDialogOpened}
        appointmentBookingId={appointmentBookingId}
      />
    </div>
  );
};

export default SelectAppointment;
