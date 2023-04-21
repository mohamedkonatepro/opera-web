import { Stack, Typography, useTheme } from "@mui/material";
import { FC, useState } from "react";
import { DateTime } from "luxon";
import { getMovingZone } from "@/queries/movingZone";
import { MovingZone, MovingZoneListResponse } from "@/types/MovingZone";
import { useQuery } from "@tanstack/react-query";
import KeysRadioGroup from "./KeysRadioGroup";
import DesiredDatePicker from "./DesiredDatePicker";

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
  const [movingZones, setMovingZones] = useState<MovingZone[]>([]);
  const [key, setKey] = useState('');

  const { isLoading } =
  useQuery<MovingZoneListResponse>({
    queryKey: [
      "getRealEstates",
      contextValues.realEstate.postalCode,
    ],
    queryFn: ({ queryKey }) =>
      getMovingZone({ postalCode: queryKey[1] as string }),
    enabled: true,
    onSuccess: (data) => {
      setMovingZones(data?.data ?? []);
    },
  });

  if (isLoading) {
    return (
      <Typography sx={{ ...theme.typography.subtitle1 }}>
        Chargement...
      </Typography>
    );
  }
  const [movingZone] = movingZones
  const zone = movingZone ? movingZone.code : ''

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    onSubmit({});
  };

  const handleChangeKeysRadio = (value: string): void => {
    setKey(value)
  }
  const handleChangeDate = (value: DateTime | undefined): void => {
    setDate(value)
  }
  return (
    <Stack spacing={5} component="form" onSubmit={handleOnSubmit} id={formId}>
      <KeysRadioGroup onChange={handleChangeKeysRadio}/>
      <DesiredDatePicker zone='PAR' keyType={key} onChange={handleChangeDate}/>
    </Stack>
  );
};

export default AppointmentForm;
