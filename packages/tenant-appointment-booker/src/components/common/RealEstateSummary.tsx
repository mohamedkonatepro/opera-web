import { Box, Stack, Typography } from "@mui/material";
import UnderlinedButton from "../customMaterial/UnderlinedButton";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";
import RealEstate from "@/types/realEstate";
import { useState } from "react";
import CustomDialog, { DialogType } from "../customMaterial/CustomDialog";
import TextField from "@mui/material/TextField";

interface RealEstateSummaryProps {
  realEstate: RealEstate;
  displayEditButton?: boolean;
}

const RealEstateSummary: React.FunctionComponent<RealEstateSummaryProps> = (
  props
) => {
  const { realEstate, displayEditButton = false } = props;
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [error, setError] = useState(false);
  const [dialogData, setDilaogData] = useState({ informationsBien: "" });

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
    if (dialogData.informationsBien == "") {
      setError(true);
    } else {
      setError(false);
      /** todo : appel API */
      setOpen(false);
      // show confirmation
      setConfirm(true);
    }
  };

  const dialogContent = (
    <Box>
      <Stack spacing={0.5}>
        <Typography variant="h6">Modifier les informations du bien</Typography>
        <Typography variant="body2" color="text.secondary">
          Modifier l'adresse, le type de bien, l'étage ou le digicode.
        </Typography>
      </Stack>
      <Stack sx={{ mt: 3 }}>
        <TextField
          label="Votre message"
          placeholder="Votre message..."
          name="informationsBien"
          color="secondary"
          error={error}
          onChange={updateData}
          multiline
          InputLabelProps={{ shrink: true }}
        />
      </Stack>
    </Box>
  );

  return (
    <>
      <Box>
        <Stack spacing={1.5}>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            divider={<FiberManualRecordIcon sx={{ width: 4 }} />}
          >
            <Typography variant="body2" color="text.secondary">
              Informations du bien
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
            <PlaceOutlinedIcon sx={{ mr: 1.2 }} /> {realEstate.Address},{" "}
            {realEstate.CP} {realEstate.Ville}
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            display="flex"
            divider={<FiberManualRecordIcon sx={{ width: 4 }} />}
          >
            <Typography
              variant="body2"
              color="text.primary"
              alignItems="center"
              display="flex"
            >
              <CottageOutlinedIcon sx={{ mr: 1.2 }} /> {realEstate.libelle}{" "}
              {realEstate.Type}
              {realEstate.nbpiece},{" "}
              {realEstate.meuble ? "meublé" : "non-meublé"}
            </Typography>
            <Typography variant="body2" color="text.primary">
              étage : {realEstate.etage}
            </Typography>
            {realEstate.code && (
              <Typography variant="body2" color="text.primary">
                {" "}
                code : {realEstate.code}
              </Typography>
            )}
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default RealEstateSummary;
