import { useState } from "react"
import { Button, PaginationItem, Stack, Typography } from "@mui/material"
import usePagination from "@mui/material/usePagination"
import { DateTime } from "luxon"
import { isPaginationItemDisabled } from "./utils"
import SelectSlot from "./SelectSlot"
import Slot from "@/types/slot"

interface SelectAppointmentDayCalendarProps {
    orderId: string
    desiredDateByContractor: DateTime
    selectedDate: DateTime
    selectedSlot?: Slot
    minDate?: DateTime
    maxDate?: DateTime
    onSelectSlot: (slot: Slot) => void
    onSelectDate: (date: DateTime) => void
}

const SelectAppointmentDayCalendar: React.FC<SelectAppointmentDayCalendarProps> = (props) => {
    const {
        orderId,
        minDate,
        maxDate,
        selectedDate,
        selectedSlot,
        desiredDateByContractor,
        onSelectDate,
        onSelectSlot
    } = props

    const { items } = usePagination({
        count: desiredDateByContractor.daysInMonth,
        siblingCount: 2,
        boundaryCount: 0,
        defaultPage: desiredDateByContractor.day,
    })

    const handleOnClickPage = (page: number) => {
        onSelectDate(DateTime.fromObject({ ...selectedDate.toObject(), day: page }))
    }

    return (
        <Stack spacing={1.5}>
            <Typography variant="body1">{desiredDateByContractor.toFormat('LLLL, yyyy')}</Typography>
            <Stack direction="row" spacing={1} justifyContent="space-between">
                {items.map(({ page, type, disabled, ...item }) => {
                    const currentPage: number = page as number
                    const key = `${type}-${currentPage}`
                    switch (type) {
                        case "page": {
                            const currentDate = DateTime.local(selectedDate.year, selectedDate.month, currentPage)
                            const isDisabled = isPaginationItemDisabled(currentDate, disabled, minDate, maxDate)
                            return (
                                <PaginationItem
                                    key={key}
                                    disabled={isDisabled}
                                    color="secondary"
                                    page={page?.toString().padStart(2, '0')}
                                    selected={currentPage === selectedDate.day}
                                    onClick={() => handleOnClickPage(currentPage)}
                                />
                            )
                        }
                        case "next": case "previous": {
                            return <PaginationItem {...item} key={key} type={type} page={page} />
                        }
                        default: {
                            return null
                        }
                    }
                })}
            </Stack>
            <Typography variant="body1">{selectedDate.toFormat('EEEE, d LLLL yyyy')}</Typography>
            <SelectSlot selectedDate={selectedDate} selectedSlot={selectedSlot} orderId={orderId} onSelectSlot={onSelectSlot} />
        </Stack>
    )
}

export default SelectAppointmentDayCalendar
