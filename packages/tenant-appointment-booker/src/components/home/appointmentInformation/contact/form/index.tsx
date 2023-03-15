import { Box, Paper, Stack, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { DateTime } from "luxon";
import { useState } from "react";
import CancelAppointment from "./CancelAppointment";
import NotAvailableAtDates from "./NotAvailableAtDates";
import {
  ContactFormProps,
  ContactFormSubmitValues,
  ContactReason,
} from "./types";

const ContactForm: React.FC<ContactFormProps> = ({
  id,
  defaultValues,
  disabled,
  onSubmit,
  setFormIsValid,
}) => {
  const [expanded, setExpanded] = useState<ContactReason>(
    ContactReason.NOT_AVAILABLE_AT_DATES
  );

  const handleOnChangeAccordion = (panel: ContactReason) => () => {
    setExpanded(panel);
  };

  const handleOnSubmit = (values: ContactFormSubmitValues) => {
    onSubmit({ ...values, type: expanded });
  };

  return (
    <Stack spacing={2}>
      <Typography variant="subtitle1" fontWeight="500">
        Motif de la demande
      </Typography>
      <Box>
        <NotAvailableAtDates
          expanded={expanded === ContactReason.NOT_AVAILABLE_AT_DATES}
          onChange={handleOnChangeAccordion(
            ContactReason.NOT_AVAILABLE_AT_DATES
          )}
          desiredDateByContractor={DateTime.fromISO(
            defaultValues.desiredDateByContractor
          )}
          onSubmit={handleOnSubmit}
          formId={id}
          setFormIsValid={setFormIsValid}
          disabled={disabled}
        />

        <CancelAppointment
          expanded={expanded === ContactReason.CANCEL_APPOINTMENT}
          onChange={handleOnChangeAccordion(ContactReason.CANCEL_APPOINTMENT)}
          onSubmit={handleOnSubmit}
          formId={id}
          setFormIsValid={setFormIsValid}
        />
      </Box>
    </Stack>
  );
};

export default ContactForm;
