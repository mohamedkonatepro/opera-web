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
import { useState } from "react";

interface NotAvailableAtDatesProps {
  expanded: boolean;
  desiredDateByContractor: DateTime;
  formId: string;
  onSubmit: () => void;
  onChange: () => void;
}

const NotAvailableAtDates: React.FC<NotAvailableAtDatesProps> = ({
  expanded,
  onChange,
  desiredDateByContractor,
  formId,
}) => {
  const [date, setDate] = useState(desiredDateByContractor);

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    alert("on submit");
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
        sx={{
          flexDirection: "row-reverse",
          "& .MuiAccordionSummary-content": {
            marginLeft: 1.5,
          },
        }}
        expandIcon={
          expanded ? (
            <RadioButtonChecked color="secondary" />
          ) : (
            <RadioButtonUnchecked htmlColor="text.disabled" />
          )
        }
      >
        Je suis indisponible aux dates proposées
      </AccordionSummary>
      <AccordionDetails sx={{ bgcolor: "background.default" }}>
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
              onChange={(newValue) => {
                setDate(newValue as DateTime);
              }}
              slotProps={{
                textField: {
                  name: "notAvailableAtDatesReason",
                  required: true,
                  color: "secondary",
                  sx: {
                    bgcolor: "background.paper",
                  },
                },
                day: {
                  sx: {
                    "&.Mui-selected": {
                      backgroundColor: "secondary.main",
                      color: "secondary.contrastText",
                    },
                  },
                },
              }}
            />
            <TextField
              name="notAvailableAtDatesReason"
              label="Indiquez les raisons du changement de date voulue"
              placeholder="Indiquez les raisons du changement de date voulue"
              color="secondary"
              sx={{
                bgcolor: "background.paper",
              }}
              multiline
              required
            />
          </Stack>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default NotAvailableAtDates;
