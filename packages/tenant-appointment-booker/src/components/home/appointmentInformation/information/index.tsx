import Order from "@/types/order";
import { Divider } from "@mui/material";
import { Stack } from "@mui/system";
import MeetingSummary from "./MeetingSummary";
import RealEstateSummary from "../../../common/RealEstateSummary";
import TenantSummary from "../../../common/TenantSummary";
import getFamilyLongName from "@/utils/getFamilyLongName";
import TenantRequestProps from "@/types/tenantResquestProps";
import TenantRequestSummary from "@/components/common/TenantRequestSummary";
import InformationsSummary from "@/components/common/InformationsSummary";

interface InformationProps {
  order: Order;
  appointmentBookingId: string;
  tenantRequest?: TenantRequestProps;
}

const Information: React.FunctionComponent<InformationProps> = ({
  order,
  appointmentBookingId,
  tenantRequest,
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
        {!tenantRequest && (
          <MeetingSummary
            commercialName={commercialName}
            familyLongName={getFamilyLongName(type, familleLongue)}
            desiredDateByContractor={desiredDateByContractor}
          />
        )}

        {tenantRequest && (
          <TenantRequestSummary
            familyLongName={familleLongue}
            orderId={order.orderId}
            tenantRequest={tenantRequest}
          />
        )}

        {tenantRequest && !tenantRequest.treated && (
          <InformationsSummary tenantRequest={tenantRequest} />
        )}
        <RealEstateSummary
          realEstate={bien}
          orderId={order.orderId}
          displayEditButton
          tenantRequest={tenantRequest}
        />
        <TenantSummary
          locataire={locataire}
          orderId={order.orderId}
          displayEditButton
          appointmentBookingId={appointmentBookingId}
          tenantRequest={tenantRequest}
        />
      </Stack>
    </>
  );
};

export default Information;
