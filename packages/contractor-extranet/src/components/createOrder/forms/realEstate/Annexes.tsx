import HelpIcon from "@mui/icons-material/Help";
import DeleteIconOutlined from "@mui/icons-material/DeleteOutlined";
import {
  Box,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { nanoid } from "nanoid";
import { useState } from "react";

const Annexes = () => {
  const [annexes, setAnnexes] = useState<any[]>([]);

  const addAnnex = () => {
    setAnnexes([
      ...annexes,
      {
        id: nanoid(),
      },
    ]);
  };

  const removeAnnex = (index: number) => {
    const newAnnexes = [...annexes];
    newAnnexes.splice(index, 1);
    setAnnexes(newAnnexes);
  };

  return (
    <Stack spacing={2} alignItems="start">
      <Typography variant="subtitle1">Annexe</Typography>
      {annexes.map((annex, index) => {
        return (
          <Stack key={annex.id} spacing={2} direction="row">
            <TextField
              label="Type"
              color="secondary"
              required
              select
              fullWidth
            />
            <TextField
              label="Numéro de lot"
              color="secondary"
              required
              fullWidth
            />
            <TextField
              label="Localisation"
              color="secondary"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <HelpIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Box display="flex" alignItems="center" justifyContent="center">
              <IconButton
                color="error"
                onClick={() => removeAnnex(index)}
                size="small"
                sx={{
                  backgroundColor: "transparent",
                  "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
                }}
              >
                <DeleteIconOutlined />
              </IconButton>
            </Box>
          </Stack>
        );
      })}
      <Link
        component="button"
        underline="none"
        color="border.bold"
        typography="subtitle2"
        onClick={addAnnex}
      >
        <Box mr={1} component="span">
          +
        </Box>
        <span>Ajouter une annexe</span>
      </Link>
    </Stack>
  );
};

export default Annexes;
