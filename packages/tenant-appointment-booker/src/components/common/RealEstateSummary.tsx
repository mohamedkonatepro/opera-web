import { Box, Stack, Typography } from "@mui/material";
import UnderlinedButton from "@/components/common/customMaterial/buttons/UnderlinedButton";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";
import RealEstate from "@/types/realEstate";
import { useId, useState } from "react";
import EditDialog from "@/components/common/customMaterial/dialogs/EditDialog";
import TextField from "@mui/material/TextField";
import SuccessDialog from "./customMaterial/dialogs/SuccessDialog";
import ModifyRealEstateForm from "./forms/ModifyRealEstateFrom";

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
    <ModifyRealEstateForm id={id} onChange={updateData} onSubmit={onSubmit} />
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
