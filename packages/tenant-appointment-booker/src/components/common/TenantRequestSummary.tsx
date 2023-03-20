import { Box, Stack, Typography } from "@mui/material";
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import UnderlinedButton from "@/components/common/buttons/UnderlinedButton";
import TenantRequestProps from "@/types/tenantResquestProps";
import { DateTime } from "luxon";

interface TenantRequestSummaryProps {
  familyLongName: string;
  orderId: string;
  tenantRequest: TenantRequestProps;
}

const TenantRequestSummary: React.FunctionComponent<TenantRequestSummaryProps> = ({
  familyLongName,
  orderId,
  tenantRequest,
}) => {
  let formattedDate
  if (tenantRequest.desired_date) {
    const dateTime = DateTime.fromISO(tenantRequest.desired_date);
    formattedDate = dateTime.toFormat('EEEE d MMMM yyyy');
  }
  return (
    <Box>
      <Stack spacing={0.5}>
        <Typography 
          variant="body2"
          color="text.secondary"
          alignItems="center"
          display="flex"
        >
        <AssignmentOutlinedIcon sx={{ mr: 1.2 }} />  {familyLongName}
        </Typography>
        <Typography variant="h6">
          {formattedDate ? (`Demande de changement de date pour le ${formattedDate}`) : 'Demande d’annulation de commande' }
        </Typography>
        <Typography variant="body2" color="text.primary">
        Commande n°<UnderlinedButton>{orderId}</UnderlinedButton>
        </Typography>
      </Stack>
    </Box>
  );
};

export default TenantRequestSummary;
