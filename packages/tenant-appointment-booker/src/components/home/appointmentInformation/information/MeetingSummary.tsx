import { Box, Stack, Typography } from "@mui/material"

interface MeetingSummaryProps {
    commercialName: string
    familyLongName: string
}

const MeetingSummary: React.FunctionComponent<MeetingSummaryProps> = (props) => {
    const { commercialName, familyLongName } = props
    return (
        <Box>
            <Stack spacing={0.5}>
                <Typography variant="body2" color="secondary">{commercialName}</Typography>
                <Typography variant="h5">Rendez-vous pour votre {familyLongName}</Typography>
                <Typography variant="body2" color="text.secondary">
                    Prenez rendez-vous pour établir votre {familyLongName}.
                    Choisissez la date et le créneau qui vous conviennent le mieux.
                </Typography>
            </Stack>
        </Box>
    )
}

export default MeetingSummary
