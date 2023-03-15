import { RadioButtonChecked, RadioButtonUnchecked } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import ChangeDesiredAppointmentDateAlert from "./ChangeDesiredAppointmentDateAlert";
import { ContactReason, NotAvailableAtDatesProps } from "./types";

const NotAvailableAtDates: React.FC<NotAvailableAtDatesProps> = ({
  expanded,
  onChange,
  order,
  formId,
  disabled,
  onSubmit,
  setFormIsValid,
}) => {
  const [date, setDate] = useState(
    DateTime.fromISO(order.desiredDateByContractor)
  );
  const [reason, setReason] = useState("");

  useEffect(() => {
    setFormIsValid(date.isValid && Boolean(reason) && reason.length > 0);
  }, [date, reason, setFormIsValid]);

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    onSubmit({ newDesiredDate: date, reason });
  };

  return (
    <Accordion
      expanded={expanded}
      onChange={onChange}
      defaultExpanded
      elevation={0}
      variant="outlined"
      disableGutters
    >
      <AccordionSummary
        expandIcon={
          expanded ? (
            <RadioButtonChecked color="secondary" />
          ) : (
            <RadioButtonUnchecked color="disabled" />
          )
        }
      >
        Je suis indisponible aux dates proposées
      </AccordionSummary>
      <AccordionDetails>
        {expanded && (
          <Stack
            component="form"
            id={formId}
            onSubmit={handleOnSubmit}
            spacing={1.5}
          >
            <DatePicker
              label="À quelle date souhaitez-vous faire l’état des lieux ?"
              format="EEEE, d MMMM yyyy"
              value={date}
              disablePast
              disabled={disabled}
              onChange={(newValue) => {
                setDate(newValue as DateTime);
              }}
              slotProps={{
                openPickerIcon: {
                  fontSize: "small",
                },
                textField: {
                  name: "newDesiredDate",
                  required: true,
                  color: "secondary",
                },
                day: {
                  sx: {
                    "&.Mui-selected": {
                      backgroundColor: "secondary.main",
                      color: "secondary.contrastText",
                      "&:hover": {
                        backgroundColor: "secondary.main",
                      },
                      "&:focus": {
                        backgroundColor: "secondary.main",
                      },
                    },
                  },
                },
              }}
            />
            <TextField
              name="newDesiredDateReason"
              label="Indiquez les raisons du changement de date voulue"
              placeholder="Indiquez les raisons du changement de date voulue"
              color="secondary"
              value={reason}
              disabled={disabled}
              onChange={(event) => {
                setReason(event.target.value);
              }}
              multiline
              required
            />
            <ChangeDesiredAppointmentDateAlert
              order={order}
              newDesiredDate={date}
              type={ContactReason.NOT_AVAILABLE_AT_DATES}
            />
          </Stack>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default NotAvailableAtDates;
