import { TextField, Autocomplete } from "@mui/material";
import realEstateRemoveDuplicates from "@/utils/realEstateRemoveDuplicates";
import RealEstate from "@/types/RealEstate";
import Tenant from "@/types/Tenant";
import tenantRemoveDuplicates from "@/utils/tenantRemoveDuplicates";
import capitalizeWords from "@/utils/capitalizeWords";

interface AutocompleteTenantProps {
  tenantsData: Tenant[];
  isLoading: boolean;
  onInputChange: (event: any, value: string) => void;
  onTenantChange: (event: any, option: any) => void;
}

const AutocompleteTenant: React.FunctionComponent<AutocompleteTenantProps> = ({
  tenantsData,
  isLoading,
  onInputChange,
  onTenantChange,
}) => {
  return (
    <Autocomplete
      options={tenantRemoveDuplicates(tenantsData, "firstname")}
      loading={isLoading}
      getOptionLabel={(option) => {
        if (typeof option === "string") {
          return option;
        }
        return capitalizeWords(
          `${option.firstname ?? ""} ${option.lastname ?? ""}`
        );
      }}
      onChange={onTenantChange}
      renderInput={(params) => (
        <TextField
          placeholder="Locataire"
          {...params}
          type="text"
          name="tenant"
          color="secondary"
          sx={{ width: "121.25px", margin: "0 12px 0 12px" }}
        />
      )}
      freeSolo
      onInputChange={onInputChange}
    />
  );
};

export default AutocompleteTenant;
