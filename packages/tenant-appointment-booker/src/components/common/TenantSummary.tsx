import { Box, Stack, Typography } from "@mui/material";
import UnderlinedButton from "@/components/common/buttons/UnderlinedButton";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import Tenant from "@/types/tenant";
import EditDialog from "@/components/common/dialogs/EditDialog";
import SuccessDialog from "./dialogs/SuccessDialog";
import ModifyTenantForm from "@/components/home/appointmentInformation/forms/ModifyTenantForm";
import { useState } from "react";
import { formattedPhoneNumber } from "@/utils/formatPhoneNumber";
import * as operaOrderClient from "@/queries/operaOrders";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ErrorDialog from "./dialogs/ErrorDialog";

const formId = "modify-tenant-form";

interface TenantSummaryProps {
  locataire: Tenant;
  orderId: string;
  appointmentBookingId: string;
  displayEditButton?: boolean;
}

const TenantSummary: React.FunctionComponent<TenantSummaryProps> = (props) => {
  const {
    locataire,
    orderId,
    displayEditButton = false,
    appointmentBookingId,
  } = props;
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [tenant, setTenant] = useState(locataire);
  const [formIsValid, setFormIsValid] = useState(false);
  tenant.phoneNumber = formattedPhoneNumber(tenant.phoneNumber);

  const queryClient = useQueryClient();

  const handleClickEditButton = () => {
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };
  const handleCloseConfirmDialog = () => {
    setConfirmDialogOpen(false);
  };
  const handleCloseErrorDialog = () => {
    setErrorDialogOpen(false);
  };

  const mutation = useMutation({
    mutationFn: operaOrderClient.updateTenantInformations,
    onSuccess: () => {
      setConfirmDialogOpen(true);
      setEditDialogOpen(false);
      queryClient.invalidateQueries([
        "appointmentBookings",
        appointmentBookingId,
      ]);
    },
    onError: () => {
      setErrorDialogOpen(true);
      setEditDialogOpen(false);
    },
  });

  const onSubmit = (data: Tenant) => {
    mutation.mutate({ locataire: data, orderId });
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
                disabledSubmitButton={!formIsValid}
                disabled={mutation.isLoading}
              >
                <ModifyTenantForm
                  id={formId}
                  onSubmit={onSubmit}
                  defaultValues={tenant}
                  formIsValid={formIsValid}
                  setFormIsValid={setFormIsValid}
                  disabled={mutation.isLoading}
                />
              </EditDialog>
              <SuccessDialog
                title="Vos informations personnelles ont été modifiées !"
                text="Vos informations personnelles ont été modifiées. Vous pouvez continuer la prise de rendez-vous."
                onClose={handleCloseConfirmDialog}
                open={confirmDialogOpen}
              />
              <ErrorDialog
                title="Une erreur est survenue !"
                text="Une erreur est survenue. Veuillez réessayer plus tard."
                onClose={handleCloseErrorDialog}
                open={errorDialogOpen}
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
