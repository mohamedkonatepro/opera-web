import { RadioButtonChecked, RadioButtonUnchecked } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  TextField,
} from "@mui/material";

interface CancelAppointmentProps {
  expanded: boolean;
  formId: string;
  onSubmit: () => void;
  onChange: () => void;
}

const CancelAppointment: React.FC<CancelAppointmentProps> = ({
  expanded,
  onChange,
  formId,
}) => {
  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    alert("on submit 2");
  };

  return (
    <Accordion
      expanded={expanded}
      onChange={onChange}
      defaultExpanded
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
        Je ne souhaite pas prendre de rendez-vous
      </AccordionSummary>
      <AccordionDetails sx={{ bgcolor: "background.default" }}>
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
