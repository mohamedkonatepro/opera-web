import Slot from "@/types/slot"
import { useQuery } from "@tanstack/react-query"
import { Button, Skeleton } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"
import axios from "axios"
import { DateTime } from "luxon"
import { useState } from "react"

interface SelectSlotProps {
    orderId: string
    selectedDate: DateTime
    selectedSlot?: Slot
    onSelectSlot: (slot: Slot) => void
}


const getOperaSlots = async (orderId: string, selectedDate: DateTime) => {
    try {
        const response = await axios.get(`/api/opera-slots?orderId=${orderId}&date=${selectedDate.toFormat('dd-MM-yyyy')}`)
        return response.data
    }
    catch (error) {
        throw error
    }
}

const SelectSlot: React.FC<SelectSlotProps> = ({ selectedDate, orderId, selectedSlot, onSelectSlot }) => {

    const { isFetching, isLoading, isSuccess, data } = useQuery<Slot[]>({
        queryKey: ['operaSlots', orderId, selectedDate],
        queryFn: ({ queryKey }) => getOperaSlots(queryKey[1] as string, queryKey[2] as DateTime),
    });

    const handleOnClickSlot = (slot: Slot) => {
        onSelectSlot(slot)
    }

    if (isFetching || isLoading) {
        return (
            <Grid container spacing={1}>
                {Array.from({ length: 6 }).map((_, index) => (
                    <Grid key={index} sm={6}>
                        <Skeleton variant="rectangular" width="100%">
                            <Button fullWidth>...</Button>
                        </Skeleton>
                    </Grid>
                ))}
            </Grid>
        )
    }

    const operaSlots = isSuccess ? data : []

    return (
        <Grid container spacing={1}>
            {operaSlots.map((slot) => (
                <Grid sm={6} key={slot.stamp}>
                    <Button
                        variant="outlined"
                        color={selectedSlot?.stamp === slot.stamp ? "secondary" : "inherit"}
                        sx={{
                            borderColor: selectedSlot?.stamp === slot.stamp ? "border.bold" : "border.default",
                            color: selectedSlot?.stamp === slot.stamp ? "secondary" : "text.secondary",
                        }}
                        onClick={() => {
                            handleOnClickSlot(slot)
                        }}
                        fullWidth
                    >
                        {slot.startTimeSlotOfAppointment}
                    </Button>
                </Grid>
            ))}
        </Grid>
    )

}

export default SelectSlot;
