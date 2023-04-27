import React, { useState } from "react";
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Button,
} from "@mui/material";
import SuccessDialog from "./dialogs/SuccessDialog";
import TenantRequestProps from "@/types/tenantResquestProps";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as operaOrderClient from "@/queries/operaTenantRequest";

interface AppointmentResponseOptionsProps {
  selectedValue: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  orderId: string;
  tenantRequest: TenantRequestProps;
  appointmentBookingId: string;
  refetch: () => void;
}

const getButtonLabels = (tenantRequest: TenantRequestProps) => {
  let accepted = {
    primary: "Confirmation l’annulation de la commande",
    secondary: "Le locataire sera notifié et la commande, supprimée.",
  };

  let denied = {
    primary: "Refuser l’annulation de la commande",
    secondary: "Le locatiare sera notifié et la commande, conservée.",
  };

  if (tenantRequest?.desired_date) {
    accepted = {
      primary: "Confirmer le changement de date",
      secondary:
        "Le locataire recevra un lien afin de prendre RDV à la nouvelle date souhaitée.",
    };

    denied = {
      primary: "Refuser le changement de date",
      secondary: "Le locataire sera notifié de votre refus.",
    };
  }
  return { accepted, denied };
};

const AppointmentResponseOptions: React.FC<AppointmentResponseOptionsProps> = ({
  selectedValue,
  handleChange,
  orderId,
  tenantRequest,
  appointmentBookingId,
  refetch,
}) => {
  const queryClient = useQueryClient();

  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const handleOpenConfirmDialog = () => {
    refetch()
    if (selectedValue === "denied") {
      mutationCancelTenantRequest.mutate({ appointmentBookingId, orderId });
    } else if (selectedValue === "accepted") {
      mutationConfirmTenantRequest.mutate({ appointmentBookingId, orderId });
    }
  };

  const handleCloseDialog = async () => {
    setConfirmDialogOpen((prevState) => !prevState);
    await queryClient.invalidateQueries(["appointmentBooking", appointmentBookingId]);
  };

  const { accepted, denied } = getButtonLabels(tenantRequest);

  const mutationCancelTenantRequest = useMutation({
    mutationFn: operaOrderClient.cancelTenantRequest,
    onSuccess: () => {
      setConfirmDialogOpen((prevState) => !prevState);
    },
  });

  const mutationConfirmTenantRequest = useMutation({
    mutationFn: operaOrderClient.confirmTenantRequest,
    onSuccess: () => {
      setConfirmDialogOpen((prevState) => !prevState);
    },
  });

  return (
    <>
      <SuccessDialog
        title={`Votre choix est confirmé pour la commande ${orderId}.`}
        onClose={handleCloseDialog}
        open={confirmDialogOpen}
        maxWidth={456}
      />
      <RadioGroup
        color="text.secondary"
        value={selectedValue}
        onChange={handleChange}
      >
        <FormControlLabel
          color="red"
          value="accepted"
          control={<Radio color="secondary" />}
          label={accepted.primary}
          sx={{ height: "20px" }}
        />
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginLeft: "2rem", height: "20px" }}
        >
          {accepted.secondary}
        </Typography>
        <FormControlLabel
          color="text.secondary"
          value="denied"
          control={<Radio color="secondary" />}
          label={denied.primary}
          sx={{ height: "20px", marginTop: "24px" }}
        />
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginLeft: "2rem", height: "20px" }}
        >
          {denied.secondary}
        </Typography>
      </RadioGroup>
      <Button
        variant="contained"
        color="secondary"
        sx={{ textTransform: "none", width: "100%", marginTop: "24px" }}
        onClick={handleOpenConfirmDialog}
      >
        Confirmer la réponse au locataire
      </Button>
    </>
  );
};

export default AppointmentResponseOptions;
