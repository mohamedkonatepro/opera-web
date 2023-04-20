import { Box, Stack, Divider } from '@mui/material';
import NewOrder from '../components/NewOrder';
import RealEstateFilterableList from '../components/RealEstateFilterableList';

export default function Home() {
  return (
    <Stack
        direction="column"
        divider={<Divider orientation="horizontal" flexItem />}
        spacing={3}
        sx={{
          marginLeft: "288px", 
          display: "flex"
        }}
      >
      <NewOrder />
      <RealEstateFilterableList />
    </Stack>
  )
}
