import { Alert, Typography } from "@mui/material"
import { DateTime } from "luxon"
import EDLAppointmentDateAlert from "./EDLAppointmentDateAlert"

interface AppointmentInitialDateAlertTextProps {
    desiredDateByContractor: DateTime
    selectedDate: DateTime
    orderType: string
    orderFamily: string
}

const AppointmentInitialDateAlertText: React.FC<AppointmentInitialDateAlertTextProps> = ({
    desiredDateByContractor,
    selectedDate,
    orderType,
    orderFamily
}) => {
    if (orderFamily === "EDL") {
        return <EDLAppointmentDateAlert desiredDateByContractor={desiredDateByContractor}  selectedDate={selectedDate} orderType={orderType} />
    }

    return null
}

export default AppointmentInitialDateAlertText
