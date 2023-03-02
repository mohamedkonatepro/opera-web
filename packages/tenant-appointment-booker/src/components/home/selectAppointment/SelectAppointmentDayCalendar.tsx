import { IconButton, Stack, Typography } from "@mui/material"
import { DateTime } from "luxon"
import SelectSlot from "./SelectSlot"
import Slot from "@/types/slot"
import { ChevronLeft, ChevronRight } from "@mui/icons-material"
import useDaysPagination from "./hooks/useDaysPagination"

interface SelectAppointmentDayCalendarProps {
    orderId: string
    desiredDateByContractor: DateTime
    selectedDate: DateTime
    selectedSlot?: Slot
    minDate: DateTime
    maxDate: DateTime
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

    const { items, onClickNext, onClickPrevious } = useDaysPagination(
        desiredDateByContractor,
        minDate,
        maxDate,
        selectedDate
    )

    const handleOnClickPage = (page: DateTime) => {
        onSelectDate(page)
    }

    return (
        <Stack spacing={1.5}>
            <Typography variant="body1">{selectedDate.toFormat('LLLL, yyyy')}</Typography>
            <Stack direction="row" spacing={1} justifyContent="space-between">
                {items.map(({ page, type, selected, disabled }) => {
                    switch (type) {
                        case "page": {
                            const currentDate = page as DateTime

                            return (
                                <IconButton
                                    color="secondary"
                                    disabled={disabled}
                                    onClick={() => handleOnClickPage(currentDate)}
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        backgroundColor: selected ? 'secondary.main' : 'secondary.light',
                                        color: selected ? 'common.white' : 'secondary',
                                        typography: 'body2',
                                        fontWeight: '500',
                                        '&:hover': {
                                            backgroundColor: selected ? 'secondary.main' : 'secondary.light',
                                        },

                                    }}
                                >
                                    {currentDate.toFormat('dd')}
                                </IconButton>
                            )
                        }
                        case "next": {
                            return (
                                <IconButton
                                    onClick={onClickNext}
                                    disabled={disabled}
                                    sx={{ width: 40, height: 40, backgroundColor: '#F4F4F4' }}
                                >
                                    <ChevronRight />
                                </IconButton>
                            )
                        }
                        case "previous": {
                            return (
                                <IconButton
                                    onClick={onClickPrevious}
                                    disabled={disabled}
                                    sx={{ width: 40, height: 40, backgroundColor: '#F4F4F4' }}
                                >
                                    <ChevronLeft />
                                </IconButton>
                            )
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
