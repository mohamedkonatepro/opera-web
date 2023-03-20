import Order from "@/types/order";
import { Divider } from "@mui/material";
import { Stack } from "@mui/system";
import MeetingSummary from "./MeetingSummary";
import RealEstateSummary from "../../../common/RealEstateSummary";
import TenantSummary from "../../../common/TenantSummary";
import getFamilyLongName from "@/utils/getFamilyLongName";

interface InformationProps {
  order: Order;
  appointmentBookingId: string;
}

const Information: React.FunctionComponent<InformationProps> = ({
  order,
  appointmentBookingId,
}) => {
  const {
    commercialName,
    familleLongue,
    bien,
    locataires,
    type,
    desiredDateByContractor,
  } = order;
  const locataire = locataires[0];

  return (
    <>
      <Stack
        direction="column"
        divider={<Divider orientation="horizontal" flexItem />}
        spacing={3}
      >
        <MeetingSummary
          commercialName={commercialName}
          familyLongName={getFamilyLongName(type, familleLongue)}
          desiredDateByContractor={desiredDateByContractor}
        />
        <RealEstateSummary
          realEstate={bien}
          orderId={order.orderId}
          displayEditButton
        />
        <TenantSummary
          locataire={locataire}
          orderId={order.orderId}
          displayEditButton
          appointmentBookingId={appointmentBookingId}
        />
      </Stack>
    </>
  );
};

export default Information;
