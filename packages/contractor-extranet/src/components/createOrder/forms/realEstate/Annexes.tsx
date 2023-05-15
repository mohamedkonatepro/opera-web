import { FC } from "react";
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
import BuildingAnnexTypeSelect from "@/components/inputs/BuildingAnnexTypeSelect";
import { AnnexesFormProps } from "./types";
import { BuildingAnnexType } from "@/types/BuildingAnnexType";

const Annexes: FC<AnnexesFormProps> = ({ annexes, setAnnexes }) => {
  const addAnnex = () => {
    setAnnexes([
      ...annexes,
      {
        id: nanoid(),
        type: undefined,
        unitReference: "",
        location: "",
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
            <BuildingAnnexTypeSelect
              id={`building-annex-type-${index}`}
              value={annex.type}
              setValue={(value: BuildingAnnexType) => {
                const newAnnexes = [...annexes];
                newAnnexes[index].type = value;
                setAnnexes(newAnnexes);
              }}
            />
            {annex.type !== undefined && (
              <><TextField
                id={`building-annex-unit-reference-${index}`}
                label="Numéro de lot"
                color="secondary"
                required
                fullWidth
                value={annex.unitReference}
                onChange={(event) => {
                  const newAnnexes = [...annexes];
                  newAnnexes[index].unitReference = event.target.value;
                  setAnnexes(newAnnexes);
                } } /><TextField
                  id={`building-annex-location-${index}`}
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
                  value={annex.location}
                  onChange={(event) => {
                    const newAnnexes = [...annexes];
                    newAnnexes[index].location = event.target.value;
                    setAnnexes(newAnnexes);
                  } } /></>
            )}
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
        type="button"
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
