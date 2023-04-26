import { Box, Stack, Divider } from "@mui/material";
import NewOrder from "../components/NewOrder";
import RealEstateFilterableList from "../components/RealEstateFilterableList";
import SideBar from "../components/common/SideBar";

export default function Home() {
  return (
    <Stack
      direction="column"
      divider={<Divider orientation="horizontal" flexItem />}
      spacing={3}
      sx={{
        display: "flex",
      }}
    >
      <NewOrder />
      <RealEstateFilterableList />
    </Stack>
  );
}
