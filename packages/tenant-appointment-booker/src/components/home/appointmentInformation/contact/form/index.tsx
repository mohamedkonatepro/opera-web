import { Box, Paper, Stack, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { DateTime } from "luxon";
import { useState } from "react";
import CancelAppointment from "./CancelAppointment";
import NotAvailableAtDates from "./NotAvailableAtDates";

enum ContactReason {
  NOT_AVAILABLE_AT_DATES,
  CANCEL_APPOINTMENT,
}

interface ContactFormProps {
  id: string;
  defaultValues: {
    desiredDateByContractor: string;
  };
}

const ContactForm: React.FC<ContactFormProps> = ({ id, defaultValues }) => {
  const [expanded, setExpanded] = useState<ContactReason>(
    ContactReason.NOT_AVAILABLE_AT_DATES
  );

  const handleOnChangeAccordion = (panel: ContactReason) => () => {
    setExpanded(panel);
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
          onSubmit={() => alert("on submit")}
          formId={id}
        />

        <CancelAppointment
          expanded={expanded === ContactReason.CANCEL_APPOINTMENT}
          onChange={handleOnChangeAccordion(ContactReason.CANCEL_APPOINTMENT)}
          onSubmit={() => alert("on submit 2")}
          formId={id}
        />
      </Box>
    </Stack>
  );
};

export default ContactForm;
