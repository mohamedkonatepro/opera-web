import { Box, Stack, Typography } from "@mui/material";
import UnderlinedButton from "../customMaterial/UnderlinedButton";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import Tenant from "@/types/tenant";
import { useState } from "react";
import CustomDialog, { DialogType } from "../customMaterial/CustomDialog";
import TextField from "@mui/material/TextField";

interface TenantSummaryProps {
  locataire: Tenant;
  displayEditButton?: boolean;
}

const TenantSummary: React.FunctionComponent<TenantSummaryProps> = (props) => {
  const { locataire, displayEditButton = false } = props;

  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [error, setError] = useState(false);
  const [dialogData, setDilaogData] = useState({
    email: locataire.email,
    phoneNumber:
      locataire.phoneNumber && formattedPhoneNumber(locataire.phoneNumber),
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

  const onValidate = () => {
    if (!isValidEmail(dialogData.email) || dialogData.phoneNumber == "") {
      setError(true);
    } else {
      /** todo : appel API */
      setError(false);
      setOpen(false);
      // show confirmation
      setConfirm(true);
    }
  };

  const phoneInputChange = (
    value: string,
    country: string,
    e: any,
    formattedValue: string
  ) => {
    dialogData.phoneNumber = formattedValue;
  };

  const dialogContent = (
    <Box>
      <Stack spacing={0.5}>
        <Typography variant="h6">Modifier vos coordonnées</Typography>
        <Typography variant="body2" color="text.secondary">
          Modifier votre email ou votre numéro de téléphone.
        </Typography>
      </Stack>
      <Stack sx={{ mt: 3 }} spacing={2}>
        <TextField
          label="Email"
          defaultValue={dialogData.email}
          name="email"
          color="secondary"
          error={!isValidEmail(dialogData.email)}
          onChange={updateData}
          InputLabelProps={{ shrink: true }}
        />
        <PhoneInput
          specialLabel="Numéro de téléphone"
          country={"fr"}
          regions={"europe"}
          placeholder="+33 06 12 34 56 78"
          value={dialogData.phoneNumber}
          inputProps={{
            name: "phoneNumber",
            autoFocus: true,
            error: dialogData.phoneNumber == "",
          }}
          onChange={phoneInputChange}
          inputStyle={{ width: "100%" }}
        />
      </Stack>
    </Box>
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
              <CustomDialog
                content={dialogContent}
                onCloseHandler={handleClose}
                onValiderHandler={onValidate}
                open={open}
              />
              <CustomDialog
                dialogType={DialogType.Success}
                message="Votre demande de modification a été envoyée !"
                onCloseHandler={closeInfo}
                onValiderHandler={closeInfo}
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
          {locataire.phoneNumber && formattedPhoneNumber(locataire.phoneNumber)}
        </Typography>
      </Stack>
    </Box>
  );
};

function formattedPhoneNumber(phoneNumber: string) {
  phoneNumber = phoneNumber.replaceAll(".", " ");
  if (phoneNumber.substring(0, 1) == "0")
    phoneNumber = phoneNumber.substring(1);
  if (phoneNumber.indexOf("+33") == -1) phoneNumber = "(+33) " + phoneNumber;

  return phoneNumber;
}

function isValidEmail(email: string) {
  const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return expression.test(email);
}

export default TenantSummary;
