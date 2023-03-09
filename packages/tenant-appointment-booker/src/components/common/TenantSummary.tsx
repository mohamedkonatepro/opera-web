import { Box, Stack, Typography } from "@mui/material";
import UnderlinedButton from "@/components/common/customMaterial/buttons/UnderlinedButton";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import Tenant from "@/types/tenant";
import { useId, useState } from "react";
import EditDialog from "@/components/common/customMaterial/dialogs/EditDialog";
import SuccessDialog from "./customMaterial/dialogs/SuccessDialog";
import ModifyTenantFrom from "./forms/ModifyTenantFrom";
import { formattedPhoneNumber } from "@/utils/formatPhoneNumber";

interface TenantSummaryProps {
  locataire: Tenant;
  displayEditButton?: boolean;
}

const TenantSummary: React.FunctionComponent<TenantSummaryProps> = (props) => {
  const { locataire, displayEditButton = false } = props;

  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [dialogData, setDilaogData] = useState({
    email: locataire.email,
    phoneNumber: formattedPhoneNumber(locataire.phoneNumber),
  });

  const updateData = (e: any) => {
    setDilaogData({
      ...dialogData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const closeInfo = () => {
    setConfirm(false);
  };

  const onSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    e.stopPropagation();
    /** todo : appel API */
    setOpen(false);
    // show confirmation
    setConfirm(true);
  };

  const id = useId();
  const dialogContent = (
    <ModifyTenantFrom
      id={id}
      onChange={updateData}
      onSubmit={onSubmit}
      locataire={dialogData}
    />
  );

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
              <UnderlinedButton onClick={handleClickOpen}>
                Modifier
              </UnderlinedButton>
              <EditDialog
                content={dialogContent}
                formId={id}
                onCloseHandler={handleClose}
                open={open}
              />
              <SuccessDialog
                message="Votre demande de modification a été envoyée !"
                onValiderHandler={closeInfo}
                onCloseHandler={closeInfo}
                open={confirm}
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
          {locataire.phoneNumber && formattedPhoneNumber(locataire.phoneNumber).replace("+33", "(+33)")}
        </Typography>
      </Stack>
    </Box>
  );
};

export default TenantSummary;
