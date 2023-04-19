import { Stack } from "@mui/material";
import Address from "./Address";
import RealEstate from "./RealEstate";
import Annexes from "./Annexes";
import Energy from "./Energy";
import MeterLocation from "./MeterLocation";
import Unit from "./Unit";

const RealEstateForm = () => {
  return (
    <Stack spacing={5}>
      <Address />
      <RealEstate />
      <Unit />
      <Annexes />
      <Energy />
      <MeterLocation />
    </Stack>
  );
};

export default RealEstateForm;
