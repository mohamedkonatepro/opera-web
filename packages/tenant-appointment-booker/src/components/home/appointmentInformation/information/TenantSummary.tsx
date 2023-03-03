import { Box, Divider, Stack, Typography } from "@mui/material";
import UnderlinedButton from "../customMaterial/UnderlinedButton";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import Tenant from "@/types/tenant";

interface TenantSummaryProps {
  locataire: Tenant;
  displayButton?: string;
}

const clickHandler = () => {
  alert("Modification information locataire");
};

const TenantSummary: React.FunctionComponent<TenantSummaryProps> = (props) => {
  const { locataire, displayButton } = props;
  return (
    <Box>
      <Stack spacing={1.5}>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          display="flex"
          divider={<FiberManualRecordIcon sx={{ width: 4 }} />}
        >
          <Typography variant="body2" color="text.secondary">
            Locataire
          </Typography>
          {displayButton != "none" && (
            <UnderlinedButton onClick={clickHandler}>Modifier</UnderlinedButton>
          )}
        </Stack>
        <Typography
          variant="body2"
          color="text.primary"
          alignItems="center"
          display="flex"
        >
          <EmojiEmotionsOutlinedIcon sx={{ mr: 1.2 }} /> {locataire.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.primary"
          alignItems="center"
          display="flex"
        >
          <AlternateEmailOutlinedIcon sx={{ mr: 1.2 }} /> {locataire.email}
        </Typography>
        <Typography
          variant="body2"
          color="text.primary"
          alignItems="center"
          display="flex"
        >
          <LocalPhoneOutlinedIcon sx={{ mr: 1.2 }} /> (+33){" "}
          {locataire.phoneNumber && locataire.phoneNumber.replaceAll(".", " ")}
        </Typography>
      </Stack>
    </Box>
  );
};

export default TenantSummary;
