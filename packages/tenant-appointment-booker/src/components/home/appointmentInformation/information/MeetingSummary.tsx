import { AssignmentOutlined } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";

interface MeetingSummaryProps {
  commercialName: string;
  familyLongName: string;
}

const MeetingSummary: React.FunctionComponent<MeetingSummaryProps> = ({
  commercialName,
  familyLongName,
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
    </Stack>
  );
};

export default MeetingSummary;
