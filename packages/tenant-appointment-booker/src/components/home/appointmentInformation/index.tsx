import Order from "@/types/order";
import { Divider, Stack } from "@mui/material";
import Contact from "./contact";
import Information from "./information";

interface AppointmentInformationProps {
  order: Order;
}

const AppointmentInformation: React.FunctionComponent<
  AppointmentInformationProps
> = ({ order }) => {
  return (
    <Stack spacing={3} divider={<Divider orientation="horizontal" flexItem />}>
      <Information order={order} />
      <Contact order={order} />
    </Stack>
  );
};

export default AppointmentInformation;
