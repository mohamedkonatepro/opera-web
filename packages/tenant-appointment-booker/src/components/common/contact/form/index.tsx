import { Box, Stack, Typography } from "@mui/material";
import CancelAppointment from "./CancelAppointment";
import NotAvailableAtDates from "./NotAvailableAtDates";
import {
  ContactFormProps,
  ContactFormSubmitValues,
  ContactReason,
} from "./types";
import { useState } from "react";

const ContactForm: React.FC<ContactFormProps> = ({
  id,
  appointmentBooking,
  disabled,
  onSubmit,
  setFormIsValid,
  canChangeDate,
  canCancelAppointment,
}) => {
  const [expanded, setExpanded] = useState<ContactReason>(
    ContactReason.NOT_AVAILABLE_AT_DATES
  );

  const handleOnChangeAccordion = (panel: ContactReason) => () => {
    setExpanded(panel);
  };

  const handleOnSubmit = (values: ContactFormSubmitValues): void => {
    onSubmit({ ...values, type: expanded });
  };

  return (
    <Stack spacing={2}>
      <Typography variant="subtitle1">Motif de la demande</Typography>
      <Box>
        {canChangeDate && (
          <NotAvailableAtDates
            expanded={expanded === ContactReason.NOT_AVAILABLE_AT_DATES}
            onChange={handleOnChangeAccordion(
              ContactReason.NOT_AVAILABLE_AT_DATES
            )}
            order={appointmentBooking.order}
            onSubmit={handleOnSubmit}
            formId={id}
            setFormIsValid={setFormIsValid}
            disabled={disabled}
          />
        )}

        {canCancelAppointment && (
          <CancelAppointment
            expanded={expanded === ContactReason.CANCEL_APPOINTMENT}
            onChange={handleOnChangeAccordion(ContactReason.CANCEL_APPOINTMENT)}
            onSubmit={handleOnSubmit}
            formId={id}
            setFormIsValid={setFormIsValid}
            order={appointmentBooking.order}
          />
        )}
      </Box>
    </Stack>
  );
};

export default ContactForm;
