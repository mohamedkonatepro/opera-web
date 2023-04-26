import { Alert, Typography } from "@mui/material";
import { DateTime } from "luxon";

interface EDLAppointmentDateAlertProps {
  desiredDateByContractor: DateTime;
  selectedDate: DateTime;
  orderType: string;
  familyLongName: string;
}

const CommonEDLAppointmentDateText: React.FC<{
  desiredDateByContractor: DateTime;
  familyLongName: string;
}> = ({ desiredDateByContractor, familyLongName }) => (
  <>
    <Typography variant="subtitle2" display="inline">
      Votre{" "}
    </Typography>
    <Typography variant="subtitle2" textTransform="lowercase" display="inline">
      {familyLongName}
    </Typography>
    <Typography variant="subtitle2" display="inline">
      {" "}
      est initialement prévu le{" "}
      {desiredDateByContractor.toFormat("EEEE d LLLL yyyy")}.
    </Typography>
  </>
);

const EDLAppointmentDateAlert: React.FC<EDLAppointmentDateAlertProps> = ({
  desiredDateByContractor,
  selectedDate,
  orderType,
  familyLongName,
}) => {
  switch (orderType) {
    case "S":
    case "ES": {
      if (selectedDate < desiredDateByContractor) {
        return (
          <Alert severity="warning">
            <CommonEDLAppointmentDateText
              desiredDateByContractor={desiredDateByContractor}
              familyLongName={familyLongName}
            />
            <Typography variant="body2" color="text.secondary">
              Faire votre état des lieux de sortie le{" "}
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
          <Alert severity="warning">
            <CommonEDLAppointmentDateText
              desiredDateByContractor={desiredDateByContractor}
              familyLongName={familyLongName}
            />
            <Typography variant="body2" color="text.secondary">
              Faire votre état des lieux d’entrée le{" "}
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
    <Alert severity="info">
      <CommonEDLAppointmentDateText
        desiredDateByContractor={desiredDateByContractor}
        familyLongName={familyLongName}
      />
    </Alert>
  );
};

export default EDLAppointmentDateAlert;
