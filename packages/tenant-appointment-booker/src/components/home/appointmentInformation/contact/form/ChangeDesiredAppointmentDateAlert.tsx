import getFamilyLongName from "@/utils/getFamilyLongName";
import { Alert, Typography } from "@mui/material";
import { DateTime } from "luxon";
import { ChangeDesiredAppointmentDateAlertProps, ContactReason } from "./types";

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
      {desiredDateByContractor.toFormat("EEEE d LLLL yyyy")}. Votre demande sera
      soumise à validation de l’agence.
    </Typography>
  </>
);

const ChangeDesiredAppointmentDateAlert: React.FC<
  ChangeDesiredAppointmentDateAlertProps
> = ({ order, newDesiredDate, type }) => {
  const desiredDateByContractor = DateTime.fromISO(
    order.desiredDateByContractor
  );
  if (type === ContactReason.NOT_AVAILABLE_AT_DATES) {
    switch (order.type) {
      case "S":
      case "ES": {
        if (newDesiredDate && newDesiredDate < desiredDateByContractor) {
          return (
            <Alert severity="warning">
              <CommonEDLAppointmentDateText
                desiredDateByContractor={desiredDateByContractor}
                familyLongName={getFamilyLongName(
                  order.type,
                  order.familleLongue
                )}
              />
              <Typography variant="body2">
                Faire votre état des lieux de sortie le{" "}
                {newDesiredDate && newDesiredDate.toFormat("d LLLL")} ne vous
                exonère pas du paiement du loyer et des charges pendant la durée
                totale du préavis, soit jusqu’au{" "}
                {desiredDateByContractor.toFormat("EEEE d LLLL")}.
              </Typography>
            </Alert>
          );
        }
        if (newDesiredDate && newDesiredDate > desiredDateByContractor) {
          return (
            <Alert severity="warning">
              <CommonEDLAppointmentDateText
                desiredDateByContractor={desiredDateByContractor}
                familyLongName={getFamilyLongName(
                  order.type,
                  order.familleLongue
                )}
              />
              <Typography variant="body2">
                Faire votre état des lieux de sortie le{" "}
                {newDesiredDate && newDesiredDate.toFormat("d LLLL")} impose de
                décaler votre période de préavis. Votre demande doit être
                validée par votre agence.
              </Typography>
            </Alert>
          );
        }
      }
      case "E": {
        if (
          newDesiredDate &&
          (newDesiredDate > desiredDateByContractor ||
            newDesiredDate < desiredDateByContractor)
        ) {
          return (
            <Alert severity="warning">
              <CommonEDLAppointmentDateText
                desiredDateByContractor={desiredDateByContractor}
                familyLongName={getFamilyLongName(
                  order.type,
                  order.familleLongue
                )}
              />
              <Typography variant="body2">
                Faire votre état des lieux d’entrée le{" "}
                {newDesiredDate.toFormat("d LLLL")} ne vous exonère pas du
                règlement du loyer et des charges à la date stipulée sur votre
                bail, soit à partir du{" "}
                {desiredDateByContractor.toFormat("EEEE d LLLL")}.
              </Typography>
            </Alert>
          );
        }
      }
    }
  }

  if (["S", "ES", "E"].includes(order.type)) {
    return (
      <Alert severity="info">
        <CommonEDLAppointmentDateText
          desiredDateByContractor={desiredDateByContractor}
          familyLongName={getFamilyLongName(order.type, order.familleLongue)}
        />
      </Alert>
    );
  }

  return null;
};

export default ChangeDesiredAppointmentDateAlert;
