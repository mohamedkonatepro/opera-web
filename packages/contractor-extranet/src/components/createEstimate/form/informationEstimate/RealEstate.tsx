import PurposeSelect from "@/components/inputs/PurposeSelect";
import { Stack, TextField, Typography, MenuItem } from "@mui/material";
import { FC } from "react";
import { ServiceType } from "@/types/ServiceType";
import { Purpose } from "@/types/Purpose";

export interface RealEstateFormDisabled {
  realEstate?: {
    purpose?: boolean;
  };
}
export interface RealEstateInformationFormProps {
  purpose?: Purpose;
  staircaseNumber?: string;
  levelNumber?: string;
  setLevelNumber: (value: any) => void;
  setPurpose: (purpose?: Purpose) => void;
  setStaircaseNumber: (value: any) => void;
  serviceType: ServiceType;
  disabled: RealEstateFormDisabled["realEstate"];
}

const RealEstate: FC<RealEstateInformationFormProps> = ({
  levelNumber,
  staircaseNumber,
  purpose,
  setLevelNumber,
  setStaircaseNumber,
  setPurpose,
  serviceType,
  disabled,
}) => {
  return (
    <Stack spacing={2}>
      <Typography variant="subtitle1">Détails du bien</Typography>
      <Stack spacing={2} direction="row">
        <PurposeSelect
          value={purpose}
          setValue={setPurpose}
          serviceType={serviceType}
          disabled={disabled?.purpose}
          required
        />
        <TextField
          id="levelNumber"
          label="Nombre de niveaux"
          color="secondary"
          required
          select
          fullWidth
          value={levelNumber}
          onChange={(event) => setLevelNumber(event.target.value)}
        >
          {Array.from({ length: 50 }, (_, index) => index + 1).map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="surface"
          label="Nombre cages d’escaliers"
          color="secondary"
          required
          select
          fullWidth
          value={staircaseNumber}
          onChange={(event) => setStaircaseNumber(event.target.value)}
        >
          {Array.from({ length: 50 }, (_, index) => index + 1).map((value) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </TextField>
      </Stack>
    </Stack>
  );
};

export default RealEstate;
