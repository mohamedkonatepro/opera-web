import Order from "@/types/order"
import { Button, Stack, Typography } from "@mui/material"
import AppointmentInitialDateAlertText from "./AppointmentInitialDateAlertText"
import SelectAppointmentDayCalendar from "./SelectAppointmentDayCalendar"
import { DateTime } from 'luxon'
import { useState } from "react"
import Slot from "@/types/slot"

interface SelectAppointmentProps {
    order: Order
}

const SelectAppointment: React.FC<SelectAppointmentProps> = ({ order }) => {

    const [selectedDate, setSelectedDate] = useState<DateTime>(DateTime.fromFormat(order.desiredDateByContractor, 'dd-MM-yyyy'))
    const [selectedSlot, setSelectedSlot] = useState<Slot>()

    const handleOnSelectDate = (date: DateTime) => {
        setSelectedDate(date)
        setSelectedSlot(undefined)
    }

    const handleOnSelectSlot = (slot: Slot) => {
        setSelectedSlot(slot)
    }

    const handleOnClickValidate = () => {
        console.log('validate')
    }

    const desiredDateByContractor = DateTime.fromFormat(order.desiredDateByContractor, 'dd-MM-yyyy')
    const minDate = DateTime.fromFormat(order.minimumDate, 'dd-MM-yyyy')
    const maxDate = DateTime.fromFormat(order.maximumDate, 'dd-MM-yyyy')

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
