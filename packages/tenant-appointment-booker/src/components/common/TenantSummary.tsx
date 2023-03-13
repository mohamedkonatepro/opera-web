import { Box, Stack, Typography } from "@mui/material";
import UnderlinedButton from "@/components/common/buttons/UnderlinedButton";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import Tenant from "@/types/tenant";
import EditDialog from "@/components/common/dialogs/EditDialog";
import SuccessDialog from "./dialogs/SuccessDialog";
import ModifyTenantForm, {
  TenantFormSubmitValues,
} from "@/components/home/appointmentInformation/forms/ModifyTenantForm";

const formId = "modify-tenant-form";
import { useState } from "react";
import { formattedPhoneNumber } from "@/utils/formatPhoneNumber";

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
              <UnderlinedButton
                onClick={handleClickEditButton}
                variant="caption"
              >
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
        <Stack direction="row" spacing={1.5}>
          <EmojiEmotionsOutlinedIcon sx={{ color: "text.secondary" }} />
          <Typography variant="body2" color="text.primary">
            {locataire.name}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1.5}>
          <AlternateEmailOutlinedIcon sx={{ color: "text.secondary" }} />
          <Typography variant="body2" color="text.primary">
            {locataire.email}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1.5}>
          <LocalPhoneOutlinedIcon sx={{ color: "text.secondary" }} />
          <Typography variant="body2" color="text.primary">
            {locataire.phoneNumber &&
              formattedPhoneNumber(locataire.phoneNumber).replace(
                "+33",
                "(+33)"
              )}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default TenantSummary;
