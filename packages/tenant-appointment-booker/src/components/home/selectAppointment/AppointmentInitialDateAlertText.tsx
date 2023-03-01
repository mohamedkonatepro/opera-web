import { Alert, Typography } from "@mui/material"

const AppointmentInitialDateAlertText = () => {
    return (
        <Alert severity="info" variant="outlined" sx={{ backgroundColor: "#EEEDFC" }}>
            <Typography variant="body2" fontWeight="500" color="text.primary">
                L’état des lieux de sortie est initialement prévu le Mercredi 8 mars 2023.
            </Typography>
        </Alert>
    )
}

export default AppointmentInitialDateAlertText
