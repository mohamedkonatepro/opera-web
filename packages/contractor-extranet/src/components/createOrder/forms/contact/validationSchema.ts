import { array, object, string } from "yup";

const tenantSchema = object({
  lastname: string().when("socialReason", {
    is: (socialReason?: string) => !socialReason,
    then: (schema) => schema.required("Le nom est obligatoire"),
  }),
  firstname: string().when("socialReason", {
    is: (socialReason?: string) => !socialReason,
    then: (schema) => schema.required("Le prénom est obligatoire"),
  }),
  socialReason: string().test(
    "socialReason",
    "Le couple prénom/nom ou la raison sociale est obligatoire",
    function (value) {
      return !!value || !!this.parent.lastname || !!this.parent.firstname;
    }
  ),
  email: string()
    .email("L'email est invalide")
    .test(
      "email",
      "L'email ou le numéro de téléphone est obligatoire",
      function (value) {
        return !!value || !!this.parent.phoneNumber;
      }
    ),
  phoneNumber: string().test(
    "phoneNumber",
    "Le numéro de téléphone ou l'email est obligatoire",
    function (value) {
      return !!value || !!this.parent.email;
    }
  ),
});

const realEstateOwnerSchema = object({
  lastname: string().test(
    "lastname",
    "Le nom est obligatoire",
    function (value) {
      if (!this?.options?.context?.isDiag) return true;
      return !!value || !!this.parent.socialReason;
    }
  ),
  firstname: string().test(
    "firstname",
    "Le prénom est obligatoire",
    function (value) {
      if (this?.options?.context?.isDiag) return true;
      return !!value || !!this.parent.socialReason;
    }
  ),
  socialReason: string().test(
    "socialReason",
    "Le couple prénom/nom ou la raison sociale est obligatoire",
    function (value) {
      if (this?.options?.context?.isDiag) return true;
      return !!value || !!this.parent.lastname || !!this.parent.firstname;
    }
  ),
  fiscalInvariant: string(),
});

const contractorSchema = object({
  lastname: string().required("Le nom est obligatoire"),
  firstname: string().required("Le prénom est obligatoire"),
  email: string()
    .email("L'email est invalide")
    .required("L'email est obligatoire"),
});

const enteringTenantsSchema = array().of(tenantSchema);

const schema = object({
  enteringTenants: enteringTenantsSchema,
  leavingTenants: array().of(tenantSchema),
  realEstateOwner: realEstateOwnerSchema,
  contractor: contractorSchema,
});

export default schema;
