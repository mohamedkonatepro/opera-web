import { Box, Stack, Typography, Divider } from '@mui/material';
import NewOrder from '../../components/NewOrder';
import RealEstateFilter from '../../components/RealEstateFilter';

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
      <Box
        sx={{
          margin: "24px 32px 24px 32px",
          display: "flex"
        }}
      >
      <Stack spacing={3}>
        <Stack spacing={1}>
          <Typography variant="body2" color="secondary.main">
            Nouvelle commande
          </Typography>
          <Typography variant="h6" sx={{ marginTop: "8px" }}>
            Créer une commande à partir d&apos;une référence
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ marginTop: "8px" }}>
            Utilisez les filtres ci-dessous pour trouver un bien.
          </Typography>
        </Stack>
        <RealEstateFilter />
      </Stack>
    </Box>
    </Stack>
  )
}
