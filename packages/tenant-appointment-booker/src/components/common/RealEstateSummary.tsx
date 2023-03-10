import { Box, Stack, Typography } from "@mui/material";
import UnderlinedButton from "@/components/common/buttons/UnderlinedButton";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";
import RealEstate from "@/types/realEstate";
import { useState } from "react";
import EditDialog from "@/components/common/dialogs/EditDialog";
import SuccessDialog from "./dialogs/SuccessDialog";
import ModifyRealEstateForm, {
  RealEstateFormSubmitValues,
} from "../home/appointmentInformation/forms/ModifyRealEstateForm";
import * as operaOrderClient from "@/queries/operaOrders";
import { useMutation } from "@tanstack/react-query";

interface RealEstateSummaryProps {
  realEstate: RealEstate;
  orderId: string;
  displayEditButton?: boolean;
}

const formId = "modify-real-estate-form";

const RealEstateSummary: React.FunctionComponent<RealEstateSummaryProps> = (
  props
) => {
  const { realEstate, orderId, displayEditButton = false } = props;
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: operaOrderClient.sendNoteToUpdateRealEstateInformation,
    onSuccess: () => {
      setConfirmDialogOpen(true);
      setEditDialogOpen(false);
    }
  });

  const handleClickEditButton = () => {
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };
  const handleCloseConfirmDialog = () => {
    setConfirmDialogOpen(false);
  };

  const onSubmit = ({ message }: RealEstateFormSubmitValues) => {
    mutation.mutate({ note: message, orderId });
  };

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
                <UnderlinedButton onClick={handleClickEditButton}>
                  Modifier
                </UnderlinedButton>
                <EditDialog
                  formId={formId}
                  onClose={handleCloseEditDialog}
                  open={editDialogOpen}
                  title="Modifier les informations du bien"
                  text="Modifier l'adresse, le type de bien, l'étage ou le digicode."
                  // mutationIsLoading={mutation.isLoading}
                >
                  <ModifyRealEstateForm onSubmit={onSubmit} id={formId} />
                </EditDialog>
                <SuccessDialog
                  title="Votre demande de modification a été envoyée !"
                  text="Votre message a été transmis à l’agence. Vous pouvez tout de même prendre rendez-vous et nous modifierons ces informations dans les plus brefs délais."
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
