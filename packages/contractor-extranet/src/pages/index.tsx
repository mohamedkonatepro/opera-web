import { Box, Stack, Typography, Divider } from '@mui/material';
import NewOrder from '../components/NewOrder';
import RealEstateFilter from '../components/RealEstateFilter';

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
      <RealEstateFilter />
    </Stack>
  )
}
