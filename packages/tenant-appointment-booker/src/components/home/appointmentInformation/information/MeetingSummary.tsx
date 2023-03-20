import { AssignmentOutlined } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import { DateTime } from "luxon";

interface MeetingSummaryProps {
  commercialName: string;
  familyLongName: string;
  desiredDateByContractor: string;
}

const MeetingSummary: React.FunctionComponent<MeetingSummaryProps> = ({
  commercialName,
  familyLongName,
  desiredDateByContractor,
}) => {
  return (
    <Stack spacing={0.5}>
      <Typography variant="body2" color="secondary.main">
        {commercialName}
      </Typography>
      <Typography variant="h6">
        Rendez-vous pour votre {familyLongName.toLocaleLowerCase()}
      </Typography>
      <Stack direction="row" spacing={1.5}>
        <AssignmentOutlined sx={{ color: "text.secondary" }} />
        <Typography variant="body2" color="text.secondary">
          {familyLongName}
        </Typography>
      </Stack>
      <Typography variant="body2" color="text.secondary">
        Date souhaitée de RDV :{" "}
        {DateTime.fromISO(desiredDateByContractor).toFormat("dd/MM/yyyy")}
      </Typography>
    </Stack>
  );
};

export default MeetingSummary;
