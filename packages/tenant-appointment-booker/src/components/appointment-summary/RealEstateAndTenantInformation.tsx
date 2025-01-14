import Order from "@/types/order";
import { Stack } from "@mui/material";
import RealEstateSummary from "../common/RealEstateSummary";
import TenantSummary from "../common/TenantSummary";

interface RealEstateAndTenantInformationProps {
  order: Order;
}

const RealEstateAndTenantInformation: React.FC<
  RealEstateAndTenantInformationProps
> = ({ order }) => {
  const { locataires, bien } = order;
  const locataire = locataires[0];
  return (
    <Stack spacing={3}>
      <RealEstateSummary realEstate={bien} orderId={order.orderId} />
      <TenantSummary
        locataire={locataire}
        orderId={order.orderId}
      />
    </Stack>
  );
};

export default RealEstateAndTenantInformation;
