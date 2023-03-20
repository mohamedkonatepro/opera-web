import React, { useState } from 'react';
import { RadioGroup, FormControlLabel, Radio, Typography, Button } from '@mui/material';
import SuccessDialog from './dialogs/SuccessDialog';
import TenantRequestProps from '@/types/tenantResquestProps';
import { getButtonLabels } from '@/utils/getButtonLabels';

interface AppointmentResponseOptionsProps {
  selectedValue: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  orderId: string;
  tenantRequest: TenantRequestProps;
}

const AppointmentResponseOptions: React.FC<AppointmentResponseOptionsProps> = ({ selectedValue, handleChange, orderId, tenantRequest }) => {
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const handleToggleConfirmDialog = () => {
    // TODO
    setConfirmDialogOpen(prevState => !prevState);
  };

  const { accepted, denied } = getButtonLabels(tenantRequest)

  return (
    <>
      <SuccessDialog
        title={`Votre choix est confirmé pour la commande ${orderId}.`}
        onClose={handleToggleConfirmDialog}
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
      </RadioGroup>
      <Typography variant="body2" color="text.secondary" sx={{ marginLeft: '2rem', height: '20px' }}>
        {denied.secondary}
      </Typography>
      <Button variant="contained" color="secondary" sx={{ textTransform: 'none', width: '100%', marginTop: '24px'}} onClick={handleToggleConfirmDialog}>
        Confirmer la réponse au locataire
      </Button>
    </>
  );
};

export default AppointmentResponseOptions;
