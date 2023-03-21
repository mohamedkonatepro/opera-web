import React, { useState } from 'react';
import { RadioGroup, FormControlLabel, Radio, Typography, Button } from '@mui/material';
import SuccessDialog from './dialogs/SuccessDialog';
import TenantRequestProps from '@/types/tenantResquestProps';
import { getButtonLabels } from '@/utils/getButtonLabels';
import { useMutation } from "@tanstack/react-query";
import * as operaOrderClient from "@/queries/operaTenantRequest";

interface AppointmentResponseOptionsProps {
  selectedValue: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  orderId: string;
  tenantRequest: TenantRequestProps;
  appointmentBookingId: string;
}

const AppointmentResponseOptions: React.FC<AppointmentResponseOptionsProps> = ({ selectedValue, handleChange, orderId, tenantRequest, appointmentBookingId }) => {
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const handleOpenConfirmDialog = () => {
    if (selectedValue === 'denied') {
      mutationCancelTenantRequest.mutate({ appointmentBookingId, orderId });
    } else if (selectedValue === 'accepted') {
      mutationConfirmTenantRequest.mutate({ appointmentBookingId, orderId });
    }
  };

  const handleCloseDialog = () => {
    setConfirmDialogOpen(prevState => !prevState);
  };

  const { accepted, denied } = getButtonLabels(tenantRequest);

  const mutationCancelTenantRequest = useMutation({
    mutationFn: operaOrderClient.cancelTenantRequest,
    onSuccess: () => {
      setConfirmDialogOpen(prevState => !prevState);
    },
  });

  const mutationConfirmTenantRequest = useMutation({
    mutationFn: operaOrderClient.cancelTenantRequest,
    onSuccess: () => {
      setConfirmDialogOpen(prevState => !prevState);
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
      <RadioGroup color="text.secondary" value={selectedValue} onChange={handleChange}>
        <FormControlLabel
          color="red"
          value="accepted"
          control={<Radio color="secondary" />}
          label={accepted.primary}
          sx={{ height: '20px'}}
        />
        <Typography variant="body2" color="text.secondary" sx={{ marginLeft: '2rem', height: '20px' }}>
          {accepted.secondary}
        </Typography>
        <FormControlLabel
          color="text.secondary"
          value="denied"
          control={<Radio color="secondary" />}
          label={denied.primary}
          sx={{ height: '20px', marginTop: '24px'}}
        />
        <Typography variant="body2" color="text.secondary" sx={{ marginLeft: '2rem', height: '20px' }}>
          {denied.secondary}
        </Typography>
      </RadioGroup>
      <Button variant="contained" color="secondary" sx={{ textTransform: 'none', width: '100%', marginTop: '24px'}} onClick={handleOpenConfirmDialog}>
        Confirmer la réponse au locataire
      </Button>
    </>
  );
};

export default AppointmentResponseOptions;
