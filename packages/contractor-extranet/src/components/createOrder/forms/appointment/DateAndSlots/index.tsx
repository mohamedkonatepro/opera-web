import { Stack, Typography } from "@mui/material";
import DesiredDatePicker from "./DesiredDatePicker";
import ContainedButton from "@/components/common/buttons/ContainedButton";
import { DateAndSlotsProps } from "./types";
import { FC, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import SelectAppointment from "./selectAppointment";
import { DateTime } from "luxon";

const DateAndSlots: FC<DateAndSlotsProps> = ({
  zone,
  handleChangeDate,
  key,
  date,
  handleSelectAppointmentDate,
  selectedAppointmentDate,
  selectedSlot,
  handleSelectSlot,
  contextValues
}) => {

  const [showSlots, setShowSlots] = useState(false);

  return (
    <Stack spacing={2}>
      <Typography variant="subtitle1">Date souhaitée</Typography>
      <Stack spacing={2} direction="row">
        <DesiredDatePicker
          zone={zone}
          keyType={key}
          onChange={handleChangeDate}
        />
        <ContainedButton
          startIcon={<SearchIcon />}
          padding="small"
          disabled={!date}
          color="secondary"
          sx={{ minWidth: "203px" }}
          onClick={() => setShowSlots(!showSlots)}
        >
          Voir les disponibilités
        </ContainedButton>
      </Stack>
      {showSlots && (
        <SelectAppointment
          desiredDateByContractor={date as DateTime}
          onSelectDate={handleSelectAppointmentDate}
          selectedDate={selectedAppointmentDate as DateTime}
          selectedSlot={selectedSlot}
          onSelectSlot={handleSelectSlot}
          contextValues={contextValues}
        />
      )}
    </Stack>
  );
};

export default DateAndSlots;
