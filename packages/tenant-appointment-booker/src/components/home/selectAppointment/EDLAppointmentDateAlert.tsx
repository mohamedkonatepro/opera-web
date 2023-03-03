import { Alert, Typography } from "@mui/material";
import { DateTime } from "luxon";

interface EDLAppointmentDateAlertProps {
  desiredDateByContractor: DateTime;
  selectedDate: DateTime;
  orderType: string;
}

const CommonEDLAppointmentDateText: React.FC<{
  desiredDateByContractor: DateTime;
}> = ({ desiredDateByContractor }) => (
  <Typography variant="body2" color="text.primary" fontWeight="500">
    L’état des lieux de sortie est initialement prévu le{" "}
    {desiredDateByContractor.toFormat("EEEE d LLLL yyyy")}.
  </Typography>
);

const EDLAppointmentDateAlert: React.FC<EDLAppointmentDateAlertProps> = ({
  desiredDateByContractor,
  selectedDate,
  orderType,
}) => {
  switch (orderType) {
    case "S":
    case "ES": {
      if (selectedDate < desiredDateByContractor) {
        return (
          <Alert severity="warning" sx={{ bgcolor: "warning.light" }}>
            <CommonEDLAppointmentDateText
              desiredDateByContractor={desiredDateByContractor}
            />
            <Typography variant="body2">
              Faire l’état des lieux de sortie le{" "}
              {selectedDate.toFormat("d LLLL")} ne vous exonère pas du paiement
              du loyer et des charges pendant la durée totale du préavis, soit
              jusqu’au {desiredDateByContractor.toFormat("EEEE d LLLL")}.
            </Typography>
          </Alert>
        );
      }
    }
    case "E": {
      if (selectedDate > desiredDateByContractor) {
        return (
          <Alert severity="warning" sx={{ bgcolor: "warning.light" }}>
            <CommonEDLAppointmentDateText
              desiredDateByContractor={desiredDateByContractor}
            />
            <Typography variant="body2">
              Faire l’état des lieux d’entrée le{" "}
              {selectedDate.toFormat("d LLLL")} ne vous exonère pas du règlement
              du loyer et des charges à la date stipulée sur votre bail, soit à
              partir du {desiredDateByContractor.toFormat("EEEE d LLLL")}.
            </Typography>
          </Alert>
        );
      }
    }
  }

  return (
    <Alert severity="info" sx={{ bgcolor: "info.light" }}>
      <CommonEDLAppointmentDateText
        desiredDateByContractor={desiredDateByContractor}
      />
    </Alert>
  );
};

export default EDLAppointmentDateAlert;
