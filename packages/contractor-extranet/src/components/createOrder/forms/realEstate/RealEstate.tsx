import FloorSelect from "@/components/inputs/FloorSelect";
import PurposeSelect from "@/components/inputs/PurposeSelect";
import RealEstateTypeSelect from "@/components/inputs/RealEstateTypeSelect";
import { Stack, TextField, Typography } from "@mui/material";
import { FC } from "react";
import { RealEstateFormProps } from "./types";

const RealEstate: FC<RealEstateFormProps> = ({
  realEstateType,
  floor,
  purpose,
  surface,
  roomNumber,
  digicode,
  observation,
  setRealEstateType,
  setFloor,
  setPurpose,
  setSurface,
  setRoomNumber,
  setDigicode,
  setObservation,
}) => {
  return (
    <Stack spacing={2}>
      <Typography variant="subtitle1">Détails du bien</Typography>
      <Stack spacing={2} direction="row">
        <RealEstateTypeSelect
          value={realEstateType}
          setValue={setRealEstateType}
        />
        <FloorSelect value={floor} setValue={setFloor} />
        <PurposeSelect value={purpose ?? ""} setValue={setPurpose} />
        <TextField
          id="surface"
          label="Surface"
          color="secondary"
          required
          fullWidth
          inputProps={{
            inputMode: "numeric",
            pattern: "^(?:0|[1-9]d*)(?:.d+)?$",
          }}
          value={surface}
          onChange={(event) => setSurface(event.target.value)}
        />
      </Stack>
      <Stack spacing={2} direction="row">
        <TextField
          id="room-number"
          label="Nombre de pièces"
          color="secondary"
          required
          inputProps={{ inputMode: "numeric", pattern: "^d+$" }}
          fullWidth
          value={roomNumber}
          onChange={(event) => setRoomNumber(event.target.value)}
        />
        <TextField
          id="digicode"
          label="Digicode"
          color="secondary"
          fullWidth
          value={digicode}
          onChange={(event) => setDigicode(event.target.value)}
        />
      </Stack>
      <TextField
        id="observation"
        label="Informations complémentaires"
        color="secondary"
        fullWidth
        multiline
        maxRows={4}
        value={observation}
        onChange={(event) => setObservation(event.target.value)}
      />
    </Stack>
  );
};

export default RealEstate;
