import { Box, Stack, Typography } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import TenantRequestProps from "@/types/tenantResquestProps";
import { DateTime } from "luxon";

interface InformationsSummaryProps {
  tenantRequest: TenantRequestProps;
}

const InformationsSummary: React.FunctionComponent<InformationsSummaryProps> = (
  { tenantRequest }
) => {

  let formattedDate
  if (tenantRequest?.desired_date) {
    const dateTime = DateTime.fromISO(tenantRequest.desired_date);
    formattedDate = dateTime.toFormat('EEEE, d MMMM yyyy');
  }
  
  return (
    <Box>
      <Stack spacing={1.5}>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
        >
          <Typography variant="caption" color="text.secondary">
            Informations complémentaires
          </Typography>
        </Stack>

        {formattedDate && (
          <Stack
            direction="row"
            spacing={3}
            alignItems="center"
            display="flex"
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ minWidth: '112px', display: "inline" }}
            >
             Date souhaitée :
            </Typography>

            <Typography variant="body2">
            {formattedDate}
            </Typography>
          </Stack>)}
          <Stack
            direction="row"
            spacing={3}
            alignItems="center"
            display="flex"
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ minWidth: '112px', display: "inline" }}
            >
              Message : 
            </Typography>

            <Typography variant="body2">
            {tenantRequest.message}
            </Typography>
          </Stack>
      </Stack>
    </Box>
  );
};

export default InformationsSummary;
