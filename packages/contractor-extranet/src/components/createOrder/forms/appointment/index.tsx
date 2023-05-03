import { Stack, TextField, Typography, useTheme } from "@mui/material";
import { FC, useState } from "react";
import { DateTime } from "luxon";
import { getMovingZone } from "@/queries/movingZone";
import { MovingZone } from "@/types/MovingZone";
import { useQuery } from "@tanstack/react-query";
import KeysRadioGroup from "./KeysRadioGroup";
import DesiredDatePicker from "./DesiredDatePicker";
import { KeyEnumWithStrIndex } from "@/constants";

export interface AppointmentProps {
  formId: string;
  onSubmit: (formState: any) => void;
  contextValues: any;
}

const AppointmentForm: FC<AppointmentProps> = ({
  formId,
  onSubmit,
  contextValues,
}) => {
  const theme = useTheme();
  const [date, setDate] = useState<DateTime | undefined>(DateTime.now());
  const [movingZones, setMovingZones] = useState<MovingZone>();
  const [key, setKey] = useState("");
  const [futherInformations, setFutherInformations] = useState("");

  const { isLoading } = useQuery<MovingZone>({
    queryKey: ["getRealEstates", contextValues.realEstate.postalCode],
    queryFn: ({ queryKey }) =>
      getMovingZone({ postalCode: queryKey[1] as string }),
    enabled: true,
    onSuccess: (data) => {
      setMovingZones(data);
    },
  });

  if (isLoading) {
    return (
      <Typography sx={{ ...theme.typography.subtitle1 }}>
        Chargement...
      </Typography>
    );
  }

  const zone = movingZones ? movingZones.code : "";

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onSubmit({
      date,
      key: KeyEnumWithStrIndex[key.toUpperCase()],
      futherInformations
    })
  };

  const handleChangeKeysRadio = (value: string): void => {
    setKey(value);
  };
  const handleChangeDate = (value: DateTime | undefined): void => {
    setDate(value);
  };
  return (
    <Stack spacing={5} component="form" onSubmit={handleOnSubmit} id={formId}>
      <KeysRadioGroup onChange={handleChangeKeysRadio} />
      <DesiredDatePicker
        zone={zone}
        keyType={key}
        onChange={handleChangeDate}
      />
      <Stack spacing={1}>
        <Typography
          variant="subtitle1"
          sx={{ ...theme.typography.subtitle1, marginBottom: 1 }}
        >
          Informations complémentaires
        </Typography>
        <TextField
          name="futherInformations"
          label="Informations complémentaires"
          placeholder="Informations complémentaires"
          color="secondary"
          sx={{
            bgcolor: "background.paper",
          }}
          multiline
          onChange={(event) => {
            setFutherInformations(event.target.value);
          }}
        />
      </Stack>
    </Stack>
  );
};

export default AppointmentForm;
