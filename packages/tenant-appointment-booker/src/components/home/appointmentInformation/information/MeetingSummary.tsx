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
    <Box>
      <Stack spacing={0.5}>
        <Typography variant="body2" color="secondary">
          {commercialName}
        </Typography>
        <Typography variant="h5">
          Rendez-vous pour votre {familyLongName.toLocaleLowerCase()}
        </Typography>
        <Stack direction="row" spacing={1.5}>
          <AssignmentOutlined />
          <Typography variant="body2" color="text.secondary">
            {familyLongName}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default MeetingSummary;
