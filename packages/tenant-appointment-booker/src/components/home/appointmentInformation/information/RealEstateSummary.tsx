import { Box, Divider, Stack, Typography } from "@mui/material";
import UnderlinedButton from "../customMaterial/UnderlinedButton";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";
import RealEstate from "@/types/realEstate";

interface RealEstateSummaryProps {
  realEstate: RealEstate;
  displayButton?: string;
}

const clickHandler = () => {
  alert("Modification information bien");
};

const RealEstateSummary: React.FunctionComponent<RealEstateSummaryProps> = (
  props
) => {
  const { realEstate, displayButton } = props;
  return (
    <Box>
      <Stack spacing={0.8}>
        <Stack
          direction="row"
          spacing={0.2}
          alignItems="center"
          display="flex"
          divider={
            <Divider variant="inset" color="text.primary">
              <FiberManualRecordIcon sx={{ width: 4, mt: 0.5 }} />
            </Divider>
          }
        >
          <Typography variant="body2" color="text.secondary">
            Informations du bien
          </Typography>
          {displayButton != "none" && (
            <UnderlinedButton
              label="Modifier"
              handler={clickHandler}
            ></UnderlinedButton>
          )}
        </Stack>
        <Typography
          variant="body2"
          color="text.primary"
          alignItems="center"
          display="flex"
        >
          <PlaceOutlinedIcon sx={{ mr: 1.2 }} /> {realEstate.Address},{" "}
          {realEstate.CP} {realEstate.Ville}
        </Typography>
        <Stack
          direction="row"
          spacing={0.2}
          alignItems="center"
          display="flex"
          divider={
            <Divider variant="inset" color="text.primary">
              <FiberManualRecordIcon sx={{ width: 4, mt: 0.5 }} />
            </Divider>
          }
        >
          <Typography
            variant="body2"
            color="text.primary"
            alignItems="center"
            display="flex"
          >
            <CottageOutlinedIcon sx={{ mr: 1.2 }} /> {realEstate.libelle}{" "}
            {realEstate.Type}
            {realEstate.nbpiece}, {realEstate.meuble ? "meublé" : "non-meublé"}
          </Typography>
          <Typography variant="body2" color="text.primary">
            étage : {realEstate.etage}
          </Typography>
          {realEstate.code && (
            <Typography variant="body2" color="text.primary">
              {" "}
              code : {realEstate.code}
            </Typography>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default RealEstateSummary;
