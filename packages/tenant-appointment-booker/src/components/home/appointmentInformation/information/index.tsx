import Order from "@/types/order";
import { Divider } from "@mui/material";
import { Stack } from "@mui/system";
import MeetingSummary from "./MeetingSummary";
import RealEstateSummary from "./RealEstateSummary";
import TenantSummary from "./TenantSummary";

interface InformationProps {
  order: Order;
}

const Information: React.FunctionComponent<InformationProps> = ({ order }) => {
  const { commercialName, familleLongue, bien, locataires } = order;
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
          familyLongName={familleLongue}
        />
        <RealEstateSummary realEstate={bien} />
        <TenantSummary locataire={locataire} />
      </Stack>
    </>
  );
};

export default Information;
