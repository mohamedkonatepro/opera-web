import Order from "@/types/order";
import { Stack } from "@mui/material";
import Contact from "./contact";
import Information from "./information";

interface AppointmentInformationProps {
  order: Order;
}

const AppointmentInformation: React.FunctionComponent<
  AppointmentInformationProps
> = ({ order }) => {
  return (
    <Stack>
      <Information order={order} />
      <Contact order={order} />
    </Stack>
  );
};

export default AppointmentInformation;
