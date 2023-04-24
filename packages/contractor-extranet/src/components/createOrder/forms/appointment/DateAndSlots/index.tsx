import { Stack, Typography } from "@mui/material";
import DesiredDatePicker from "./DesiredDatePicker";
import ContainedButton from "@/components/common/buttons/ContainedButton";
import { DateAndSlotsProps } from "./types";
import { FC } from "react";
import SearchIcon from "@mui/icons-material/Search";
import SelectAppointment from "./selectAppointment";

const DateAndSlots: FC<DateAndSlotsProps> = ({
  zone,
  handleChangeDate,
  key,
  date,
}) => {
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
        >
          Voir les disponibilités
        </ContainedButton>

        <SelectAppointment />
      </Stack>
    </Stack>
  );
};

export default DateAndSlots;
