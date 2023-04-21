import { Box, Button, Link, Stack, TextField, Typography } from "@mui/material";
import { TenantsFormProps } from "./types";
import { FC } from "react";
import { nanoid } from "nanoid";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

const Tenants: FC<TenantsFormProps> = ({
  tenants,
  setTenants,
  title,
  prefixId = "",
  errors = [],
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
    <Stack spacing={3} alignItems="start" width={1}>
      <Typography variant="subtitle1">{title}</Typography>
      {tenants.map((tenant, index) => {
        return (
          <Stack spacing={2} key={tenant.id} width={1}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="subtitle2">
                Colocataire {index + 1}
              </Typography>
              <Link
                component="button"
                underline="none"
                onClick={removeTenant(index)}
                type="button"
                display="flex"
              >
                <Box mr={1} component="span">
                  <DeleteOutlinedIcon fontSize="small" color="error" />
                </Box>
                <Typography variant="subtitle2" color="error">
                  Supprimer
                </Typography>
              </Link>
            </Stack>
            <Stack direction="row" spacing={2}>
              <TextField
                id={`${prefixId}-firstname-${index}`}
                label="Prénom"
                color="secondary"
                fullWidth
                value={tenant.firstname}
                onChange={(event) => {
                  const newTenants = [...tenants];
                  newTenants[index].firstname = event.target.value;
                  setTenants(newTenants);
                }}
                error={!!errors[index]?.firstname}
                helperText={errors[index]?.firstname}
              />
              <TextField
                id={`${prefixId}-lastname-${index}`}
                label="Nom"
                color="secondary"
                fullWidth
                value={tenant.lastname}
                onChange={(event) => {
                  const newTenants = [...tenants];
                  newTenants[index].lastname = event.target.value;
                  setTenants(newTenants);
                }}
                error={!!errors[index]?.lastname}
                helperText={errors[index]?.lastname}
              />
            </Stack>
            <TextField
              id={`${prefixId}-socialreason-${index}`}
              label="Raison sociale"
              color="secondary"
              fullWidth
              value={tenant.socialReason}
              onChange={(event) => {
                const newTenants = [...tenants];
                newTenants[index].socialReason = event.target.value;
                setTenants(newTenants);
              }}
              error={!!errors[index]?.socialReason}
              helperText={errors[index]?.socialReason}
            />
            <Stack direction="row" spacing={2}>
              <TextField
                id={`${prefixId}-email-${index}`}
                label="Adresse mail"
                color="secondary"
                fullWidth
                value={tenant.email}
                onChange={(event) => {
                  const newTenants = [...tenants];
                  newTenants[index].email = event.target.value;
                  setTenants(newTenants);
                }}
                error={!!errors[index]?.email}
                helperText={errors[index]?.email}
              />
              <TextField
                id={`${prefixId}-phonenumber-${index}`}
                label="Numéro de téléphone"
                color="secondary"
                fullWidth
                value={tenant.phoneNumber}
                onChange={(event) => {
                  const newTenants = [...tenants];
                  newTenants[index].phoneNumber = event.target.value;
                  setTenants(newTenants);
                }}
                error={!!errors[index]?.phoneNumber}
                helperText={errors[index]?.phoneNumber}
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

export default Tenants;
