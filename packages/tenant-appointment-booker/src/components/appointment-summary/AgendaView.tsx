import { Paper, Stack, Typography } from "@mui/material";
import { DateTime } from "luxon";

interface AgendaViewProps {
  appointmentDatetime: DateTime;
}

const AgendaView: React.FC<AgendaViewProps> = ({ appointmentDatetime }) => {
  return (
    <Stack justifyContent="center" alignItems="center" spacing={0} width={80}>
      <Paper
        variant="outlined"
        sx={{
          pt: 0.5,
          pb: 0.5,
          pr: 1,
          pl: 1,
          bgcolor: "secondary.main",
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          width: 1,
          textAlign: "center",
        }}
      >
        <Typography variant="body2" color="common.white" width={1}>
          {appointmentDatetime.toFormat("LLLL")}
        </Typography>
      </Paper>
      <Paper
        variant="outlined"
        sx={{
          pt: 1.25,
          pb: 1.25,
          pr: 1,
          pl: 1,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          width: 1,
          textAlign: "center",
          bgcolor: "background.default",
        }}
      >
        <Typography variant="h5" color="secondary">
          {appointmentDatetime.toFormat("dd")}
        </Typography>
      </Paper>
    </Stack>
  );
};

export default AgendaView;
