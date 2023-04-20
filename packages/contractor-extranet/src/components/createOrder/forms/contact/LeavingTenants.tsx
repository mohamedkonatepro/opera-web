import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
import { LeavingTenantsFormProps } from "./types";
import { FC } from "react";
import { nanoid } from "nanoid";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

const LeavingTenants: FC<LeavingTenantsFormProps> = ({
  tenants,
  setTenants,
}) => {
  const addTenant = () => {
    setTenants([
      ...tenants,
      {
        id: nanoid(),
        firstname: "",
        lastname: "",
        socialReason: "",
        email: "",
        phoneNumber: "",
      },
    ]);
  };

  const removeTenant = (index: number) => () => {
    const newTenants = [...tenants];
    newTenants.splice(index, 1);
    setTenants(newTenants);
  };

  return (
    <Stack spacing={3} alignItems="start">
      <Typography variant="subtitle1">Locataire Sortant</Typography>
      {tenants.map((tenant, index) => {
        return (
          <Stack spacing={2} key={tenant.id}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="subtitle2">
                Colocataire {index + 1}
              </Typography>
              <Button
                color="error"
                endIcon={<DeleteOutlinedIcon />}
                onClick={removeTenant(index)}
              >
                Supprimer
              </Button>
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField
                id={`leaving-tenant-firstname-${index}`}
                label="Prénom"
                color="secondary"
                fullWidth
                value={tenant.firstname}
                onChange={(event) => {
                  const newTenants = [...tenants];
                  newTenants[index].firstname = event.target.value;
                  setTenants(newTenants);
                }}
              />
              <TextField
                id={`leaving-tenant-lastname-${index}`}
                label="Nom"
                color="secondary"
                fullWidth
                value={tenant.lastname}
                onChange={(event) => {
                  const newTenants = [...tenants];
                  newTenants[index].lastname = event.target.value;
                  setTenants(newTenants);
                }}
              />
            </Stack>
            <TextField
              id={`leaving-tenant-socialreason-${index}`}
              label="Raison sociale"
              color="secondary"
              fullWidth
              value={tenant.socialReason}
              onChange={(event) => {
                const newTenants = [...tenants];
                newTenants[index].socialReason = event.target.value;
                setTenants(newTenants);
              }}
            />
            <Stack direction="row" spacing={2}>
              <TextField
                id={`leaving-tenant-email-${index}`}
                label="Adresse mail"
                color="secondary"
                fullWidth
                value={tenant.email}
                onChange={(event) => {
                  const newTenants = [...tenants];
                  newTenants[index].socialReason = event.target.value;
                  setTenants(newTenants);
                }}
              />
              <TextField
                id={`leaving-tenant-phonenumber-${index}`}
                label="Numéro de téléphone"
                color="secondary"
                fullWidth
                value={tenant.phoneNumber}
                onChange={(event) => {
                  const newTenants = [...tenants];
                  newTenants[index].phoneNumber = event.target.value;
                  setTenants(newTenants);
                }}
              />
            </Stack>
          </Stack>
        );
      })}
      <Link
        component="button"
        underline="none"
        color="border.bold"
        typography="subtitle2"
        onClick={addTenant}
        type="button"
      >
        <Box mr={1} component="span">
          +
        </Box>
        <span>Ajouter un colocataire</span>
      </Link>
    </Stack>
  );
};

export default LeavingTenants;
