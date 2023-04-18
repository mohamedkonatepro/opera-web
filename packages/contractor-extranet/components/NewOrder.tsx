import { Paper, Box, Stack, Typography, Button } from '@mui/material';
import Image from "next/image";
import ContainedButton from "./common/buttons/ContainedButton";

const NewOrder: React.FunctionComponent = () => {
  return (
    <Paper
    elevation={3}
    sx={{
      margin: "24px 32px 24px 32px",
      bgcolor: "background.default",
      display: "flex"
    }}
  >
    <Box>
      <Stack sx={{ margin: "32px" }} spacing={3}>
        <Stack spacing={1}>
          <Typography variant="body2" color="secondary.main">
            Nouvelle commande
          </Typography>
          <Typography variant="h6" sx={{ marginTop: "8px" }}>
            Créer une commande sans référence
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ marginTop: "8px" }}>
            Vous n’avez pas de référence associée au bien et vous souhaitez créer une commande.
            En cliquant sur le bouton ci-dessous vous pourrez configurer une nouvelle commande avec toutes les options qui vous conviennent.
          </Typography>
        </Stack>

        <ContainedButton
          type="submit"
          color="secondary"
          padding="large"
          href="/create-order"
          width="167px"
        >
          Nouvelle commande
        </ContainedButton>
      </Stack>
    </Box>
    <Box>
      <Stack sx={{ margin: "32px 32px 32px 0" }}>
        <Image src="/IllustrationCreateOrder.svg" alt="Logo" width={496} height={192} />
      </Stack>
    </Box>
  </Paper>
  );
};

export default NewOrder;
