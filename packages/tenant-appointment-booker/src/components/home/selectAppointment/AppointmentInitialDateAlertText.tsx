import { DateTime } from "luxon";
import EDLAppointmentDateAlert from "./EDLAppointmentDateAlert";

interface AppointmentInitialDateAlertTextProps {
  desiredDateByContractor: DateTime;
  selectedDate: DateTime;
  orderType: string;
  orderFamily: string;
  orderFamilyLongName: string;
}

const AppointmentInitialDateAlertText: React.FC<
  AppointmentInitialDateAlertTextProps
> = ({
  desiredDateByContractor,
  selectedDate,
  orderType,
  orderFamily,
  orderFamilyLongName,
}) => {
  if (orderFamily === "EDL") {
    return (
      <EDLAppointmentDateAlert
        desiredDateByContractor={desiredDateByContractor}
        selectedDate={selectedDate}
        orderType={orderType}
        familyLongName={orderFamilyLongName}
      />
    );
  }

  return null;
};

export default AppointmentInitialDateAlertText;
