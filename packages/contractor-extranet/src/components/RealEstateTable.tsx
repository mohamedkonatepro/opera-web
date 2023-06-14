import RealEstate from "@/types/RealEstate";
import { Typography, Box } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import OutlinedButton from "./common/buttons/OutlinedButton";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";
import capitalizeWords from "@/utils/capitalizeWords";

interface RealEstateTableProps {
  realEstates: RealEstate[];
}

const RealEstateTable: React.FunctionComponent<RealEstateTableProps> = ({
  realEstates,
}) => {
  const router = useRouter();

  return (
    <Box>
      <TableContainer>
        <Table
          sx={{ borderTop: "1px solid #e0e0e0" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ whiteSpace: "nowrap" }}>
                <Typography variant="body2" color="text.secondary">
                  Adresse
                </Typography>
              </TableCell>
              <TableCell sx={{ whiteSpace: "nowrap" }}>
                <Typography variant="body2" color="text.secondary">
                  Type
                </Typography>
              </TableCell>
              <TableCell sx={{ whiteSpace: "nowrap" }}>
                <Typography variant="body2" color="text.secondary">
                  Réf. immeuble
                </Typography>
              </TableCell>
              <TableCell sx={{ whiteSpace: "nowrap" }}>
                <Typography variant="body2" color="text.secondary">
                  N° Lot
                </Typography>
              </TableCell>
              <TableCell sx={{ whiteSpace: "nowrap" }}>
                <Typography variant="body2" color="text.secondary">
                  Étage
                </Typography>
              </TableCell>
              <TableCell sx={{ whiteSpace: "nowrap" }}>
                <Typography variant="body2" color="text.secondary">
                  Surface
                </Typography>
              </TableCell>
              <TableCell sx={{ whiteSpace: "nowrap" }}>
                <Typography variant="body2" color="text.secondary">
                  Propriétaire
                </Typography>
              </TableCell>
              <TableCell sx={{ whiteSpace: "nowrap" }}>
                <Typography variant="body2" color="text.secondary">
                  Locataire
                </Typography>
              </TableCell>
              <TableCell sx={{ whiteSpace: "nowrap" }}>
                <Typography variant="body2" color="text.secondary">
                  Action
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {realEstates.map((realEstate) => {
              const {
                address,
                postalCode,
                city,
                buildingReference,
                unitReference,
                floor,
                surface,
                real_estate_type,
                owner,
                tenants,
              } = realEstate;
              const tenantName = tenants.map(
                (tenant) => `${tenant.firstname ?? ""} ${tenant.lastname ?? ""}`
              );

              const createOrderURL = `/create-order?realEstateId=${realEstate.id}`;
              return (
                <TableRow key={realEstate.id}>
                  <TableCell>
                    {capitalizeWords(`${address} ${postalCode} ${city}`)}
                  </TableCell>
                  <TableCell>
                    {capitalizeWords(real_estate_type?.name)}
                  </TableCell>
                  <TableCell>{buildingReference}</TableCell>
                  <TableCell>{unitReference}</TableCell>
                  <TableCell>{floor?.name}</TableCell>
                  <TableCell>{surface}</TableCell>
                  <TableCell>
                    {capitalizeWords(
                      `${owner?.firstname ?? ""} ${owner?.lastname ?? ""}`
                    )}
                  </TableCell>
                  <TableCell>{capitalizeWords(tenantName.join(" "))}</TableCell>
                  <TableCell>
                    <OutlinedButton
                      selected
                      padding="small"
                      href={createOrderURL}
                    >
                      Créer <AddIcon sx={{ marginLeft: "5px" }} />
                    </OutlinedButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RealEstateTable;
