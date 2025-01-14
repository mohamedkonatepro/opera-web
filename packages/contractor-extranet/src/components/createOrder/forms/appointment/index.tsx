import { Stack, TextField, Typography, useTheme } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { DateTime } from "luxon";
import { getMovingZone } from "@/queries/movingZone";
import { MovingZone } from "@/types/MovingZone";
import { useQuery } from "@tanstack/react-query";
import KeysRadioGroup from "./KeysRadioGroup";
import { KeyEnumWithStrIndex } from "@/constants";
import DateAndSlots from "./DateAndSlots";
import Slot from "@/types/Slot";

export interface AppointmentProps {
  formId: string;
  onSubmit: (formState: any) => void;
  contextValues: any;
  initialValues?: any;
  setIsButtonAppointmentVisible?: (disabled: boolean) => void;
  submitWithAppointment?: boolean;
}

const AppointmentForm: FC<AppointmentProps> = ({
  formId,
  onSubmit,
  contextValues,
  initialValues = {},
  setIsButtonAppointmentVisible,
  submitWithAppointment,
}) => {
  const theme = useTheme();
  const [date, setDate] = useState<DateTime | undefined>(
    initialValues?.date ?? undefined
  );
  const [movingZones, setMovingZones] = useState<MovingZone>(
    initialValues?.movingZones ?? undefined
  );
  const [key, setKey] = useState(initialValues?.key ?? "tenant");
  const [furtherInformations, setFurtherInformations] = useState(
    contextValues?.furtherInformations ?? ""
  );
  const [selectedAppointmentDate, setSelectedAppointmentDate] = useState<
    DateTime | undefined
  >(initialValues?.selectedAppointmentDate ?? undefined);
  const [selectedSlot, setSelectedSlot] = useState<Slot | undefined>(
    initialValues?.selectedSlot ?? undefined
  );

  const { isLoading } = useQuery<MovingZone>({
    queryKey: ["getRealEstates", contextValues.realEstate?.postalCode],
    queryFn: ({ queryKey }) =>
      getMovingZone({ postalCode: queryKey[1] as string }),
    enabled: true,
    onSuccess: (data) => {
      setMovingZones(data);
    },
    onError(err: any) {
      setMovingZones(err);
    },
  });

  useEffect(() => {
    setIsButtonAppointmentVisible?.(selectedSlot !== undefined);
  }, [selectedSlot, setIsButtonAppointmentVisible]);
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

    const createOrder = {
      date,
      key: KeyEnumWithStrIndex[key.toUpperCase()],
      furtherInformations,
      ...(submitWithAppointment && {
        selectedAppointmentDate,
        selectedSlot,
      }),
    };

    onSubmit(createOrder);
  };

  const handleChangeKeysRadio = (value: string): void => {
    setKey(value);
    handleChangeDate(undefined);
  };
  const handleChangeDate = (value: DateTime | undefined): void => {
    setDate(value);
    setSelectedAppointmentDate(value);
    setSelectedSlot(undefined);
  };

  const handleSelectAppointmentDate = (value: DateTime): void => {
    setSelectedAppointmentDate(value);
  };

  const handleSelectSlot = (value: Slot): void => {
    setSelectedSlot(value);
  };

  return (
    <Stack spacing={5} component="form" onSubmit={handleOnSubmit} id={formId}>
      <KeysRadioGroup onChange={handleChangeKeysRadio} />
      <DateAndSlots
        zone={zone}
        keyType={key}
        handleChangeDate={handleChangeDate}
        date={date}
        handleSelectAppointmentDate={handleSelectAppointmentDate}
        selectedAppointmentDate={selectedAppointmentDate}
        handleSelectSlot={handleSelectSlot}
        selectedSlot={selectedSlot}
        contextValues={contextValues}
      />
      <Stack spacing={1}>
        <Typography
          variant="subtitle1"
          sx={{ ...theme.typography.subtitle1, marginBottom: 1 }}
        >
          Informations complémentaires
        </Typography>
        <TextField
          name="furtherInformations"
          label="Informations complémentaires"
          placeholder="Informations complémentaires"
          color="secondary"
          sx={{
            bgcolor: "background.paper",
          }}
          multiline
          value={furtherInformations}
          onChange={(event) => {
            setFurtherInformations(event.target.value);
          }}
        />
      </Stack>
    </Stack>
  );
};

export default AppointmentForm;
