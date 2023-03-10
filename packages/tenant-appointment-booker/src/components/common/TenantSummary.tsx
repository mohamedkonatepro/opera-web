import { Box, Stack, Typography } from "@mui/material";
import UnderlinedButton from "@/components/common/buttons/UnderlinedButton";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import Tenant from "@/types/tenant";
import { useState } from "react";
import EditDialog from "@/components/common/dialogs/EditDialog";
import SuccessDialog from "./dialogs/SuccessDialog";
import { formattedPhoneNumber } from "@/utils/formatPhoneNumber";
import ModifyTenantForm, {
  TenantFormSubmitValues,
} from "@/components/home/appointmentInformation/forms/ModifyTenantForm";

const formId = "modify-tenant-form";
interface TenantSummaryProps {
  locataire: Tenant;
  displayEditButton?: boolean;
}

const TenantSummary: React.FunctionComponent<TenantSummaryProps> = (props) => {
  const { locataire, displayEditButton = false } = props;

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const handleClickEditButton = () => {
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };
  const handleCloseConfirmDialog = () => {
    setConfirmDialogOpen(false);
  };

  const onSubmit = (values: TenantFormSubmitValues) => {
    // TODO: send request to server
    alert(JSON.stringify(values));
    setConfirmDialogOpen(true);
  };

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
          {displayEditButton && (
            <>
              <UnderlinedButton onClick={handleClickEditButton}>
                Modifier
              </UnderlinedButton>
              <EditDialog
                title="Modifier vos coordonnées"
                text="Modifier votre email ou votre numéro de téléphone."
                formId={formId}
                onClose={handleCloseEditDialog}
                open={editDialogOpen}
              >
                <ModifyTenantForm
                  id={formId}
                  onSubmit={onSubmit}
                  defaultValues={locataire}
                />
              </EditDialog>
              <SuccessDialog
                title="Vos informations personnelles ont été modifiées !"
                text="Vos informations personnelles ont été modifiées. Vous pouvez continuer la prise de rendez-vous."
                onClose={handleCloseConfirmDialog}
                open={confirmDialogOpen}
              />
            </>
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
          <LocalPhoneOutlinedIcon sx={{ mr: 1.2 }} />
          {locataire.phoneNumber &&
            formattedPhoneNumber(locataire.phoneNumber).replace("+33", "(+33)")}
        </Typography>
      </Stack>
    </Box>
  );
};

export default TenantSummary;
