import Order from "@/types/order"
import { Button, Stack, Typography } from "@mui/material"
import AppointmentInitialDateAlertText from "./AppointmentInitialDateAlertText"
import SelectAppointmentDayCalendar from "./SelectAppointmentDayCalendar"
import { DateTime } from 'luxon'
import { useState } from "react"
import Slot from "@/types/slot"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"

interface SelectAppointmentProps {
    order: Order
    appointmentBookingId: string
}

const SelectAppointment: React.FC<SelectAppointmentProps> = ({ order, appointmentBookingId }) => {

    const desiredDateByContractor = DateTime.fromFormat(order.desiredDateByContractor, 'dd-MM-yyyy')

    const [selectedDate, setSelectedDate] = useState<DateTime>(desiredDateByContractor)
    const [selectedSlot, setSelectedSlot] = useState<Slot>()

    const mutation = useMutation({
        mutationFn: ({ appointmentBookingId, selectedSlot }: { appointmentBookingId: string, selectedSlot: Slot }) => {
          return axios.put(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/appointment-bookings/${appointmentBookingId}`, {
            selectedSlot
          })
        },
      })

    const handleOnSelectDate = (date: DateTime) => {
        setSelectedDate(date)
        setSelectedSlot(undefined)
    }

    const handleOnSelectSlot = (slot: Slot) => {
        setSelectedSlot(slot)
    }

    const handleOnClickValidate = () => {
        mutation.mutate({
            appointmentBookingId,
            selectedSlot: selectedSlot as Slot
        })
    }

    const minDate = order.minimumDate ? DateTime.fromFormat(order.minimumDate, 'dd-MM-yyyy') : desiredDateByContractor.minus({ months: 1 })
    const maxDate = order.maximumDate ? DateTime.fromFormat(order.maximumDate, 'dd-MM-yyyy') : desiredDateByContractor.plus({ months: 1 })

    return (
        <Stack spacing={3}>
            <Typography variant="body1" fontWeight="500">Choisissez une date et une heure</Typography>
            <SelectAppointmentDayCalendar
                orderId={order.orderId}
                desiredDateByContractor={desiredDateByContractor}
                minDate={minDate}
                maxDate={maxDate}
                onSelectSlot={handleOnSelectSlot}
                onSelectDate={handleOnSelectDate}
                selectedDate={selectedDate}
                selectedSlot={selectedSlot}
            />
            <AppointmentInitialDateAlertText
                desiredDateByContractor={desiredDateByContractor}
                selectedDate={selectedDate}
                orderType={order.type}
                orderFamily={order.familleInitial}
            />
            <Button variant="contained" color="secondary" onClick={handleOnClickValidate} disabled={!selectedSlot}>
                {
                    selectedDate && selectedSlot ? `Valider pour le ${selectedDate.toFormat('EEEE d LLLL')} à ${selectedSlot.startTimeSlotOfAppointment}` : `Valider`
                }
            </Button>
        </Stack>
    )
}

export default SelectAppointment
