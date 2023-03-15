import { RadioButtonChecked, RadioButtonUnchecked } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { CancelAppointmentProps } from "./types";

const CancelAppointment: React.FC<CancelAppointmentProps> = ({
  expanded,
  onChange,
  formId,
  onSubmit,
  setFormIsValid,
}) => {
  const [reason, setReason] = useState("");

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    onSubmit({ reason });
  };

  useEffect(() => {
    if (reason && reason.length > 0) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [reason, setFormIsValid]);

  return (
    <Accordion
      expanded={expanded}
      onChange={onChange}
      defaultExpanded
      variant="outlined"
      disableGutters
    >
      <AccordionSummary
        expandIcon={
          expanded ? (
            <RadioButtonChecked fontSize="small" color="secondary" />
          ) : (
            <RadioButtonUnchecked fontSize="small" htmlColor="text.disabled" />
          )
        }
      >
        Je ne souhaite pas prendre de rendez-vous
      </AccordionSummary>
      <AccordionDetails>
        {expanded && (
          <Stack
            component="form"
            id={formId}
            onSubmit={handleOnSubmit}
            spacing={1.5}
          >
            <TextField
              name="cancelAppointmentReason"
              label="Indiquez les raisons de l’annulation de rendez-vous…"
              placeholder="Indiquez les raisons de l’annulation de rendez-vous…"
              color="secondary"
              sx={{
                bgcolor: "background.paper",
              }}
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              multiline
              required
            />
          </Stack>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default CancelAppointment;
