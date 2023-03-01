import { Stack, Typography } from "@mui/material"
import AppointmentInitialDateAlertText from "./AppointmentInitialDateAlertText"

const SelectAppointment = () => {
    return (
        <Stack spacing={3}>
            <Typography variant="body1" fontWeight="500">Choisissez une date et une heure</Typography>
            <AppointmentInitialDateAlertText />
        </Stack>
    )
}

export default SelectAppointment
